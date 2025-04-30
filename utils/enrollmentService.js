import axios from 'axios';
import { API_BK } from "../config";
const BASE_URL =API_BK;

export const enrollInCourse = async (courseId, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/enrollments`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Enrollment failed');
    }

    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Enrollment failed');
    }
    throw error;
  }
};

export const checkEnrollmentStatus = async (courseId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/enrollments/check/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unenrollFromCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/enrollments/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enrollmentService = {
  getEnrollments: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/enrollments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
};
