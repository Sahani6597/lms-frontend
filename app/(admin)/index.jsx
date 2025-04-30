import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { useAuthStore } from '../../store/authStore';
import { API_BK } from '../../config';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseError, setCourseError] = useState(null);
  const [counts, setCounts] = useState({ students: 0, instructors: 0, courses: 0 });
  const [courseLoading, setCourseLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  const calculateCounts = (users) => {
    const students = users.filter(user => user.role === 'student').length;
    const instructors = users.filter(user => user.role === 'instructor').length;
    setCounts(prev => ({ ...prev, students, instructors }));
  };

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BK}/users/listofusers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('API Response:', response.data);
      
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        calculateCounts(response.data);
      } else if (response.data?.success && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
        calculateCounts(response.data.data);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error details:', error.response || error);
      setError(error.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setCourseLoading(true);
      setCourseError(null);
      const response = await axios.get(`${API_BK}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Raw Courses Response:', response);
      console.log('Courses Data:', response.data);

      // Handle different response formats
      if (Array.isArray(response.data)) {
        setCounts(prev => ({ ...prev, courses: response.data.length }));
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setCounts(prev => ({ ...prev, courses: response.data.data.length }));
      } else if (typeof response.data === 'object') {
        // If response is an object with course entries
        const courseCount = Object.keys(response.data).length;
        setCounts(prev => ({ ...prev, courses: courseCount }));
      } else {
        setCourseError('Unable to parse course data');
        console.error('Course data structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error.response || error);
      setCourseError(error.response?.data?.message || 'Error fetching courses');
    } finally {
      setCourseLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchCourses();
    }
  }, [token]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4">
        <Text className="text-2xl font-['PoppinsBold']">Dashboard</Text>
      </View>

      <ScrollView className="px-4 pt-4">
        {/* Count Panels */}
        <View className="flex-row justify-between mt-4 flex-wrap">
          <View className="bg-blue-700 p-4 rounded-xl w-[48%] mb-4">
            <Text className="text-lg font-['PoppinsSemiBold'] text-white">Students</Text>
            <Text className="text-3xl font-['PoppinsBold'] text-white">{counts.students}</Text>
          </View>
          <View className="bg-green-600 p-4 rounded-xl w-[48%] mb-4">
            <Text className="text-lg font-['PoppinsSemiBold'] text-white">Instructors</Text>
            <Text className="text-3xl font-['PoppinsBold'] text-white">{counts.instructors}</Text>
          </View>
          <View className="bg-purple-700 p-4 rounded-xl w-full">
            <Text className="text-lg font-['PoppinsSemiBold'] text-white">Total Courses</Text>
            <Text className="text-3xl font-['PoppinsBold'] text-white">
              {courseLoading ? 'Loading...' : courseError ? '!' : counts.courses}
            </Text>
            {courseError && (
              <Text className="text-sm text-red-200">{courseError}</Text>
            )}
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-xl font-['PoppinsSemiBold'] mb-4">All Users</Text>
          
          {loading && (
            <View className="p-4">
              <Text>Loading users...</Text>
            </View>
          )}

          {error && (
            <View className="p-4 bg-red-100 rounded-xl">
              <Text className="text-red-600">{error}</Text>
            </View>
          )}

          {!loading && !error && users.length === 0 && (
            <View className="p-4">
              <Text>No users found</Text>
            </View>
          )}

          {!loading && users.map((user) => (
            <View key={user._id} className="bg-gray-100 p-4 rounded-xl mb-4">
              <Text className="font-['PoppinsSemiBold']">{user?.name || 'N/A'}</Text>
              <Text className="text-gray-500 font-['Poppins']">{user?.email || 'N/A'}</Text>
              <Text className="text-gray-500 font-['Poppins']">Role: {user?.role || 'N/A'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
