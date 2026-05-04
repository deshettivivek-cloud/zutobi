'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Chrome, Loader2 } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface GoogleLoginButtonProps {
  mode?: 'login' | 'signup';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function GoogleLoginButton({ 
  mode = 'login', 
  onSuccess, 
  onError 
}: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        onError?.('Failed to sign in with Google');
      } else {
        onSuccess?.();
      }
    } catch (error) {
      onError?.('An error occurred during Google sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    setIsLoading(true);
    
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      onError?.('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return (
      <Button
        onClick={handleGoogleSignOut}
        variant="outline"
        className="w-full border-white/20 text-white hover:bg-white/10"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing out...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Chrome className="w-4 h-4" />
            Sign Out from Google
          </div>
        )}
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className={`w-full ${
          mode === 'signup' 
            ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10' 
            : 'border-white/20 text-white hover:bg-white/10'
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Chrome className="w-4 h-4" />
            {mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
          </div>
        )}
      </Button>
    </motion.div>
  );
}
