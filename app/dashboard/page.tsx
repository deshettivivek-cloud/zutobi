'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { categories, questions } from '@/data/questions';

export default function DashboardPage() {
  const router = useRouter();
  const {
    selectedState,
    readinessScore,
    currentStreak,
    totalTestsTaken,
    averageScore,
    getWeakCategories,
    getTodayRecommendation,
    getCategoryMastery
  } = useAppStore();

  const weakCategories = getWeakCategories();
  const todayRecommendation = getTodayRecommendation();

  const handleContinuePractice = () => {
    if (todayRecommendation) {
      router.push(`/practice/${todayRecommendation}`);
    } else {
      router.push('/categories');
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 80) return 'Ready to Pass';
    if (score >= 60) return 'Getting Close';
    if (score >= 40) return 'Keep Practicing';
    return 'Just Started';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-white/70 text-lg">
                {selectedState ? `Practicing for ${selectedState.name}` : 'Select your state to get started'}
              </p>
            </div>
            {selectedState && (
              <Button
                variant="outline"
                onClick={() => router.push('/select-state')}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Change State
              </Button>
            )}
          </div>
        </motion.div>

        {selectedState ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-2xl font-bold ${getReadinessColor(readinessScore)}`}>
                        {readinessScore}%
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Readiness Score</h3>
                    <p className="text-white/70 text-sm">{getReadinessLabel(readinessScore)}</p>
                    <Progress value={readinessScore} className="mt-3" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white">{currentStreak}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Current Streak</h3>
                    <p className="text-white/70 text-sm">Days of consistent practice</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white">{totalTestsTaken}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Tests Taken</h3>
                    <p className="text-white/70 text-sm">Total practice sessions</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white">{averageScore}%</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Average Score</h3>
                    <p className="text-white/70 text-sm">Across all tests</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Today's Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">
                              {todayRecommendation || 'General Practice'}
                            </h4>
                            <p className="text-white/70 text-sm">
                              {todayRecommendation 
                                ? `Focus on your weakest area (${getCategoryMastery(todayRecommendation)}% mastery)`
                                : 'Start with any category to build your foundation'
                              }
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleContinuePractice}
                          className="premium-button"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => router.push('/categories')}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          All Categories
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => router.push('/mock-exam')}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Mock Exam
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Weak Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      Weak Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {weakCategories.length > 0 ? (
                      <div className="space-y-3">
                        {weakCategories.slice(0, 3).map((category, index) => (
                          <div
                            key={category}
                            className="flex items-center justify-between p-3 bg-red-500/10 rounded-xl border border-red-500/20 cursor-pointer hover:bg-red-500/20 transition-colors"
                            onClick={() => router.push(`/practice/${category}`)}
                          >
                            <div>
                              <p className="text-white font-medium text-sm">{category}</p>
                              <p className="text-white/70 text-xs">{getCategoryMastery(category)}% mastery</p>
                            </div>
                            <Badge variant="danger" className="text-xs">
                              {getCategoryMastery(category)}%
                            </Badge>
                          </div>
                        ))}
                        {weakCategories.length > 3 && (
                          <Button
                            variant="ghost"
                            onClick={() => router.push('/weaknesses')}
                            className="w-full text-white/70 hover:text-white"
                          >
                            View all ({weakCategories.length} topics)
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-green-400" />
                        </div>
                        <p className="text-white font-medium mb-1">Great job!</p>
                        <p className="text-white/70 text-sm">No weak topics detected</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Category Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Category Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => {
                      const mastery = getCategoryMastery(category);
                      const isWeak = mastery > 0 && mastery < 60;
                      
                      return (
                        <div
                          key={category}
                          className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          onClick={() => router.push(`/practice/${category}`)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{category}</h4>
                            {isWeak && (
                              <Badge variant="danger" className="text-xs">
                                Weak
                              </Badge>
                            )}
                          </div>
                          <Progress value={mastery} className="mb-2" />
                          <p className="text-white/70 text-sm">{mastery}% mastery</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : (
          /* No State Selected */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-amber-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Target className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Select Your State to Get Started
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Choose your state to access customized DMV practice questions and track your progress.
            </p>
            <Button
              onClick={() => router.push('/select-state')}
              className="premium-button text-lg px-8 py-4"
            >
              Select State
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
