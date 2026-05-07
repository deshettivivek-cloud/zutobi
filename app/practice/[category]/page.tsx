'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  Clock,
  Target
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { questions, categories } from '@/data/questions';

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category as string;
  
  const {
    currentQuestions,
    currentQuestionIndex,
    sessionAnswers,
    selectedAnswer,
    isAnswered,
    showExplanation,
    startPracticeSession,
    answerQuestion,
    nextQuestion,
    selectedState
  } = useAppStore();

  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (category && categories.includes(category as any)) {
      startPracticeSession(category as any);
    } else {
      router.push('/categories');
    }
  }, [category]);

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const timeElapsed = Math.floor((Date.now() - startTime) / 1000);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswered) {
      answerQuestion(answerIndex);
    }
  };

  const getAnswerButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'bg-green-500/20 border-green-500 text-green-400';
    }
    
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return 'bg-red-500/20 border-red-500 text-red-400';
    }
    
    return 'bg-white/5 border-white/10 text-white/50';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'hard': return 'text-red-400';
      default: return 'text-white/70';
    }
  };

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to start practicing
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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/categories')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <Badge variant="outline" className="border-amber-500 text-amber-400">
              {category}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Progress</span>
            <span className="text-white text-sm font-medium">
              {currentQuestionIndex + 1} / {currentQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-2xl text-white flex-1">
                  {currentQuestion.question}
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className={`ml-4 ${getDifficultyColor(currentQuestion.difficulty)}`}
                >
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Answer Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isSelected = index === selectedAnswer;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      className={`
                        p-4 rounded-2xl border text-left transition-all duration-200
                        flex items-center gap-3
                        ${getAnswerButtonClass(index)}
                        ${!isAnswered && 'hover:scale-[1.02] active:scale-[0.98]'}
                        ${isAnswered && 'cursor-not-allowed'}
                      `}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 pt-4"
                  >
                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                      <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-amber-400 font-semibold mb-2">Explanation</h4>
                        <p className="text-white/80 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={nextQuestion}
                      className="w-full premium-button"
                      size="lg"
                    >
                      {currentQuestionIndex < currentQuestions.length - 1 ? (
                        <>
                          Next Question
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      ) : (
                        <>
                          Finish Practice
                          <Target className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {sessionAnswers.filter((answer, index) => 
                  answer === currentQuestions[index]?.correctAnswer
                ).length}
              </div>
              <p className="text-white/70 text-sm">Correct Answers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">
                {sessionAnswers.length}
              </div>
              <p className="text-white/70 text-sm">Questions Attempted</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {sessionAnswers.length > 0 
                  ? Math.round(
                      (sessionAnswers.filter((answer, index) => 
                        answer === currentQuestions[index]?.correctAnswer
                      ).length / sessionAnswers.length) * 100
                    )
                  : 0}%
              </div>
              <p className="text-white/70 text-sm">Current Score</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
