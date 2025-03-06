import { create } from 'zustand';
import { fetchCourses, fetchCourseById } from '../utils/course';

const useCourseStore = create((set) => ({
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,

  // Fetch all courses
  loadCourses: async (search = '') => {
    set({ loading: true, error: null });
    try {
      const courses = await fetchCourses(search);
      set({ courses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single course by ID
  loadCourseById: async (id) => {
    set({ loading: true, error: null });
    try {
      const course = await fetchCourseById(id);
      set({ selectedCourse: course, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCourseStore;
