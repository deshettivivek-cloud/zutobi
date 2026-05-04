'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { categories, questions, Category } from '@/data/questions';

export default function CategoriesPage() {
  const router = useRouter();
  const { selectedState, getCategoryMastery, userProgress } = useAppStore();

  const getCategoryStats = (category: Category) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const progress = userProgress[category];
    const attempted = progress?.attemptedQuestions.length || 0;
    const mastery = getCategoryMastery(category);
    
    return {
      total: categoryQuestions.length,
      attempted,
      mastery,
      completed: progress?.correctAnswers || 0,
      weak: progress?.weakQuestions.length || 0
    };
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-400';
    if (mastery >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getMasteryBadge = (mastery: number) => {
    if (mastery >= 80) return { variant: 'success' as const, text: 'Strong' };
    if (mastery >= 60) return { variant: 'warning' as const, text: 'Good' };
    return { variant: 'danger' as const, text: 'Weak' };
  };

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to access practice categories
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
            Practice Categories
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Master each topic area with targeted practice. Track your progress and focus on areas that need improvement.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const stats = getCategoryStats(category);
            const masteryBadge = getMasteryBadge(stats.mastery);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:border-amber-500/50 transition-all duration-200 group"
                      onClick={() => router.push(`/practice/${category}`)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">{category}</div>
                          <div className="text-sm text-white/70 font-normal">
                            {stats.total} questions
                          </div>
                        </div>
                      </div>
                      <Badge variant={masteryBadge.variant} className="text-xs">
                        {masteryBadge.text}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-sm">Mastery</span>
                          <span className={`text-sm font-semibold ${getMasteryColor(stats.mastery)}`}>
                            {stats.mastery}%
                          </span>
                        </div>
                        <Progress value={stats.mastery} className="h-2" />
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <div>
                            <p className="text-white text-sm font-medium">{stats.completed}</p>
                            <p className="text-white/50 text-xs">Correct</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <div>
                            <p className="text-white text-sm font-medium">{stats.attempted}</p>
                            <p className="text-white/50 text-xs">Attempted</p>
                          </div>
                        </div>
                      </div>

                      {/* Weak Questions Alert */}
                      {stats.weak > 0 && (
                        <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-xl border border-red-500/20">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <p className="text-white/70 text-sm">
                            {stats.weak} questions need review
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button 
                        className="w-full premium-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/practice/${category}`);
                        }}
                      >
                        {stats.attempted > 0 ? 'Continue Practice' : 'Start Practice'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {categories.length}
                  </div>
                  <p className="text-white/70 text-sm">Total Categories</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {categories.filter(cat => getCategoryMastery(cat) > 0).length}
                  </div>
                  <p className="text-white/70 text-sm">Categories Started</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {categories.filter(cat => getCategoryMastery(cat) >= 80).length}
                  </div>
                  <p className="text-white/70 text-sm">Mastered</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">
                    {Math.round(
                      categories.reduce((sum, cat) => sum + getCategoryMastery(cat), 0) / categories.length
                    )}%
                  </div>
                  <p className="text-white/70 text-sm">Average Mastery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
