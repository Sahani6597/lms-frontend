import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useAuthStore } from "../../../store/authStore";
import { enrollmentService } from "../../../utils/enrollmentService";

const CourseStatus = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getEnrollments(token);
      setEnrollments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchEnrollments();
    }, [fetchEnrollments])
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() =>  router.push('/(tabs)/Profile')}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Course Status</Text>
      </View>

      <ScrollView className="p-4">
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : error ? (
          <Text className="text-red-500 text-center">{error}</Text>
        ) : enrollments.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-lg font-['PoppinsMed'] text-gray-600">
              You haven't enrolled in any courses yet
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/Courses")}
              className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-['PoppinsMed']">Browse Courses</Text>
            </TouchableOpacity>
          </View>
        ) : (
          enrollments.map((enrollment) => (
            <View key={enrollment._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <Text className="text-lg font-['PoppinsSemiBold'] mb-2">
                {enrollment.course.title}
              </Text>

              <View className="h-3 bg-gray-300 rounded-full overflow-hidden">
                <View
                  className="h-full bg-blue-500"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </View>

              <Text className="text-sm text-gray-600 mt-1">
                {enrollment.status === 'completed' 
                  ? "Completed" 
                  : `Progress: ${enrollment.progress}%`}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseStatus;
