'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { states } from '@/data/questions';

export default function SelectStatePage() {
  const router = useRouter();
  const { setSelectedState } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (state: typeof states[0]) => {
    setSelectedState(state);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Select Your State
          </h1>
          <p className="text-white/70 text-lg">
            Choose your state to get started with customized DMV practice questions
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 premium-input"
            />
          </div>
        </motion.div>

        {/* States Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredStates.map((state, index) => (
            <motion.div
              key={state.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:border-amber-500/50 transition-all duration-200"
                onClick={() => handleStateSelect(state)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{state.name}</div>
                      <div className="text-sm text-white/70 font-normal">{state.code}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Questions</span>
                      <span className="text-white font-semibold">{state.totalQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Passing Score</span>
                      <span className="text-white font-semibold">{state.passingScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Pass Rate</span>
                      <span className="text-green-400 font-semibold">
                        {Math.round((state.passingScore / state.totalQuestions) * 100)}%
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 premium-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStateSelect(state);
                    }}
                  >
                    Select State
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    State-Specific Questions
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Each state has unique traffic laws and testing requirements. 
                    We've curated questions that match your state's DMV test format 
                    and content to ensure you're fully prepared.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
