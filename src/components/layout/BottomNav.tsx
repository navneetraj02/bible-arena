import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, Trophy, Home, Award, Users, User } from 'lucide-react';
import logo from '@/assets/logo.png';

export function BottomNav() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/quiz', label: 'Quiz', icon: Trophy },
    { to: '/multiplayer', label: 'Play', icon: Users },
    { to: '/bible', label: 'Bible', icon: BookOpen },
    { to: '/leaderboard', label: 'Ranks', icon: Award },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-primary/10">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'relative',
                isActive && 'animate-bounce-in'
              )}>
                <Icon className={cn(
                  'w-5 h-5 transition-all',
                  isActive && 'drop-shadow-[0_0_8px_hsl(38_90%_50%)]'
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={cn(
                'text-[10px] font-medium',
                isActive && 'text-primary'
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
