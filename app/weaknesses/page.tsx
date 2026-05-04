'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  ArrowRight,
  Brain,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { categories, questions, Category } from '@/data/questions';

export default function WeaknessesPage() {
  const router = useRouter();
  const { getWeakCategories, getCategoryMastery, userProgress, selectedState } = useAppStore();

  const weakCategories = getWeakCategories();
  
  const getWeaknessDetails = (category: Category) => {
    const progress = userProgress[category];
    const categoryQuestions = questions.filter(q => q.category === category);
    const weakQuestions = progress?.weakQuestions || [];
    const weakQuestionDetails = categoryQuestions.filter(q => weakQuestions.includes(q.id));
    
    return {
      totalWeak: weakQuestions.length,
      mastery: getCategoryMastery(category),
      questions: weakQuestionDetails,
      improvement: Math.max(0, 100 - getCategoryMastery(category))
    };
  };

  const getTopWeakQuestions = () => {
    const allWeakQuestions: any[] = [];
    
    categories.forEach(category => {
      const details = getWeaknessDetails(category);
      details.questions.forEach((question: any) => {
        allWeakQuestions.push({
          ...question,
          category,
          improvement: details.improvement
        });
      });
    });
    
    return allWeakQuestions.slice(0, 10);
  };

  const getFocusRecommendation = () => {
    if (weakCategories.length === 0) return null;
    
    const weakest = weakCategories.reduce((weakest, category) => {
      const mastery = getCategoryMastery(category);
      const weakestMastery = getCategoryMastery(weakest);
      return mastery < weakestMastery ? category : weakest;
    });
    
    return {
      category: weakest,
      mastery: getCategoryMastery(weakest),
      improvement: Math.max(0, 100 - getCategoryMastery(weakest)),
      action: 'practice'
    };
  };

  const topWeakQuestions = getTopWeakQuestions();
  const focusRecommendation = getFocusRecommendation();

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to view weakness analysis
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
            Weakness Analysis
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Identify your weak areas and focus your practice where it matters most. 
            Targeted practice leads to faster improvement.
          </p>
        </motion.div>

        {weakCategories.length > 0 ? (
          <>
            {/* Focus Recommendation */}
            {focusRecommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1">
                            Focus Now: {focusRecommendation.category}
                          </h2>
                          <p className="text-white/70">
                            {focusRecommendation.mastery}% mastery - {focusRecommendation.improvement}% improvement potential
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => router.push(`/practice/${focusRecommendation.category}`)}
                        className="premium-button"
                      >
                        Start Practice
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Weak Categories Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    Weak Categories ({weakCategories.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weakCategories.map((category, index) => {
                      const details = getWeaknessDetails(category);
                      
                      return (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="cursor-pointer hover:border-red-500/50 transition-all duration-200"
                                onClick={() => router.push(`/practice/${category}`)}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-semibold">{category}</h3>
                                <Badge variant="danger" className="text-xs">
                                  {details.mastery}%
                                </Badge>
                              </div>
                              
                              <Progress value={details.mastery} className="mb-3 h-2" />
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">Weak Questions</span>
                                  <span className="text-red-400 font-medium">{details.totalWeak}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">Improvement Needed</span>
                                  <span className="text-amber-400 font-medium">+{details.improvement}%</span>
                                </div>
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-3 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/practice/${category}`);
                                }}
                              >
                                <Target className="w-4 h-4 mr-2" />
                                Focus Practice
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Weak Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Brain className="w-6 h-6 text-purple-400" />
                    Top Questions to Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topWeakQuestions.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => router.push(`/practice/${item.category}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
                                {item.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-amber-500 text-amber-400">
                                {item.difficulty}
                              </Badge>
                            </div>
                            <p className="text-white/90 text-sm mb-2">{item.question}</p>
                            <p className="text-white/60 text-xs">
                              {item.improvement}% improvement potential
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300 ml-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/practice/${item.category}`);
                            }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : (
          /* No Weaknesses */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Excellent Work!
            </h2>
            <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
              You don't have any weak categories right now. 
              Keep up the great work and consider taking a mock exam to test your knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/categories')}
                className="premium-button"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button
                onClick={() => router.push('/mock-exam')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Target className="w-4 h-4 mr-2" />
                Take Mock Exam
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
