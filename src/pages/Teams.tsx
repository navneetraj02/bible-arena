import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Plus, Shield, Crown, ArrowLeft, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

type Mode = 'menu' | 'create' | 'join';

export default function Teams() {
  const [mode, setMode] = useState<Mode>('menu');
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [teamCode, setTeamCode] = useState('');

  const handleCreateTeam = () => {
    if (!playerName.trim() || !teamName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.info('Team creation requires backend integration');
  };

  const handleJoinTeam = () => {
    if (!playerName.trim() || !teamCode.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.info('Joining teams requires backend integration');
  };

  if (mode === 'create' || mode === 'join') {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-lg mx-auto space-y-6">
          <Button variant="ghost" onClick={() => setMode('menu')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground">
                {mode === 'create' ? 'Create Team' : 'Join Team'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-background"
                />
              </div>

              {mode === 'create' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Team Name</label>
                  <Input
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-background"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Team Code</label>
                  <Input
                    placeholder="Enter team code"
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                    maxLength={8}
                    className="bg-background font-mono text-center text-lg tracking-widest"
                  />
                </div>
              )}

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={mode === 'create' ? handleCreateTeam : handleJoinTeam}
              >
                {mode === 'create' ? 'Create Team' : 'Join Team'}
              </Button>

              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-sm text-center text-warning-foreground">
                  ⚠️ Team features require backend integration.
                </p>
              </div>
            </CardContent>
          </Card>
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
            <h1 className="text-2xl font-bold text-foreground">Team Battle</h1>
            <p className="text-muted-foreground">Form a team and compete together</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <Card
            className="glass-card border-0 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setMode('create')}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center shrink-0">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Create Team</h3>
                <p className="text-sm text-muted-foreground">
                  Start a new team and become the captain
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="glass-card border-0 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setMode('join')}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Join Team</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a team code to join existing team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Swords className="w-5 h-5" />
              How Team Battle Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xs">1</div>
              <p>Create or join a team (2-5 players)</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xs">2</div>
              <p>Each member answers questions individually</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xs">3</div>
              <p>Team scores are combined for ranking</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xs">4</div>
              <p>Compete against other teams worldwide</p>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-center text-warning-foreground">
            ⚠️ Team features require backend integration.
            Create teams and battle together.
          </p>
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
