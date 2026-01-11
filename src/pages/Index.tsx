import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserProgressCard } from '@/components/quiz/UserProgress';
import { loadProgress } from '@/hooks/useQuiz';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Trophy, Sparkles, Zap, ArrowRight, Star, Target, Users, Globe, Swords, LogIn, LogOut, User } from 'lucide-react';
import logo from '@/assets/logo.png';
import { toast } from 'sonner';
import { PageTransition } from '@/components/layout/PageTransition';
import { useTutorial } from '@/hooks/useTutorial';
import { TutorialOverlay } from '@/components/tutorial/TutorialOverlay';

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

  // Tutorial Integration
  const tutorialSteps = [
    {
      title: "Welcome",
      message: "Greetings, Traveler! I am The Keeper. Welcome to the Bible Arena, where your knowledge of the Scripture will be tested in epic battles!",
    },
    {
      title: "Campaign",
      message: "Your journey begins here in the Solo Campaign. Prove your worth against ancient challenges and earn your place among the legends.",
    },
    {
      title: "Battle Arena",
      message: "Ready for a real challenge? Enter the Multiplayer Battle Arena to face off against other scholars in real-time duels of wisdom!",
    },
    {
      title: "Profile",
      message: "Track your progress, view your stats, and see your rank grow as you master the Word. Your legacy is written here.",
    },
    {
      title: "Go Forth",
      message: "The scroll is open, and the arena awaits. Go forth, brave scholar, and may His wisdom guide you to victory!",
    }
  ];

  const { isOpen, currentStep, currentStepIndex, totalSteps, nextStep, skipTutorial } = useTutorial(tutorialSteps);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <TutorialOverlay
          isOpen={isOpen}
          step={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onNext={nextStep}
          onSkip={skipTutorial}
        />
        {/* ... existing content ... */}
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
        <section className="relative overflow-hidden px-4 pt-8 pb-16 min-h-[60vh] flex flex-col justify-center items-center">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow -z-10 mix-blend-screen" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-float -z-10 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-float delay-1000 -z-10" />

          <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
            {/* Logo */}
            <div className="relative inline-block animate-float">
              <div className="absolute inset-0 bg-gold/50 blur-xl rounded-full" />
              <img
                src={logo}
                alt="Bible Arena Logo"
                className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] relative z-10"
              />
            </div>

            {/* Title */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase drop-shadow-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Bible</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 text-4xl md:text-6xl tracking-[0.2em]">Arena</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/80 font-medium tracking-wide font-sans border-t border-b border-white/10 py-2 inline-block">
                Battle. Learn. Conquer.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-8 animate-slide-up delay-100 backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold text-glow-gold">80+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Quests</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 text-glow-blue">7</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Realms</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">66</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Books</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 animate-slide-up delay-200 mt-8 w-full max-w-sm mx-auto">
              <Link to="/quiz">
                <Button variant="default" size="xl" className="w-full gap-3 text-xl btn-game shadow-[0_0_30px_rgba(255,165,0,0.4)] hover:shadow-[0_0_50px_rgba(255,165,0,0.6)]">
                  <Swords className="w-6 h-6" />
                  Start Solo Campaign
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/multiplayer">
                  <Button variant="outline" size="lg" className="w-full gap-2 border-primary/50 text-foreground bg-black/40 backdrop-blur-sm hover:bg-primary/20">
                    <Users className="w-5 h-5 text-gold" />
                    Friends
                  </Button>
                </Link>
                <Link to="/online">
                  <Button variant="outline" size="lg" className="w-full gap-2 border-blue-500/50 text-foreground bg-black/40 backdrop-blur-sm hover:bg-blue-500/20">
                    <Globe className="w-5 h-5 text-blue-400" />
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
              <Card className="glass-card overflow-hidden animate-slide-up hover:scale-[1.02] transition-transform cursor-pointer border-white/5 hover:border-gold/50 hover:shadow-gold/20">
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
              <Card className="glass-card overflow-hidden animate-slide-up delay-100 hover:scale-[1.02] transition-transform cursor-pointer border-white/5 hover:border-gold/50 hover:shadow-gold/20">
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
              <Card className="glass-card overflow-hidden animate-slide-up delay-200 hover:scale-[1.02] transition-transform cursor-pointer border-white/5 hover:border-gold/50 hover:shadow-gold/20">
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
              <Card className="glass-card overflow-hidden animate-slide-up delay-300 hover:scale-[1.02] transition-transform cursor-pointer border-white/5 hover:border-gold/50 hover:shadow-gold/20">
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
    </PageTransition>
  );
}
