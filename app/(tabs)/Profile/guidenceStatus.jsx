import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const queries = [
  { topic: "Joined the Platform", timeSlot: "2025-03-06", status: "completed" },
  { topic: "Completed First Course", timeSlot: "2025-03-10", status: "completed" },
  { topic: "Earned First Certificate", timeSlot: "2025-04-01", status: "pending" },
  { topic: "Completed 5 Courses", timeSlot: "2025-05-15", status: "pending" },
  { topic: "Top 10% of Learners", timeSlot: "2025-06-20", status: "pending" },
];

const guidenceStatus = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Your Sessions</Text>
      </View>

      {/* Milestones List */}
      <ScrollView className="p-4">
        {queries.map((item, index) => (
          <View
            key={index}
            className={`p-4 mb-2 rounded-lg ${
              item.status === "completed" ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <Text className="text-lg font-['PoppinsSemiBold']">{item.topic}</Text>
            <Text className="text-md text-gray-700  font-['PoppinsMed']">Time Slot: {item.timeSlot}</Text>
            <Text className={`text-md font-['Poppins'] ${
              item.status === "completed" ? "text-green-600" : "text-yellow-600"
            }`}>
              Status: {item.status}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default guidenceStatus;
