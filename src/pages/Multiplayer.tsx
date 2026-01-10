import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Plus, LogIn, Copy, Share2, ArrowLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

type Mode = 'menu' | 'create' | 'join' | 'lobby';

export default function Multiplayer() {
  const [mode, setMode] = useState<Mode>('menu');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    return code;
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    generateRoomCode();
    setMode('lobby');
    toast.success('Room created! Share the code with friends.');
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!roomCode.trim() || roomCode.length < 6) {
      toast.error('Please enter a valid room code');
      return;
    }
    setGeneratedCode(roomCode.toUpperCase());
    setMode('lobby');
    toast.success('Joined room!');
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Room code copied!');
  };

  const shareRoom = async () => {
    try {
      await navigator.share({
        title: 'Join my Bible Arena game!',
        text: `Join my Bible Arena quiz battle! Room code: ${generatedCode}`,
        url: window.location.origin,
      });
    } catch {
      copyRoomCode();
    }
  };

  if (mode === 'lobby') {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-lg mx-auto space-y-6">
          <Button variant="ghost" onClick={() => setMode('menu')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Leave Room
          </Button>

          <Card className="glass-card border-0 text-center">
            <CardHeader>
              <CardTitle className="text-foreground">Room Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-mono font-bold tracking-widest text-primary">
                {generatedCode}
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={copyRoomCode} className="gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={shareRoom} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="w-5 h-5" />
                Players (1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white font-bold">
                  {playerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{playerName}</div>
                  <div className="text-xs text-muted-foreground">Host</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 text-center">
                <p className="text-muted-foreground text-sm">
                  Waiting for other players to join...
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ Real-time multiplayer requires a backend connection
                </p>
              </div>
            </CardContent>
          </Card>

          <Button variant="gradient" size="xl" className="w-full gap-2" disabled>
            <Gamepad2 className="w-5 h-5" />
            Start Game (Need 2+ players)
          </Button>
        </div>
      </div>
    );
  }

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
                {mode === 'create' ? 'Create Room' : 'Join Room'}
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

              {mode === 'join' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Room Code</label>
                  <Input
                    placeholder="Enter 6-character code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="bg-background font-mono text-center text-lg tracking-widest"
                  />
                </div>
              )}

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={mode === 'create' ? handleCreateRoom : handleJoinRoom}
              >
                {mode === 'create' ? 'Create Room' : 'Join Room'}
              </Button>
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
            <h1 className="text-2xl font-bold text-foreground">Play with Friends</h1>
            <p className="text-muted-foreground">Challenge your friends to a Bible quiz battle</p>
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
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Create Room</h3>
                <p className="text-sm text-muted-foreground">
                  Start a new game and invite friends
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
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Join Room</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a room code to join a game
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-center text-warning-foreground">
            ⚠️ Real-time multiplayer requires backend integration. 
            Enable Lovable Cloud to play with friends online.
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
