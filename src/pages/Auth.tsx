import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, Phone, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.png';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const phoneSchema = z.string().regex(/^\+[1-9]\d{6,14}$/, 'Please enter a valid phone number with country code (e.g., +1234567890)');

type AuthMode = 'login' | 'signup';
type AuthMethod = 'email' | 'phone';

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading, signUpWithEmail, signInWithEmail, sendOTP, verifyOTP, signInAsGuest } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [method, setMethod] = useState<AuthMethod>('email');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; phone?: string }>({});

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateEmail = () => {
    try {
      emailSchema.parse(email);
      setErrors(prev => ({ ...prev, email: undefined }));
      return true;
    } catch (error: any) {
      setErrors(prev => ({ ...prev, email: error.errors[0].message }));
      return false;
    }
  };

  const validatePassword = () => {
    try {
      passwordSchema.parse(password);
      setErrors(prev => ({ ...prev, password: undefined }));
      return true;
    } catch (error: any) {
      setErrors(prev => ({ ...prev, password: error.errors[0].message }));
      return false;
    }
  };

  const validatePhone = () => {
    try {
      phoneSchema.parse(phone);
      setErrors(prev => ({ ...prev, phone: undefined }));
      return true;
    } catch (error: any) {
      setErrors(prev => ({ ...prev, phone: error.errors[0].message }));
      return false;
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    setIsSubmitting(true);

    if (mode === 'signup') {
      const { user, error } = await signUpWithEmail(email, password);
      if (error) {
        toast.error(getFirebaseErrorMessage(error));
      } else {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } else {
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        toast.error(getFirebaseErrorMessage(error));
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    }

    setIsSubmitting(false);
  };

  const handleSendOTP = async () => {
    if (!validatePhone()) return;

    setIsSubmitting(true);
    const { success, error } = await sendOTP(phone);

    if (error) {
      toast.error(getFirebaseErrorMessage(error));
    } else {
      setOtpSent(true);
      toast.success('OTP sent to your phone!');
    }

    setIsSubmitting(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);
    const { user, error } = await verifyOTP(otp);

    if (error) {
      toast.error(getFirebaseErrorMessage(error));
    } else {
      toast.success('Phone verified successfully!');
      navigate('/');
    }

    setIsSubmitting(false);
  };

  const getFirebaseErrorMessage = (error: string) => {
    if (error.includes('email-already-in-use')) {
      return 'This email is already registered. Try logging in instead.';
    }
    if (error.includes('invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (error.includes('weak-password')) {
      return 'Password should be at least 6 characters.';
    }
    if (error.includes('user-not-found')) {
      return 'No account found with this email. Try signing up.';
    }
    if (error.includes('wrong-password') || error.includes('invalid-credential')) {
      return 'Incorrect password. Please try again.';
    }
    if (error.includes('too-many-requests')) {
      return 'Too many attempts. Please try again later.';
    }
    if (error.includes('invalid-phone-number')) {
      return 'Please enter a valid phone number with country code.';
    }
    return error;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="Bible Arena" className="w-20 h-20 mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {mode === 'login' ? 'Welcome Back' : 'Join Bible Arena'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' ? 'Sign in to continue your journey' : 'Create an account to get started'}
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="glass-card border-0">
          <CardContent className="p-6 space-y-6">
            {/* Mode Tabs */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as AuthMode)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Method Tabs */}
            <Tabs value={method} onValueChange={(v) => { setMethod(v as AuthMethod); setOtpSent(false); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </TabsTrigger>
              </TabsList>

              {/* Email Form */}
              <TabsContent value="email" className="mt-6">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        className="pl-10 bg-background"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        className="pl-10 pr-10 bg-background"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Phone Form */}
              <TabsContent value="phone" className="mt-6">
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+1234567890"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={validatePhone}
                          className="pl-10 bg-background"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      <p className="text-xs text-muted-foreground">
                        Include country code (e.g., +1 for US, +91 for India)
                      </p>
                    </div>

                    <Button
                      id="send-otp-button"
                      type="button"
                      variant="gradient"
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleSendOTP}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Enter OTP</label>
                      <Input
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="bg-background text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        OTP sent to {phone}
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isSubmitting || otp.length !== 6}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Verify OTP
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setOtpSent(false)}
                    >
                      Change phone number
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button variant="ghost" onClick={async () => {
            setIsSubmitting(true);
            const { error } = await signInAsGuest();
            if (error) {
              toast.error(error);
            } else {
              toast.success('Continued as Guest');
              navigate('/');
            }
            setIsSubmitting(false);
          }} disabled={isSubmitting}>
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}
