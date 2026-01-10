import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Globe, Search, Users, Zap, ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

import { useMatchmaking } from '@/hooks/useMatchmaking';
import { useAuth } from '@/hooks/useAuth';
import { useOnlineCount } from '@/hooks/useOnlineCount';

export default function OnlineArena() {
  const [playerName, setPlayerName] = useState('');
  const { user } = useAuth();
  const { findMatch, isSearching, cancelSearch } = useMatchmaking();
  const onlineCount = useOnlineCount();

  const handleFindMatch = () => {
    if (!playerName.trim() || !user) {
      return;
    }
    findMatch(user.uid, playerName);
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-lg">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto" />
            <Globe className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground">Finding Opponent...</h2>
            <p className="text-muted-foreground mt-2">
              Searching for players worldwide
            </p>
          </div>



          <Button variant="ghost" onClick={cancelSearch}>
            Cancel Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="Bible Arena" className="w-16 h-16 mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Online Arena</h1>
            <p className="text-muted-foreground">Battle players from around the world</p>
          </div>
        </div>

        {/* Stats Preview */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{onlineCount}</div>
                <div className="text-xs text-muted-foreground">Online Now</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">--</div>
                <div className="text-xs text-muted-foreground">Your Rank</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Name Input */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Enter the Arena</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Your Name</label>
              <Input
                placeholder="Enter your arena name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-background"
              />
            </div>

            <Button
              variant="gradient"
              size="xl"
              className="w-full gap-2"
              onClick={handleFindMatch}
              disabled={!playerName.trim()}
            >
              <Search className="w-5 h-5" />
              Find Match
            </Button>
          </CardContent>
        </Card>

        {/* Game Modes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Battle Modes</h3>

          <Card className="glass-card border-0 opacity-60">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Quick Match</h4>
                <p className="text-xs text-muted-foreground">1v1 • 10 questions • 5 min</p>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Coming Soon</span>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 opacity-60">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-success flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Ranked Match</h4>
                <p className="text-xs text-muted-foreground">1v1 • 20 questions • Earn ranking</p>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Coming Soon</span>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 opacity-60">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Regional Battle</h4>
                <p className="text-xs text-muted-foreground">Play against nearby players</p>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Coming Soon</span>
            </CardContent>
          </Card>
        </div>



        <Link to="/">
          <Button variant="ghost" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
