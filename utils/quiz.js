import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore, userAuthStore} from "../store/authStore"
import { API_BK } from "../config";
const  BASE_URL =API_BK

// Save quiz score
export const saveQuizScore = async (quizId, score) => {
  try {
    const {token}=useAuthStore();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/api/quiz-scores`,
      { quizId, score },
      config
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// Get user's quiz scores
export const getUserQuizScores = async () => {
  try {
    const {token}=useAuthStore();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}/api/quiz-scores`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
