import confetti from 'canvas-confetti';
import { useGameSound } from '@/hooks/useGameSound';
import { PageTransition } from '@/components/layout/PageTransition';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { MatchState } from '@/hooks/useMatchmaking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Trophy, User, Sword } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizOption } from '@/components/quiz/QuizOption';
import { difficultyPoints } from '@/data/questions';
import { useUserStats } from '@/hooks/useUserStats';

export default function OnlineGame() {
    const { matchId } = useParams();
    const { user } = useAuth();
    const { updateMultiplayerStats } = useUserStats(user?.uid);
    const navigate = useNavigate();
    const { playSuccess, playError, playWin } = useGameSound();

    const [match, setMatch] = useState<MatchState | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [statsUpdated, setStatsUpdated] = useState(false);

    useEffect(() => {
        if (!matchId) return;

        const unsubscribe = onSnapshot(doc(db, 'matches', matchId), (doc) => {
            if (doc.exists()) {
                const data = doc.data() as MatchState;
                setMatch({ ...data, id: doc.id });
            } else {
                toast.error("Game not found!");
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [matchId, navigate]);

    const currentPlayer = match?.player1.uid === user?.uid ? 'player1' : 'player2';
    const opponent = currentPlayer === 'player1' ? 'player2' : 'player1';
    const currentQIndex = match?.currentQuestionIndex || 0;
    const currentQuestion = match?.questions[currentQIndex];

    // Victory/Defeat Effects
    useEffect(() => {
        if (match?.status === 'finished' && !statsUpdated && user && match[currentPlayer]) {
            setStatsUpdated(true);
            const myScore = match[currentPlayer].score;
            const oppScore = match[opponent]?.score || 0;
            const isWinner = myScore > oppScore;
            const result = isWinner ? 'win' : myScore === oppScore ? 'draw' : 'loss';

            updateMultiplayerStats(myScore, result);

            if (isWinner) {
                playWin();
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500', '#ffffff']
                });
            } else {
                playError(); // Defeat sound
            }
        }
    }, [match?.status, statsUpdated, user, currentPlayer, opponent, match, updateMultiplayerStats, playWin, playError]);

    const [timeLeft, setTimeLeft] = useState(10);

    // Timer logic
    useEffect(() => {
        if (!match || match.status !== 'playing' || hasAnswered) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleAnswer(-1);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [match?.currentQuestionIndex, match?.status, hasAnswered]);

    // Reset loop
    useEffect(() => {
        setTimeLeft(10);
        setHasAnswered(false);
        setSelectedAnswer(null);
    }, [match?.currentQuestionIndex]);

    // Next Question Orchestrator (Player 1 only)
    useEffect(() => {
        if (!match || match.status !== 'playing') return;

        const p1Answer = match.player1?.currentAnswer;
        const p2Answer = match.player2?.currentAnswer;

        if (p1Answer !== null && p1Answer !== undefined && p2Answer !== null && p2Answer !== undefined) {
            if (user.uid === match.player1.uid) {
                const timeoutId = setTimeout(async () => {
                    const matchRef = doc(db, 'matches', match.id);
                    const nextIndex = (match.currentQuestionIndex || 0) + 1;

                    if (nextIndex >= match.questions.length) {
                        await updateDoc(matchRef, {
                            status: 'finished',
                            [`player1.currentAnswer`]: null,
                            [`player2.currentAnswer`]: null
                        });
                    } else {
                        await updateDoc(matchRef, {
                            currentQuestionIndex: nextIndex,
                            [`player1.currentAnswer`]: null,
                            [`player2.currentAnswer`]: null
                        });
                    }
                }, 2000);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [match?.player1?.currentAnswer, match?.player2?.currentAnswer, user?.uid]);

    const handleAnswer = async (index: number) => {
        if (!match || hasAnswered || !user) return;

        setSelectedAnswer(index);
        setHasAnswered(true);

        const isCorrect = index === currentQuestion.correctAnswer;

        // Immediate Feedback Sound
        if (isCorrect) playSuccess();
        else playError();

        const points = isCorrect ? difficultyPoints[currentQuestion.difficulty] : 0;
        const matchRef = doc(db, 'matches', match.id);

        await updateDoc(matchRef, {
            [`${currentPlayer}.score`]: increment(points),
            [`${currentPlayer}.currentAnswer`]: index
        });
    };

    if (!match || !user) return <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mt-20" />;

    if (match.status === 'waiting') {
        return (
            <PageTransition>
                <div className="min-h-screen bg-background px-4 flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto" />
                        <Sword className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Waiting for Opponent...</h2>
                        <p className="text-muted-foreground">Share the game ID or wait for a random match</p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/online')}>Cancel</Button>
                </div>
            </PageTransition>
        );
    }

    if (match.status === 'finished') {
        const myScore = match[currentPlayer].score;
        const oppScore = match[opponent]?.score || 0;
        const isWinner = myScore > oppScore;
        const isDraw = myScore === oppScore;

        return (
            <PageTransition>
                <div className="min-h-screen bg-background px-4 flex flex-col items-center justify-center space-y-6">
                    <Trophy className={cn("w-24 h-24 animate-bounce-in", isWinner ? "text-yellow-500 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" : "text-muted-foreground")} />
                    <h1 className="text-5xl font-extrabold font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
                        {isWinner ? "VICTORY!" : isDraw ? "DRAW!" : "DEFEAT"}
                    </h1>

                    <div className="flex gap-8 text-center bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div>
                            <div className="text-sm text-muted-foreground uppercase tracking-widest">You</div>
                            <div className="text-4xl font-bold text-primary text-glow-gold">{myScore}</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <div className="text-sm text-muted-foreground uppercase tracking-widest">Opponent</div>
                            <div className="text-4xl font-bold text-destructive">{oppScore}</div>
                        </div>
                    </div>

                    <Button onClick={() => navigate('/online')} variant="gradient" size="lg" className="btn-game">Back to Arena</Button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-background px-4 py-6">
                {/* Header / Scoreboard */}
                <div className="flex justify-between items-center mb-8 bg-card/60 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-lg relative overflow-visible">

                    {/* Game ID Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/80 rounded-full border border-gold/30 text-[10px] text-gold uppercase tracking-[0.2em] font-bold shadow-lg">
                        {match.mode.toUpperCase()}
                    </div>

                    <div className="flex flex-col items-start animate-slide-in">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <User className="w-4 h-4 text-primary" /> You
                        </div>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-white filter drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                            {match[currentPlayer].score}
                        </div>
                    </div>

                    <div className="flex flex-col items-center pt-2">
                        <div className={cn("text-2xl font-mono font-bold mt-1 tracking-widest", timeLeft <= 3 ? "text-red-500 animate-pulse scale-110" : "text-blue-200")}>
                            {timeLeft}
                        </div>
                        <div className="h-1 w-20 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-gold transition-all duration-1000 ease-linear"
                                style={{ width: `${(timeLeft / 10) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-end animate-slide-in">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            Opponent <User className="w-4 h-4 text-destructive" />
                        </div>
                        <div className="text-3xl font-bold text-destructive/80">
                            {match[opponent]?.score || 0}
                        </div>
                        {match[opponent]?.currentAnswer !== null && match[opponent]?.currentAnswer !== undefined && (
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest animate-pulse mt-1">Ready</span>
                        )}
                    </div>
                </div>

                {/* Question Area */}
                <Card className="glass-card shadow-2xl mb-6 border-gold/20 relative overflow-hidden animate-slide-up">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <CardContent className="p-8">
                        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-8 text-center font-serif text-foreground/90 drop-shadow-md">
                            {currentQuestion.question}
                        </h2>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option: string, i: number) => (
                                <QuizOption
                                    key={i}
                                    index={i}
                                    option={option}
                                    isSelected={selectedAnswer === i}
                                    isCorrect={hasAnswered && currentQuestion.correctAnswer === i}
                                    showResult={hasAnswered && match[opponent]?.currentAnswer !== null}
                                    disabled={hasAnswered}
                                    onSelect={() => handleAnswer(i)}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Waiting indicator */}
                {hasAnswered && match[opponent]?.currentAnswer == null && (
                    <div className="flex flex-col items-center gap-3 animate-pulse text-muted-foreground mt-8">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm uppercase tracking-widest">Awaiting opponent...</span>
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
