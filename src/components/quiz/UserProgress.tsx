import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserProgress as UserProgressType, getBadges } from '@/hooks/useQuiz';
import { Award, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProgressProps {
  progress: UserProgressType;
}

export function UserProgressCard({ progress }: UserProgressProps) {
  const allBadges = getBadges();
  const earnedBadges = allBadges.filter(b => progress.badges.includes(b.id));

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <div className="gradient-primary p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="text-xs opacity-80">Level {progress.level}</div>
            <div className="text-xl font-bold">{progress.levelName}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{progress.totalScore}</div>
            <div className="text-xs opacity-80">Total Points</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Next Level</span>
            <span>{Math.round(progress.levelProgress)}%</span>
          </div>
          <Progress value={progress.levelProgress} className="h-2 bg-white/20" />
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-primary">
              <Star className="w-4 h-4" />
              <span className="font-bold">{progress.correctAnswers}</span>
            </div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <Zap className="w-4 h-4" />
              <span className="font-bold">{progress.highestStreak}</span>
            </div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-gold">
              <Award className="w-4 h-4" />
              <span className="font-bold">{progress.badges.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-gold/10 text-gold border border-gold/20"
                title={badge.description}
              >
                <span>{badge.icon}</span>
                <span className="font-medium">{badge.name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
