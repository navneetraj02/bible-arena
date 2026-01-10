import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserProgressCard } from '@/components/quiz/UserProgress';
import { loadProgress } from '@/hooks/useQuiz';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Trophy, Sparkles, Zap, ArrowRight, Star, Target, Users, Globe, Swords, LogIn, LogOut, User } from 'lucide-react';
import logo from '@/assets/logo.png';
import { toast } from 'sonner';

export default function Index() {
  const progress = loadProgress();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error(error);
    } else {
      toast.success('Logged out successfully');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* User Header */}
      <div className="px-4 pt-4">
        <div className="max-w-lg mx-auto flex justify-end">
          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-card">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-white text-sm font-bold">
                    {user.email?.charAt(0).toUpperCase() || user.phoneNumber?.slice(-2) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.email?.split('@')[0] || user.phoneNumber || 'User'}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="glass" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-4 pb-12">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gold/15 rounded-full blur-[100px] -z-10" />

        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Logo */}
          <div className="relative inline-block animate-float">
            <img 
              src={logo} 
              alt="Bible Arena Logo" 
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <div className="space-y-2 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-gradient-gold">Bible</span>
              <span className="text-foreground"> Arena</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Battle. Learn. Conquer the Word.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-6 animate-slide-up delay-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">80+</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">7</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">66</div>
              <div className="text-xs text-muted-foreground">Books</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 animate-slide-up delay-200">
            <Link to="/quiz">
              <Button variant="gradient" size="xl" className="w-full gap-2">
                <Swords className="w-5 h-5" />
                Solo Battle
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/multiplayer">
                <Button variant="glass" size="lg" className="w-full gap-2">
                  <Users className="w-5 h-5" />
                  Friends
                </Button>
              </Link>
              <Link to="/online">
                <Button variant="glass" size="lg" className="w-full gap-2">
                  <Globe className="w-5 h-5" />
                  Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="text-lg font-bold text-center mb-6 text-foreground">Choose Your Battle</h2>
          
          <Link to="/quiz">
            <Card className="glass-card border-0 overflow-hidden animate-slide-up hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">Solo Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge alone
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/multiplayer">
            <Card className="glass-card border-0 overflow-hidden animate-slide-up delay-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">Play with Friends</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a room and invite friends
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/online">
            <Card className="glass-card border-0 overflow-hidden animate-slide-up delay-200 hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-success flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">Online Arena</h3>
                  <p className="text-sm text-muted-foreground">
                    Battle random players worldwide
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/teams">
            <Card className="glass-card border-0 overflow-hidden animate-slide-up delay-300 hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">Team Battle</h3>
                  <p className="text-sm text-muted-foreground">
                    Create teams and compete together
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Progress Section */}
      {progress.totalScore > 0 && (
        <section className="px-4 py-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-center mb-4 text-foreground">Your Progress</h2>
            <UserProgressCard progress={progress} />
          </div>
        </section>
      )}
    </div>
  );
}
