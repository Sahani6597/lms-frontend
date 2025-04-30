import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';  
import { useAuthStore } from '../../store/authStore';
import { API_BK } from '../../config';
const Dashboard = () => {
  const [stats, setStats] = useState({ courses: 0, students: 0, courseStats: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useAuthStore((state) => state.token);

  const fetchStats = async () => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BK}/instructor/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Ensure response contains expected structure
      if (response.data?.success && response.data?.data) {
        setStats({
          courses: response.data.data.totalCourses || 0,
          students: response.data.data.totalStudents || 0,
          courseStats: response.data.data.courseStats || []
        });
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
      setError('Failed to load dashboard data');
      setStats({ courses: 0, students: 0, courseStats: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const StatCard = ({ loading, error, value, label, icon, bgColor }) => (
    <View className={`p-4 rounded-xl w-[48%] ${bgColor}`}>
      {icon}
      {loading ? (
        <ActivityIndicator size="small" color="white" className="mt-2" />
      ) : error ? (
        <>
          <Text className="text-lg text-white font-['PoppinsBold'] mt-2">--</Text>
          <Text className="text-xs text-white font-['Poppins'] mt-1">Error</Text>
        </>
      ) : (
        <>
          <Text className="text-2xl text-white font-['PoppinsBold'] mt-2">{value}</Text>
          <Text className="font-['Poppins'] text-white">{label}</Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-['PoppinsBold']">Dashboard</Text>
      </View>

      <ScrollView className="px-4 pt-4">
        {/* Stats Section */}
        <View className="flex-row justify-between">
          <StatCard
            loading={loading}
            error={error}
            value={stats.courses}
            label="Active Courses"
            icon={<Ionicons name="book-outline" size={24} color="white" />}
            bgColor="bg-blue-700"
          />
          <StatCard
            loading={loading}
            error={error}
            value={stats.students}
            label="Total Students"
            icon={<Ionicons name="people-outline" size={24} color="white" />}
            bgColor="bg-green-600"
          />
        </View>

        {/* Course Enrollments */}
        <View className="mt-6">
          <Text className="text-xl font-['PoppinsSemiBold'] mb-4">Course Enrollments</Text>
          {error ? (
            <View className="bg-red-50 p-4 rounded-xl">
              <Text className="text-red-600 font-['Poppins']">Failed to load course statistics</Text>
            </View>
          ) : (
            stats.courseStats.map((course) => (
              <View key={course._id} className="bg-gray-100 p-4 rounded-xl mb-4">
                <Text className="font-['PoppinsSemiBold']">{course.title}</Text>
                <Text className="text-gray-500 font-['Poppins']">
                  {course.totalEnrolled} students enrolled
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
