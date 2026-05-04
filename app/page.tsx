'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Target, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function SplashPage() {
  const router = useRouter();
  const { selectedState } = useAppStore();

  const handleGetStarted = () => {
    if (selectedState) {
      router.push('/dashboard');
    } else {
      router.push('/select-state');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.amber.500/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.orange.500/0.1),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">PermitAce</h1>
          <p className="text-white/70 text-lg">Master Your DMV Test</p>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ace Your Permit Test
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Join thousands of drivers who passed their DMV test on the first try. 
                Practice with real questions, track your progress, and build confidence.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-white text-sm font-medium">120+ Questions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-white text-sm font-medium">Smart Analytics</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-white text-sm font-medium">Progress Tracking</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-white text-sm font-medium">Mock Exams</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleGetStarted}
                  className="w-full premium-button text-lg py-6"
                  size="lg"
                >
                  {selectedState ? 'Continue Learning' : 'Get Started'}
                </Button>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-white/50 text-sm">or</span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => router.push('/login')}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => router.push('/signup')}
                    variant="outline"
                    className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-white/50 text-sm">
            Trusted by 50,000+ aspiring drivers
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-4 h-4 bg-amber-400 rounded-full" />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
