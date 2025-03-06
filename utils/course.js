import axios from 'axios';

const API_URL = 'http://192.168.1.104:5001/api/courses';

// Fetch all courses with optional search query
export const fetchCourses = async (search = '') => {
  try {
    const response = await axios.get(`${API_URL}?search=${search}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (courseData, token) => {
  try {
    const response = await axios.post(API_URL, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Update a course by ID
export const updateCourse = async (id, courseData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course by ID
export const deleteCourse = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

