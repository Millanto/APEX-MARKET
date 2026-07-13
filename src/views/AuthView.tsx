import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  Lock, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AuthView() {
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resetPassword,
    navigateTo,
    showToast
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authError, setAuthError] = useState<string | null>(null);

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
      showToast('Successfully authenticated via Google!', 'success');
      navigateTo('home');
    } catch (err: any) {
      console.error(err);
      const message = err?.message || String(err);
      if (message.includes('auth/operation-not-allowed') || message.includes('operation-not-allowed')) {
        setAuthError('operation-not-allowed');
      } else {
        setAuthError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!email.trim() || !email.includes('@')) {
      showToast('Please insert a valid email address.', 'error');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        if (!password) {
          showToast('Password is required.', 'error');
          setLoading(false);
          return;
        }
        await loginWithEmail(email, password);
        showToast('Login successful! Welcome back.', 'success');
        navigateTo('home');
      } else if (mode === 'register') {
        if (!name.trim()) {
          showToast('Please insert your name to create an account.', 'error');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          showToast('Firebase requires a password with at least 6 characters.', 'error');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          showToast('Passwords do not match.', 'error');
          setLoading(false);
          return;
        }
        await registerWithEmail(name, email, password);
        setPassword('');
        setConfirmPassword('');
        setMode('login');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        showToast('Password reset link dispatched! Check your email.', 'success');
        setMode('login');
      }
    } catch (err: any) {
      console.error(err);
      const message = err?.message || String(err);
      if (message.includes('auth/operation-not-allowed') || message.includes('operation-not-allowed')) {
        setAuthError('operation-not-allowed');
      } else {
        setAuthError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 relative overflow-hidden">
          {/* Top visual accents */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-zinc-900 via-zinc-400 to-zinc-900 dark:from-white dark:via-zinc-700 dark:to-white" />

          {/* Title Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-xs text-zinc-400">
              {mode === 'login' && 'Access your orders, wishlist, and profile.'}
              {mode === 'register' && 'Sign up to start shopping on ApexMarket.'}
              {mode === 'forgot' && 'Enter your registered email address.'}
            </p>
          </div>

          {/* Auth Error Guidance Box */}
          {authError && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl text-left flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-red-800 dark:text-red-300">Authentication Error</h4>
                <p className="text-xs text-red-600 dark:text-red-400 font-mono break-all">{authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleEmailAction} className="space-y-4">
            
            {/* Register: Name input */}
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Your full name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm"
                      placeholder="Eleanor Sterling"
                    />
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General: Email input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  placeholder="eleanor@vogue.com"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Passwords */}
            {mode !== 'forgot' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                  </div>
                </div>

                {/* Confirm Password (register mode) */}
                <AnimatePresence>
                  {mode === 'register' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5"
                    >
                      <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Verify password</label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm"
                          placeholder="••••••••"
                        />
                        <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Primary Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>
                {loading && 'Please wait...'}
                {!loading && mode === 'login' && 'Sign In'}
                {!loading && mode === 'register' && 'Create Account'}
                {!loading && mode === 'forgot' && 'Send Reset Link'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Sign In (hidden in forgot mode) */}
          {mode !== 'forgot' && (
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-150 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow border-t border-zinc-150 dark:border-zinc-800"></div>
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              >
                {/* SVG Google Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.81-2.6-1.53-4.53 1.18-4.53V14.09z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign In with Google</span>
              </button>
            </div>
          )}

          {/* Footer toggle mode options */}
          <div className="text-center text-xs">
            {mode === 'login' && (
              <p className="text-zinc-500">
                New to the platform?{' '}
                <button onClick={() => setMode('register')} className="text-zinc-950 dark:text-white font-bold hover:underline cursor-pointer">Create Account</button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-zinc-500">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-zinc-950 dark:text-white font-bold hover:underline cursor-pointer">Sign In instead</button>
              </p>
            )}
            {mode === 'forgot' && (
              <p className="text-zinc-500">
                Remember your password?{' '}
                <button onClick={() => setMode('login')} className="text-zinc-950 dark:text-white font-bold hover:underline cursor-pointer">Back to Sign In</button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
