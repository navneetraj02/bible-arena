import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Flame, RotateCcw, Home, Award, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface QuizResultsProps {
  results: {
    totalQuestions: number;
    correct: number;
    incorrect: number;
    score: number;
    maxStreak: number;
    accuracy: number;
  };
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
  newBadges?: string[];
  rank?: number;
}

export function QuizResults({ 
  results, 
  onPlayAgain, 
  onViewLeaderboard,
  newBadges = [],
  rank 
}: QuizResultsProps) {
  const navigate = useNavigate();
  
  const getMessage = () => {
    if (results.accuracy === 100) return { text: 'Perfect! 🌟', emoji: '🏆' };
    if (results.accuracy >= 80) return { text: 'Excellent!', emoji: '🎉' };
    if (results.accuracy >= 60) return { text: 'Good Job!', emoji: '👍' };
    if (results.accuracy >= 40) return { text: 'Keep Learning!', emoji: '📖' };
    return { text: 'Practice More!', emoji: '💪' };
  };

  const message = getMessage();

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Gradient orb */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />

      {/* Score circle */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="text-6xl animate-bounce-in">{message.emoji}</div>
        
        <div className="relative inline-block">
          <div className={cn(
            'w-32 h-32 rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30'
          )}>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-gradient">{results.accuracy}%</div>
            </div>
          </div>
          {results.accuracy >= 80 && (
            <div className="absolute -top-2 -right-2 animate-bounce-in delay-300">
              <Trophy className="w-10 h-10 text-gold drop-shadow-lg" />
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold">{message.text}</h2>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3 animate-slide-up delay-100">
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold">{results.correct}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{results.score}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{results.maxStreak}</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Rank display */}
      {rank && rank <= 10 && (
        <Card className="bg-gradient-to-r from-gold to-gold-dark text-black border-0 animate-slide-up delay-200">
          <CardContent className="p-4 text-center font-bold">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>You ranked #{rank} on the leaderboard!</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New badges */}
      {newBadges.length > 0 && (
        <Card className="glass-card border-gold/30 animate-slide-up delay-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gold mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">New Badges Earned!</span>
            </div>
            <div className="flex justify-center gap-3">
              {newBadges.map((badge) => (
                <span key={badge} className="text-3xl animate-bounce-in">
                  {badge === 'first-quiz' && '🌟'}
                  {badge === 'perfect-10' && '🔥'}
                  {badge === 'scholar' && '📚'}
                  {badge === 'hard-mode' && '💪'}
                  {badge === 'streak-master' && '⚡'}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="space-y-3 animate-slide-up delay-400">
        <Button variant="gradient" size="xl" className="w-full gap-2" onClick={onPlayAgain}>
          <RotateCcw className="w-5 h-5" />
          Play Again
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="glass" size="lg" onClick={onViewLeaderboard}>
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
          <Button variant="glass" size="lg" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
