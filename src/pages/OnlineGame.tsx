import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { MatchState } from '@/hooks/useMatchmaking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Trophy, Clock, User, Sword } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizOption } from '@/components/quiz/QuizOption';
import { difficultyPoints } from '@/data/questions';

export default function OnlineGame() {
    const { matchId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [match, setMatch] = useState<MatchState | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    useEffect(() => {
        if (!matchId) return;

        const unsubscribe = onSnapshot(doc(db, 'matches', matchId), (doc) => {
            if (doc.exists()) {
                const data = doc.data() as MatchState;
                // Add ID to data
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

    // Handle answering
    const handleAnswer = async (index: number) => {
        if (!match || hasAnswered || !user) return;

        setSelectedAnswer(index);
        setHasAnswered(true);

        const isCorrect = index === currentQuestion.correctAnswer;
        const points = isCorrect ? difficultyPoints[currentQuestion.difficulty] : 0;

        const matchRef = doc(db, 'matches', match.id);

        // Update player score and answer status
        await updateDoc(matchRef, {
            [`${currentPlayer}.score`]: increment(points),
            [`${currentPlayer}.currentAnswer`]: index
        });

        // Check if opponent has also answered
        const opponentData = match[opponent];
        if (opponentData?.currentAnswer !== null && opponentData?.currentAnswer !== undefined) {
            // Both answered, move to next question after delay
            setTimeout(async () => {
                // Only one player needs to trigger the next question update to avoid race conditions
                // Let player1 be the host
                if (currentPlayer === 'player1') {
                    const nextIndex = currentQIndex + 1;
                    if (nextIndex >= match.questions.length) {
                        // Game Over
                        await updateDoc(matchRef, {
                            status: 'finished',
                            [`player1.currentAnswer`]: null,
                            [`player2.currentAnswer`]: null
                        });
                    } else {
                        // Next Question
                        await updateDoc(matchRef, {
                            currentQuestionIndex: nextIndex,
                            [`player1.currentAnswer`]: null,
                            [`player2.currentAnswer`]: null
                        });
                    }
                }
            }, 2000);
        }
    };

    // Reset local state when question changes
    useEffect(() => {
        if (match?.currentQuestionIndex !== undefined) {
            setSelectedAnswer(null);
            setHasAnswered(false);
        }
    }, [match?.currentQuestionIndex]);


    if (!match || !user) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    if (match.status === 'waiting') {
        return (
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
        );
    }

    if (match.status === 'finished') {
        const myScore = match[currentPlayer].score;
        const oppScore = match[opponent]?.score || 0;
        const isWinner = myScore > oppScore;
        const isDraw = myScore === oppScore;

        return (
            <div className="min-h-screen bg-background px-4 flex flex-col items-center justify-center space-y-6">
                <Trophy className={cn("w-20 h-20", isWinner ? "text-yellow-500" : "text-muted-foreground")} />
                <h1 className="text-4xl font-bold">{isWinner ? "VICTORY!" : isDraw ? "DRAW!" : "DEFEAT"}</h1>

                <div className="flex gap-8 text-center">
                    <div>
                        <div className="text-sm text-muted-foreground">You</div>
                        <div className="text-3xl font-bold text-primary">{myScore}</div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">Opponent</div>
                        <div className="text-3xl font-bold text-destructive">{oppScore}</div>
                    </div>
                </div>

                <Button onClick={() => navigate('/online')}>Back to Arena</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background px-4 py-6">
            {/* Header / Scoreboard */}
            <div className="flex justify-between items-center mb-8 bg-card/50 p-4 rounded-xl backdrop-blur-sm border border-border/50 relative">
                {/* Game ID for debugging */}
                <div className="absolute -top-6 left-0 text-xs text-muted-foreground w-full text-center">
                    Game ID: {matchId?.slice(0, 4)}
                </div>

                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <User className="w-4 h-4" /> You
                    </div>
                    <div className="text-2xl font-bold text-primary">{match[currentPlayer].score}</div>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Round</span>
                    <span className="text-xl font-bold">{currentQIndex + 1} / {match.questions.length}</span>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        Opponent <User className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-bold text-destructive">{match[opponent]?.score || 0}</div>
                    {match[opponent]?.currentAnswer !== null && match[opponent]?.currentAnswer !== undefined && (
                        <span className="text-xs text-green-500 animate-pulse">Answered!</span>
                    )}
                </div>
            </div>

            {/* Question Area */}
            <Card className="glass-card border-0 mb-6">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold leading-relaxed mb-6">{currentQuestion.question}</h2>
                    <div className="space-y-3">
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
                <div className="text-center animate-pulse text-muted-foreground">
                    Waiting for opponent to answer...
                </div>
            )}
        </div>
    );
}
