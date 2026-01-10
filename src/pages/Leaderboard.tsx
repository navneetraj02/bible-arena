import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadLeaderboard, LeaderboardEntry } from '@/hooks/useQuiz';
import { Trophy, Medal, Crown, User, Target, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(loadLeaderboard());
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-gold" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center font-bold text-muted-foreground text-sm">{rank}</span>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-gold to-gold-dark mb-4 glow-gold">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Leaderboard</h1>
          <p className="text-muted-foreground text-sm">Top Bible Quiz Champions</p>
        </div>

        {entries.length === 0 ? (
          <Card className="glass-card border-0 text-center animate-slide-up">
            <CardContent className="py-12">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-lg font-bold mb-2">No Scores Yet</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Be the first to make it to the leaderboard!
              </p>
              <Link to="/quiz">
                <Button variant="gradient" size="lg">
                  Play Quiz Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Top 3 podium */}
            {entries.length >= 3 && (
              <div className="grid grid-cols-3 gap-2 mb-6 animate-slide-up">
                {/* 2nd place */}
                <Card className="glass-card border-0 text-center order-1 mt-6">
                  <CardContent className="py-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-gray-500/20 mx-auto mb-2 flex items-center justify-center">
                      <Medal className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="font-bold text-sm truncate px-1">{entries[1].name}</div>
                    <div className="text-lg font-bold text-primary">{entries[1].score}</div>
                  </CardContent>
                </Card>

                {/* 1st place */}
                <Card className="glass-card border-gold/30 text-center order-2 animate-pulse-glow">
                  <CardContent className="py-5 px-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark mx-auto mb-2 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-black" />
                    </div>
                    <div className="font-bold truncate px-1">{entries[0].name}</div>
                    <div className="text-2xl font-bold text-gradient-gold">{entries[0].score}</div>
                  </CardContent>
                </Card>

                {/* 3rd place */}
                <Card className="glass-card border-0 text-center order-3 mt-8">
                  <CardContent className="py-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 mx-auto mb-2 flex items-center justify-center">
                      <Medal className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="font-bold text-sm truncate px-1">{entries[2].name}</div>
                    <div className="text-lg font-bold text-primary">{entries[2].score}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Full list */}
            <Card className="glass-card border-0 overflow-hidden animate-slide-up delay-100">
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {entries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={cn(
                        'flex items-center gap-3 p-4 transition-colors',
                        index < 3 && 'bg-primary/5'
                      )}
                    >
                      <div className="w-8 flex justify-center">
                        {getRankIcon(index + 1)}
                      </div>
                      
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{entry.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {entry.accuracy}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(entry.date)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">{entry.score}</div>
                        <div className="text-xs text-muted-foreground">pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Play button */}
            <div className="text-center pt-2">
              <Link to="/quiz">
                <Button variant="gradient" size="lg" className="w-full">
                  Play to Climb the Ranks
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
