'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp,
  Calendar,
  Target,
  Trophy,
  BookOpen,
  ArrowLeft,
  Clock,
  CheckCircle,
  Brain
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { categories } from '@/data/questions';

export default function AnalyticsPage() {
  const router = useRouter();
  const {
    selectedState,
    readinessScore,
    currentStreak,
    totalTestsTaken,
    averageScore,
    testResults,
    getCategoryMastery,
    userProgress
  } = useAppStore();

  const getCategoryData = () => {
    return categories.map(category => ({
      name: category,
      mastery: getCategoryMastery(category),
      attempted: userProgress[category]?.attemptedQuestions.length || 0,
      correct: userProgress[category]?.correctAnswers || 0,
      weak: userProgress[category]?.weakQuestions.length || 0
    }));
  };

  const getPerformanceData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return last7Days.map(date => {
      const dayResults = testResults.filter(result => {
        const resultDate = new Date(result.date);
        return resultDate.toDateString() === date.toDateString();
      });

      const avgScore = dayResults.length > 0 
        ? dayResults.reduce((sum, r) => sum + r.score, 0) / dayResults.length
        : 0;

      return {
        date: date.toLocaleDateString('en', { weekday: 'short' }),
        score: Math.round(avgScore),
        tests: dayResults.length
      };
    });
  };

  const getPassProbability = () => {
    if (averageScore === 0) return 0;
    const passingThreshold = 80;
    const standardDeviation = 15; // Estimated
    const zScore = (averageScore - passingThreshold) / standardDeviation;
    const probability = 1 / (1 + Math.exp(-zScore));
    return Math.round(probability * 100);
  };

  const getStudyTime = () => {
    const totalTime = testResults.reduce((sum, result) => sum + result.timeSpent, 0);
    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f97316'];
  const categoryData = getCategoryData();
  const performanceData = getPerformanceData();
  const passProbability = getPassProbability();
  const studyTime = getStudyTime();

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Brain className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to view analytics
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold text-white">
            Progress Analytics
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Key Metrics */}
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
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{readinessScore}%</div>
                    <div className="text-xs text-green-400">+5% this week</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Readiness Score</h3>
                <Progress value={readinessScore} className="h-2" />
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
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{passProbability}%</div>
                    <div className="text-xs text-amber-400">High probability</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Pass Probability</h3>
                <p className="text-white/70 text-sm">Based on your performance</p>
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
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {studyTime.hours}h {studyTime.minutes}m
                    </div>
                    <div className="text-xs text-blue-400">Total study time</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Study Time</h3>
                <p className="text-white/70 text-sm">Across all sessions</p>
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
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{currentStreak}</div>
                    <div className="text-xs text-green-400">Days active</div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">Current Streak</h3>
                <p className="text-white/70 text-sm">Keep it going!</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Category Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Bar dataKey="mastery" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-white">7-Day Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="p-4 bg-white/5 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{category.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${
                          category.mastery >= 80 ? 'border-green-500 text-green-400' :
                          category.mastery >= 60 ? 'border-amber-500 text-amber-400' :
                          'border-red-500 text-red-400'
                        }`}
                      >
                        {category.mastery}%
                      </Badge>
                    </div>
                    <Progress value={category.mastery} className="mb-3 h-2" />
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/70">Attempted</p>
                        <p className="text-white font-medium">{category.attempted}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Correct</p>
                        <p className="text-green-400 font-medium">{category.correct}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Weak</p>
                        <p className="text-red-400 font-medium">{category.weak}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{totalTestsTaken}</div>
                <p className="text-white/70">Total Tests</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{averageScore}%</div>
                <p className="text-white/70">Average Score</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {categories.filter(cat => getCategoryMastery(cat) >= 80).length}
                </div>
                <p className="text-white/70">Mastered</p>
              </div>
              
              <Button
                onClick={() => router.push('/categories')}
                className="w-full premium-button"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Studying
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
