'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  MapPin,
  Trophy,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Settings,
  LogOut,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { categories } from '@/data/questions';

export default function ProfilePage() {
  const router = useRouter();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const {
    selectedState,
    readinessScore,
    currentStreak,
    longestStreak,
    totalTestsTaken,
    averageScore,
    testResults,
    getCategoryMastery,
    userProgress,
    resetProgress
  } = useAppStore();

  const getStudyStats = () => {
    const totalTime = testResults.reduce((sum, result) => sum + result.timeSpent, 0);
    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
    
    return { hours, minutes, days };
  };

  const getMasteryLevel = () => {
    const avgMastery = categories.reduce((sum, cat) => sum + getCategoryMastery(cat), 0) / categories.length;
    
    if (avgMastery >= 90) return { level: 'Expert', color: 'text-purple-400', bg: 'bg-purple-500/20' };
    if (avgMastery >= 75) return { level: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (avgMastery >= 60) return { level: 'Intermediate', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (avgMastery >= 40) return { level: 'Beginner', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { level: 'Novice', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const getAchievements = () => {
    const achievements = [];
    
    if (currentStreak >= 7) achievements.push({ name: 'Week Warrior', icon: '🔥', color: 'text-orange-400', bg: 'bg-orange-500/20' });
    if (currentStreak >= 30) achievements.push({ name: 'Month Master', icon: '⚡', color: 'text-purple-400', bg: 'bg-purple-500/20' });
    if (averageScore >= 90) achievements.push({ name: 'Score Master', icon: '🏆', color: 'text-amber-400', bg: 'bg-amber-500/20' });
    if (totalTestsTaken >= 50) achievements.push({ name: 'Dedicated Student', icon: '📚', color: 'text-blue-400', bg: 'bg-blue-500/20' });
    if (categories.filter(cat => getCategoryMastery(cat) >= 80).length >= 4) {
      achievements.push({ name: 'Category Expert', icon: '🎯', color: 'text-green-400', bg: 'bg-green-500/20' });
    }
    
    return achievements;
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    router.push('/');
  };

  const studyStats = getStudyStats();
  const masteryLevel = getMasteryLevel();
  const achievements = getAchievements();

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to view profile
            </p>
            <Button
              onClick={() => router.push('/select-state')}
              className="premium-button w-full"
            >
              Select State
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            My Profile
          </h1>
          <p className="text-white/70 text-lg">
            Track your progress and celebrate your achievements
          </p>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">PermitAce Student</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span className="text-white/90">{selectedState.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/70" />
                      <span className="text-white/90">
                        Joined {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-white/70" />
                      <span className={masteryLevel.color}>{masteryLevel.level} Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-white/70" />
                      <span className="text-white/90">{readinessScore}% Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{readinessScore}%</div>
                    <div className="text-xs text-green-400">+5% this week</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Readiness Score</h3>
                <p className="text-white/70 text-sm">Overall preparation level</p>
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
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{currentStreak}</div>
                    <div className="text-xs text-amber-400">Best: {longestStreak}</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Current Streak</h3>
                <p className="text-white/70 text-sm">Days of practice</p>
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{totalTestsTaken}</div>
                </div>
                <h3 className="text-white font-semibold mb-1">Tests Taken</h3>
                <p className="text-white/70 text-sm">Total practice sessions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{studyStats.days}d</div>
                </div>
                <h3 className="text-white font-semibold mb-1">Study Time</h3>
                <p className="text-white/70 text-sm">{studyStats.hours}h {studyStats.minutes}m total</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      className={`p-4 rounded-2xl border ${achievement.bg} border-white/10`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className={`font-semibold ${achievement.color}`}>{achievement.name}</h4>
                          <p className="text-white/70 text-sm">Achievement unlocked</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/50">Keep practicing to unlock achievements!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push('/categories')}
                className="w-full"
                variant="outline"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button
                onClick={() => router.push('/analytics')}
                className="w-full"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button
                onClick={() => router.push('/select-state')}
                className="w-full"
                variant="outline"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Change State
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowResetConfirm(true)}
                className="w-full"
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Progress
              </Button>
              
              {showResetConfirm && (
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2">Reset All Progress?</h4>
                      <p className="text-white/80 text-sm mb-3">
                        This will permanently delete all your practice history, progress, and achievements. This action cannot be undone.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setShowResetConfirm(false)}
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleResetProgress}
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Reset Everything
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
