import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://192.168.1.104:5001/api/guide';

const useGuideStore = create((set) => ({
  loading: false,
  error: null,
  sessions: [],

  bookSession: async (sessionData, token) => {
    if (!token) {
      throw new Error('Authentication required');
    }

    set({ loading: true });
    try {
      const response = await axios.post(`${API_URL}/sessions`, sessionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to book session' 
      });
      throw error;
    }
  },

  getUserSessions: async (token) => {
    if (!token) {
      throw new Error('Authentication required');
    }

    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      set({ sessions: response.data, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to fetch sessions' 
      });
      throw error;
    }
  },
}));

export default useGuideStore;
