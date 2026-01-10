import { cn } from '@/lib/utils';
import { Flame, Zap } from 'lucide-react';

interface QuizProgressProps {
  current: number;
  total: number;
  streak: number;
  score: number;
}

export function QuizProgress({ current, total, streak, score }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Stats row */}
      <div className="flex items-center justify-between">
        {/* Question counter */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{current}</span>
          <span className="text-muted-foreground">/ {total}</span>
        </div>

        {/* Streak & Score */}
        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          <div className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm transition-all',
            streak >= 3 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-streak-pulse' 
              : 'bg-muted text-muted-foreground'
          )}>
            <Flame className={cn('w-4 h-4', streak >= 3 && 'animate-pulse')} />
            <span>{streak}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 text-primary font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Streak bonus message */}
      {streak >= 3 && (
        <div className="text-center text-sm font-medium text-orange-400 animate-bounce-in">
          🔥 {streak} streak! +{Math.floor(streak * 2)} bonus points!
        </div>
      )}
    </div>
  );
}
