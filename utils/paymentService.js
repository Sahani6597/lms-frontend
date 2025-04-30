import axios from 'axios';
import { API_URL } from '../config';

export const createPayment = async (courseId, paymentMethod, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/create`,
      { courseId, paymentMethod },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentHistory = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/payments/history`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
