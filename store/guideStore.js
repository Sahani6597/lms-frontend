import { create } from 'zustand';
import axios from 'axios';
import { API_BK } from "../config";
const API_URL = `${API_BK}/guide`;

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

  fetchSessions: async (token) => {
    if (!token) {
      throw new Error('Authentication required');
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ 
        sessions: response.data.data,
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to fetch sessions',
        sessions: []
      });
      throw error;
    }
  },
  getInstructors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BK}/users/instructors`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || 'Failed to fetch instructors' });
      throw error;
    }
  },
  clearSessions: () => set({ sessions: [], error: null }),
}));

export default useGuideStore;
