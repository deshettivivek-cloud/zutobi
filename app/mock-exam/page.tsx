'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowLeft,
  Target,
  Trophy,
  RotateCcw
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { questions } from '@/data/questions';

export default function MockExamPage() {
  const router = useRouter();
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes
  const [showResults, setShowResults] = useState(false);
  
  const {
    currentQuestions,
    currentQuestionIndex,
    sessionAnswers,
    selectedAnswer,
    isAnswered,
    showExplanation,
    startMockExam,
    answerQuestion,
    nextQuestion,
    finishSession,
    selectedState
  } = useAppStore();

  useEffect(() => {
    if (examStarted && timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !showResults) {
      handleFinishExam();
    }
  }, [examStarted, timeRemaining, showResults]);

  const startExam = () => {
    startMockExam();
    setExamStarted(true);
    setTimeRemaining(25 * 60);
  };

  const handleFinishExam = () => {
    finishSession();
    setShowResults(true);
    setExamStarted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswered) {
      answerQuestion(answerIndex);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (seconds: number) => {
    if (seconds > 600) return 'text-green-400'; // More than 10 minutes
    if (seconds > 300) return 'text-amber-400'; // More than 5 minutes
    return 'text-red-400'; // Less than 5 minutes
  };

  const calculateResults = () => {
    const correct = sessionAnswers.filter((answer, index) => 
      answer === currentQuestions[index]?.correctAnswer
    ).length;
    const score = Math.round((correct / currentQuestions.length) * 100);
    const passed = score >= 80;
    
    return { correct, score, passed };
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = currentQuestions.length > 0 ? ((currentQuestionIndex + 1) / currentQuestions.length) * 100 : 0;

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">State Required</h2>
            <p className="text-white/70 mb-6">
              Please select your state to take the mock exam
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

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              results.passed 
                ? 'bg-green-500/20 border-2 border-green-500' 
                : 'bg-red-500/20 border-2 border-red-500'
            }`}>
              {results.passed ? (
                <Trophy className="w-12 h-12 text-green-400" />
              ) : (
                <XCircle className="w-12 h-12 text-red-400" />
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              {results.passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-white/70 text-xl mb-8">
              {results.passed 
                ? `You passed with a score of ${results.score}%!`
                : `You scored ${results.score}%. Keep practicing to improve.`
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{results.score}%</div>
                  <p className="text-white/70">Final Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{results.correct}</div>
                  <p className="text-white/70">Correct Answers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">
                    {currentQuestions.length - results.correct}
                  </div>
                  <p className="text-white/70">Incorrect Answers</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/dashboard')}
                className="premium-button"
              >
                Back to Dashboard
              </Button>
              <Button
                onClick={startExam}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Exam
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="mb-8 border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-white text-center">
                  DMV Mock Exam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Target className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Ready to Test Your Knowledge?
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Take a full-length DMV practice exam with 25 randomized questions. 
                    You'll have 25 minutes to complete it. A score of 80% or higher is required to pass.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-amber-400 mb-2">25</div>
                      <p className="text-white/70 text-sm">Questions</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">25</div>
                      <p className="text-white/70 text-sm">Minutes</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-2">80%</div>
                      <p className="text-white/70 text-sm">Passing Score</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-amber-500/10 rounded-2xl border border-amber-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-amber-400 font-semibold mb-2">Important</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Once started, the exam cannot be paused</li>
                        <li>• You must answer all questions to submit</li>
                        <li>• Results will be shown immediately after completion</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={startExam}
                  className="w-full premium-button text-lg py-6"
                  size="lg"
                >
                  Start Mock Exam
                  <Target className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Exam
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-amber-500 text-amber-400">
              Mock Exam
            </Badge>
            <div className={`flex items-center gap-2 font-mono text-lg font-bold ${getTimeColor(timeRemaining)}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeRemaining)}
            </div>
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

        {/* Question */}
        {currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Question {currentQuestionIndex + 1}
                </CardTitle>
                <p className="text-white/90 text-lg mt-4">
                  {currentQuestion.question}
                </p>
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
                          ${!isAnswered 
                            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30' 
                            : isCorrect
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : isSelected
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-white/5 border-white/10 text-white/50'
                          }
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
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                          </>
                        ) : (
                          <>
                            Finish Exam
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
        )}
      </div>
    </div>
  );
}
