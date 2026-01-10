import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    User as UserIcon,
    Settings,
    LogOut,
    Trophy,
    Star,
    Shield,
    Edit2,
    Check,
    X,
    Mail,
    Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile } from 'firebase/auth';
import { useUserStats } from '@/hooks/useUserStats';
import { getLevel } from '@/hooks/useQuiz';

export default function Profile() {
    const { user, logout, loading: authLoading } = useAuth();
    const { stats, loading: statsLoading } = useUserStats(user?.uid);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleLogout = async () => {
        const { error } = await logout();
        if (error) {
            toast.error(error);
        } else {
            toast.success('Logged out successfully');
            navigate('/auth');
        }
    };

    const handleSaveProfile = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL
            });
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error: any) {
            toast.error('Failed to update profile: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const cancelEdit = () => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
        setIsEditing(false);
    };

    if (authLoading || statsLoading) {
        return (
            <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background pb-20 px-4 pt-8 flex flex-col items-center justify-center text-center space-y-4">
                <h2 className="text-2xl font-bold">Sign in to view profile</h2>
                <Button onClick={() => navigate('/auth')}>Sign In</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-24 px-4 pt-8 max-w-lg mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Settings className="w-5 h-5" />
                </Button>
            </div>

            {/* User Info Card */}
            <Card className="glass-card border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-primary/20 to-secondary/20" />
                <CardContent className="pt-12 relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-4 group">
                        <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                            <AvatarImage src={user.photoURL || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="text-2xl">{user.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'U'}</AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-white">Change</span>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="w-full space-y-3 px-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-1 text-left">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="space-y-1 text-left">
                                <Label htmlFor="photo">Avatar URL</Label>
                                <Input
                                    id="photo"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="bg-background/50"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex gap-2 justify-center pt-2">
                                <Button size="sm" variant="outline" onClick={cancelEdit} disabled={isSaving}>
                                    <X className="w-4 h-4 mr-1" /> Cancel
                                </Button>
                                <Button size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                                    <Check className="w-4 h-4 mr-1" /> Save
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1 mb-2">
                            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                                {user.isAnonymous ? 'Guest User' : (user.displayName || 'Anonymous User')}
                                {!user.isAnonymous && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-full hover:bg-primary/20"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit2 className="w-3 h-3 text-muted-foreground" />
                                    </Button>
                                )}
                            </h2>
                            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                                {user.isAnonymous ? (
                                    <span className="flex items-center gap-1 text-yellow-500">
                                        <Shield className="w-3 h-3" /> Guest Account
                                    </span>
                                ) : (
                                    <>
                                        <Mail className="w-3 h-3" /> {user.email || user.phoneNumber || 'No contact info'}
                                    </>
                                )}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="glass-card border-primary/10">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                        <div className="p-2 rounded-full bg-yellow-500/10 mb-1">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="text-2xl font-bold">{stats.totalScore.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Score</span>
                    </CardContent>
                </Card>
                <Card className="glass-card border-primary/10">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                        <div className="p-2 rounded-full bg-purple-500/10 mb-1">
                            <Shield className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-2xl font-bold">{getLevel(stats.totalScore).name}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Rank</span>
                    </CardContent>
                </Card>
                <Card className="glass-card border-primary/10">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                        <div className="p-2 rounded-full bg-blue-500/10 mb-1">
                            <Star className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-2xl font-bold">{stats.quizzesWon}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Quizzes Won</span>
                    </CardContent>
                </Card>
                <Card className="glass-card border-primary/10">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                        <div className="p-2 rounded-full bg-green-500/10 mb-1">
                            <Calendar className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-2xl font-bold">{stats.highestStreak}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Best Streak</span>
                    </CardContent>
                </Card>
            </div>

            {/* Account Info */}
            <Card className="glass-card border-primary/10">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-primary" /> Account Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                        <span className="text-sm text-muted-foreground">Member Since</span>
                        <span className="text-sm font-medium">
                            {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                        <span className="text-sm text-muted-foreground">Last Login</span>
                        <span className="text-sm font-medium">
                            {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">User ID</span>
                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                            {user.uid.slice(0, 8)}...
                        </span>
                    </div>
                </CardContent>
            </Card>

            {user.isAnonymous && (
                <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                        <p className="text-sm font-medium">Create an account to save your progress permanently!</p>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Sign Up / Log In
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={handleLogout}
            >
                <LogOut className="w-4 h-4" /> Sign Out
            </Button>
        </div>
    );
}
