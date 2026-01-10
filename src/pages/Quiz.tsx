import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizOption } from '@/components/quiz/QuizOption';
import { QuizResults } from '@/components/quiz/QuizResults';
import { CategorySelector } from '@/components/quiz/CategorySelector';
import { DifficultySelector } from '@/components/quiz/DifficultySelector';
import { QuestionCountSelector } from '@/components/quiz/QuestionCountSelector';
import { UserProgressCard } from '@/components/quiz/UserProgress';
import {
  useQuiz,
  loadProgress,
  saveProgress,
  updateProgress,
  addToLeaderboard,
  UserProgress
} from '@/hooks/useQuiz';
import { useUserStats } from '@/hooks/useUserStats';
import { useAuth } from '@/hooks/useAuth';
import { Category, Difficulty, categoryLabels } from '@/data/questions';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type GamePhase = 'setup' | 'playing' | 'answered' | 'results';

export default function Quiz() {
  const navigate = useNavigate();

  // Setup state
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [playerName, setPlayerName] = useState('');

  // Game state
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean; points: number } | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(loadProgress());
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [leaderboardRank, setLeaderboardRank] = useState<number | undefined>();

  const { user } = useAuth();
  const { updateUserStats } = useUserStats(user?.uid);

  const {
    state,
    currentQuestion,
    currentOptions,
    results,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
  } = useQuiz(questionCount, category, difficulty);

  // Load saved name
  useEffect(() => {
    const savedName = localStorage.getItem('bible-quiz-name');
    if (savedName) setPlayerName(savedName);
  }, []);

  const handleStartQuiz = () => {
    if (!playerName.trim()) return;
    localStorage.setItem('bible-quiz-name', playerName.trim());
    startQuiz();
    setPhase('playing');
  };

  const handleSelectAnswer = (index: number) => {
    if (phase !== 'playing') return;

    setSelectedAnswer(index);
    const result = answerQuestion(index);
    if (result) {
      setAnswerResult(result);
      setPhase('answered');
    }
  };

  const handleNextQuestion = () => {
    if (!state) return;

    // Check if this was the last question
    if (state.currentIndex >= state.questions.length - 1) {
      // Show results immediately
      setPhase('results');
    } else {
      setSelectedAnswer(null);
      setAnswerResult(null);
      nextQuestion();
      setPhase('playing');
    }
  };

  // Handle quiz completion - calculate results when phase becomes 'results'
  useEffect(() => {
    if (phase === 'results' && state) {
      // Calculate results manually
      const correct = state.answers.filter(
        (a, i) => a === state.correctMappings[i]
      ).length;

      const quizResults = {
        totalQuestions: state.questions.length,
        correct,
        incorrect: state.questions.length - correct,
        score: state.score,
        maxStreak: state.maxStreak,
        accuracy: Math.round((correct / state.questions.length) * 100),
      };

      // Update progress
      const oldBadges = userProgress.badges;
      const updatedProgress = updateProgress(userProgress, {
        score: quizResults.score,
        correct: quizResults.correct,
        total: quizResults.totalQuestions,
        maxStreak: quizResults.maxStreak,
        difficulty: difficulty === 'all' ? undefined : difficulty,
      });

      // Check for new badges
      const earnedBadges = updatedProgress.badges.filter(b => !oldBadges.includes(b));
      setNewBadges(earnedBadges);

      // Save progress
      saveProgress(updatedProgress);
      setUserProgress(updatedProgress);

      // Add to leaderboard
      const leaderboard = addToLeaderboard({
        name: playerName,
        score: quizResults.score,
        accuracy: quizResults.accuracy,
      });

      // Update Firestore stats
      if (user) {
        updateUserStats(updatedProgress, quizResults.score > 0);
      }

      // Find rank
      const rankIndex = leaderboard.findIndex(e => e.name === playerName && e.score === quizResults.score);
      if (rankIndex !== -1) {
        setLeaderboardRank(rankIndex + 1);
      }
    }
  }, [phase]);

  const handlePlayAgain = () => {
    resetQuiz();
    setPhase('setup');
    setSelectedAnswer(null);
    setAnswerResult(null);
    setNewBadges([]);
    setLeaderboardRank(undefined);
  };

  // Calculate results for display
  const displayResults = state ? {
    totalQuestions: state.questions.length,
    correct: state.answers.filter((a, i) => a === state.correctMappings[i]).length,
    incorrect: state.questions.length - state.answers.filter((a, i) => a === state.correctMappings[i]).length,
    score: state.score,
    maxStreak: state.maxStreak,
    accuracy: Math.round((state.answers.filter((a, i) => a === state.correctMappings[i]).length / state.questions.length) * 100),
  } : null;

  // Setup screen
  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-background px-4 py-6">
        {/* Gradient orbs */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] -z-10" />

        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-primary">
              <Sparkles className="w-4 h-4" />
              Configure Your Quiz
            </div>
            <h1 className="text-2xl font-bold">Let's Play!</h1>
          </div>

          {/* Player name */}
          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Your Name
              </label>
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-muted/50 border-0 text-lg h-12"
                maxLength={20}
              />
            </CardContent>
          </Card>

          {/* Category selection */}
          <CategorySelector selected={category} onSelect={setCategory} />

          {/* Difficulty selection */}
          <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

          {/* Question count */}
          <QuestionCountSelector selected={questionCount} onSelect={setQuestionCount} />

          {/* User progress */}
          {userProgress.totalScore > 0 && (
            <UserProgressCard progress={userProgress} />
          )}

          {/* Start button */}
          <Button
            variant="gradient"
            size="xl"
            className="w-full gap-2"
            onClick={handleStartQuiz}
            disabled={!playerName.trim()}
          >
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Results screen
  if (phase === 'results' && displayResults) {
    return (
      <div className="min-h-screen bg-background px-4 py-6">
        <QuizResults
          results={displayResults}
          onPlayAgain={handlePlayAgain}
          onViewLeaderboard={() => navigate('/leaderboard')}
          newBadges={newBadges}
          rank={leaderboardRank}
        />
      </div>
    );
  }

  // Playing screen
  if (!state || !currentQuestion) return null;

  const correctIndex = state.correctMappings[state.currentIndex];

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Gradient orb */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-lg mx-auto space-y-6">
        {/* Progress bar */}
        <QuizProgress
          current={state.currentIndex + 1}
          total={state.questions.length}
          streak={state.streak}
          score={state.score}
        />

        {/* Question card */}
        <Card className="glass-card border-0 overflow-hidden">
          <CardContent className="p-5 space-y-5">
            {/* Category & Difficulty badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                {categoryLabels[currentQuestion.category]}
              </span>
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium capitalize',
                currentQuestion.difficulty === 'easy' && 'bg-success/20 text-success',
                currentQuestion.difficulty === 'medium' && 'bg-warning/20 text-warning',
                currentQuestion.difficulty === 'hard' && 'bg-destructive/20 text-destructive',
              )}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentOptions.map((option, index) => (
                <QuizOption
                  key={index}
                  option={option}
                  index={index}
                  isSelected={selectedAnswer === index}
                  isCorrect={index === correctIndex}
                  showResult={phase === 'answered'}
                  onSelect={() => handleSelectAnswer(index)}
                  disabled={phase === 'answered'}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Answer feedback */}
        {phase === 'answered' && answerResult && (
          <Card className={cn(
            'border-0 animate-slide-up overflow-hidden',
            answerResult.isCorrect ? 'bg-success/10' : 'bg-destructive/10'
          )}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl',
                  answerResult.isCorrect ? 'gradient-success' : 'bg-destructive'
                )}>
                  {answerResult.isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">
                    {answerResult.isCorrect ? 'Correct!' : 'Incorrect'}
                    {answerResult.isCorrect && (
                      <span className="ml-2 text-gold">+{answerResult.points} pts</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {currentQuestion.reference}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next button */}
        {phase === 'answered' && (
          <Button
            variant="gradient"
            size="xl"
            className="w-full gap-2"
            onClick={handleNextQuestion}
          >
            {state.currentIndex >= state.questions.length - 1 ? 'See Results' : 'Next Question'}
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
