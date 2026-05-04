import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, StateInfo, Category } from '@/data/questions';

interface UserProgress {
  [categoryId: string]: {
    totalQuestions: number;
    correctAnswers: number;
    attemptedQuestions: string[];
    weakQuestions: string[];
  };
}

interface TestResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  category?: Category;
  type: 'practice' | 'mock';
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastLogin: string;
}

interface AppState {
  // Authentication state
  user: User | null;
  isAuthenticated: boolean;
  
  // User state
  selectedState: StateInfo | null;
  currentStreak: number;
  longestStreak: number;
  totalTestsTaken: number;
  averageScore: number;
  readinessScore: number;
  
  // Progress tracking
  userProgress: UserProgress;
  testResults: TestResult[];
  
  // Current session
  currentQuestionIndex: number;
  currentQuestions: Question[];
  sessionAnswers: number[];
  sessionStartTime: number | null;
  currentCategory: Category | null;
  isMockExam: boolean;
  
  // UI state
  showExplanation: boolean;
  selectedAnswer: number | null;
  isAnswered: boolean;
  
  // Actions
  setSelectedState: (state: StateInfo) => void;
  startPracticeSession: (category: Category) => void;
  startMockExam: () => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  finishSession: () => void;
  resetProgress: () => void;
  updateProgress: (category: Category, questionId: string, isCorrect: boolean) => void;
  calculateReadinessScore: () => number;
  getWeakCategories: () => Category[];
  getCategoryMastery: (category: Category) => number;
  getTodayRecommendation: () => Category | null;
  
  // Authentication actions
  login: (email: string, password: string) => { success: boolean; user?: User; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; user?: User; error?: string };
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      selectedState: null,
      currentStreak: 0,
      longestStreak: 0,
      totalTestsTaken: 0,
      averageScore: 0,
      readinessScore: 0,
      
      userProgress: {},
      testResults: [],
      
      currentQuestionIndex: 0,
      currentQuestions: [],
      sessionAnswers: [],
      sessionStartTime: null,
      currentCategory: null,
      isMockExam: false,
      
      showExplanation: false,
      selectedAnswer: null,
      isAnswered: false,
      
      // Actions
      setSelectedState: (state) => set({ selectedState: state }),
      
      startPracticeSession: (category) => {
        const { questions } = require('@/data/questions');
        const categoryQuestions = questions.filter((q: any) => q.category === category);
        const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
        
        set({
          currentQuestions: shuffled,
          currentQuestionIndex: 0,
          sessionAnswers: [],
          sessionStartTime: Date.now(),
          currentCategory: category,
          isMockExam: false,
          showExplanation: false,
          selectedAnswer: null,
          isAnswered: false,
        });
      },
      
      startMockExam: () => {
        const { questions } = require('@/data/questions');
        const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 25);
        
        set({
          currentQuestions: shuffled,
          currentQuestionIndex: 0,
          sessionAnswers: [],
          sessionStartTime: Date.now(),
          currentCategory: null,
          isMockExam: true,
          showExplanation: false,
          selectedAnswer: null,
          isAnswered: false,
        });
      },
      
      answerQuestion: (answerIndex) => {
        const state = get();
        const currentQuestion = state.currentQuestions[state.currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswer;
        
        set({
          selectedAnswer: answerIndex,
          isAnswered: true,
          showExplanation: true,
        });
        
        // Update progress
        if (!state.isMockExam && state.currentCategory) {
          state.updateProgress(state.currentCategory, currentQuestion.id, isCorrect);
        }
      },
      
      nextQuestion: () => {
        const state = get();
        if (state.currentQuestionIndex < state.currentQuestions.length - 1) {
          set({
            currentQuestionIndex: state.currentQuestionIndex + 1,
            showExplanation: false,
            selectedAnswer: null,
            isAnswered: false,
          });
        } else {
          state.finishSession();
        }
      },
      
      finishSession: () => {
        const state = get();
        const correctAnswers = state.sessionAnswers.filter((answer, index) => 
          answer === state.currentQuestions[index].correctAnswer
        ).length;
        
        const score = Math.round((correctAnswers / state.currentQuestions.length) * 100);
        const timeSpent = state.sessionStartTime ? Date.now() - state.sessionStartTime : 0;
        
        const testResult: TestResult = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          score,
          totalQuestions: state.currentQuestions.length,
          timeSpent,
          category: state.currentCategory || undefined,
          type: state.isMockExam ? 'mock' : 'practice',
        };
        
        const newTestResults = [...state.testResults, testResult];
        const newAverageScore = Math.round(
          newTestResults.reduce((sum, result) => sum + result.score, 0) / newTestResults.length
        );
        
        // Update streak
        const passedTest = score >= 80;
        const newStreak = passedTest ? state.currentStreak + 1 : 0;
        
        set({
          testResults: newTestResults,
          averageScore: newAverageScore,
          totalTestsTaken: state.totalTestsTaken + 1,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.longestStreak),
          readinessScore: state.calculateReadinessScore(),
          currentQuestions: [],
          sessionAnswers: [],
          sessionStartTime: null,
          currentCategory: null,
          isMockExam: false,
          showExplanation: false,
          selectedAnswer: null,
          isAnswered: false,
          currentQuestionIndex: 0,
        });
      },
      
      updateProgress: (category, questionId, isCorrect) => {
        const state = get();
        const progress = state.userProgress[category] || {
          totalQuestions: 0,
          correctAnswers: 0,
          attemptedQuestions: [],
          weakQuestions: [],
        };
        
        if (!progress.attemptedQuestions.includes(questionId)) {
          progress.attemptedQuestions.push(questionId);
          progress.totalQuestions++;
          
          if (isCorrect) {
            progress.correctAnswers++;
            // Remove from weak questions if present
            progress.weakQuestions = progress.weakQuestions.filter(id => id !== questionId);
          } else {
            // Add to weak questions if not present
            if (!progress.weakQuestions.includes(questionId)) {
              progress.weakQuestions.push(questionId);
            }
          }
        }
        
        set({
          userProgress: {
            ...state.userProgress,
            [category]: progress,
          },
        });
      },
      
      calculateReadinessScore: () => {
        const state = get();
        const categories = ['Road Signs', 'Traffic Laws', 'Safe Driving', 'Parking Rules', 'Alcohol & Drugs', 'Emergencies'] as Category[];
        
        let totalScore = 0;
        let categoriesWithProgress = 0;
        
        categories.forEach(category => {
          const mastery = state.getCategoryMastery(category);
          if (mastery > 0) {
            totalScore += mastery;
            categoriesWithProgress++;
          }
        });
        
        if (categoriesWithProgress === 0) return 0;
        
        const averageMastery = totalScore / categoriesWithProgress;
        const testPerformance = state.averageScore;
        const streakBonus = Math.min(state.currentStreak * 2, 20);
        
        return Math.min(Math.round((averageMastery * 0.6) + (testPerformance * 0.3) + streakBonus), 100);
      },
      
      getWeakCategories: () => {
        const state = get();
        const categories = ['Road Signs', 'Traffic Laws', 'Safe Driving', 'Parking Rules', 'Alcohol & Drugs', 'Emergencies'] as Category[];
        
        return categories.filter(category => {
          const mastery = state.getCategoryMastery(category);
          return mastery > 0 && mastery < 60;
        });
      },
      
      getCategoryMastery: (category) => {
        const state = get();
        const progress = state.userProgress[category];
        
        if (!progress || progress.totalQuestions === 0) return 0;
        
        return Math.round((progress.correctAnswers / progress.totalQuestions) * 100);
      },
      
      getTodayRecommendation: () => {
        const state = get();
        const weakCategories = state.getWeakCategories();
        
        if (weakCategories.length > 0) {
          // Return the weakest category
          return weakCategories.reduce((weakest, category) => {
            const mastery = state.getCategoryMastery(category);
            const weakestMastery = state.getCategoryMastery(weakest);
            return mastery < weakestMastery ? category : weakest;
          });
        }
        
        // If no weak categories, recommend the least practiced
        const categories = ['Road Signs', 'Traffic Laws', 'Safe Driving', 'Parking Rules', 'Alcohol & Drugs', 'Emergencies'] as Category[];
        return categories.reduce((least, category) => {
          const progress = state.userProgress[category];
          const leastProgress = state.userProgress[least];
          const progressCount = progress?.totalQuestions || 0;
          const leastCount = leastProgress?.totalQuestions || 0;
          return progressCount < leastCount ? category : least;
        });
      },
      
      resetProgress: () => {
        set({
          userProgress: {},
          testResults: [],
          currentStreak: 0,
          longestStreak: 0,
          totalTestsTaken: 0,
          averageScore: 0,
          readinessScore: 0,
        });
      },
      
      // Authentication actions
      login: (email: string, password: string) => {
        // Mock authentication - in production, this would call an API
        const mockUsers = [
          { id: '1', email: 'demo@permitace.com', password: 'demo123', name: 'Demo User' },
          { id: '2', email: 'user@test.com', password: 'test123', name: 'Test User' }
        ];
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userState: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          
          set({
            user: userState,
            isAuthenticated: true
          });
          
          return { success: true, user: userState };
        }
        
        return { success: false, error: 'Invalid email or password' };
      },
      
      signup: (name: string, email: string, password: string) => {
        // Mock signup - in production, this would call an API
        const existingUsers = ['demo@permitace.com', 'user@test.com'];
        
        if (existingUsers.includes(email)) {
          return { success: false, error: 'Email already exists' };
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        set({
          user: newUser,
          isAuthenticated: true
        });
        
        return { success: true, user: newUser };
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
    }),
    {
      name: 'permit-ace-storage',
    }
  )
);
