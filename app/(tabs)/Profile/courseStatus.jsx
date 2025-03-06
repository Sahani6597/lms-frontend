import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const courses = [
  { title: "React Native Basics", progress: 100 },
  { title: "Advanced JavaScript", progress: 75 },
  { title: "UI/UX Design Fundamentals", progress: 40 },
  { title: "Full Stack Development", progress: 10 },
  { title: "Machine Learning for Beginners", progress: 0 },
];

const CourseStatus = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Course Status</Text>
      </View>

      {/* Courses List */}
      <ScrollView className="p-4">
        {courses.map((course, index) => (
          <View key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-lg font-['PoppinsSemiBold'] mb-2">{course.title}</Text>

            {/* Custom Progress Bar */}
            <View className="h-3 bg-gray-300 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-500"
                style={{ width: `${course.progress}%` }}
              />
            </View>

            <Text className="text-sm text-gray-600 mt-1">
              {course.progress === 100 ? "Completed" : `Progress: ${course.progress}%`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseStatus;
