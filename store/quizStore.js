import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQuizStore = create(
  persist(
    (set, get) => ({
      scores: {},
      setQuizScore: (quizId, newScore, totalQuestions) => {
        set((state) => ({
          scores: {
            ...state.scores,
            [quizId]: {
              score: newScore,
              totalQuestions,
              percentage: ((newScore / totalQuestions) * 100).toFixed(2),
              lastAttempt: new Date().toISOString(),
            },
          },
        }));
      },
      getQuizScore: (quizId) => {
        const scores = get().scores;
        return scores[quizId] || null;
      },
      clearScores: () => set({ scores: {} }),
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useQuizStore;
