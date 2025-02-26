import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const milestones = [
  { title: "Joined the Platform", achieved: true, icon: "user-plus" },
  { title: "Completed First Course", achieved: true, icon: "book" },
  { title: "Earned First Certificate", achieved: false, icon: "certificate" },
  { title: "Completed 5 Courses", achieved: false, icon: "graduation-cap" },
  { title: "Top 10% of Learners", achieved: false, icon: "trophy" },
];

const Milestones = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Your Milestones</Text>
      </View>

      {/* Milestones List */}
      <ScrollView className="p-4">
        {milestones.map((item, index) => (
          <View
            key={index}
            className={`flex-row items-center px-4 py-3 mb-2 rounded-lg ${
              item.achieved ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            {/* Icon */}
            <View className="w-10">
              <FontAwesome name={item.icon} size={28} color={item.achieved ? "green" : "gray"} />
            </View>

            {/* Left-aligned text */}
            <Text className="text-lg ml-3 font-['PoppinsSemiBold'] flex-1">{item.title}</Text>

            {/* Checkmark if achieved */}
            {item.achieved && <Ionicons name="checkmark-circle" size={24} color="green" />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Milestones;
