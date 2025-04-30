import { create } from 'zustand';
import { getUserQuizScores, saveQuizScore } from '../utils/quiz';

const useQuizStore = create((set, get) => ({
  quizScores: [],
  loading: false,
  error: null,

  fetchQuizScores: async () => {
    set({ loading: true });
    try {
      const scores = await getUserQuizScores();
      set({ quizScores: scores, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  saveQuizScore: async (quizId, score, totalQuestions) => {
    set({ loading: true });
    try {
      const percentage = ((score / totalQuestions) * 100).toFixed(2);
      const savedScore = await saveQuizScore({quizId,score});
      set(state => ({
        quizScores: [...state.quizScores, savedScore],
        loading: false
      }));
      return savedScore;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getQuizScore: (quizId) => {
    const scores = get().quizScores;
    return scores.find(score => score.quizId === quizId);
  }
}));

export default useQuizStore;
