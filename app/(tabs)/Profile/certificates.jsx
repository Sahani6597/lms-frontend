import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const certificates = [
  { title: "React Native Basics", earned: true },
  { title: "Full Stack Development", earned: true },
  { title: "Advanced JavaScript", earned: false },
  { title: "UI/UX Design Principles", earned: false },
  { title: "Backend with Node.js", earned: false },
];

const Certificates = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Your Certificates</Text>
      </View>

      {/* Certificates List */}
      <ScrollView className="p-4">
        {certificates.map((item, index) => (
          <View
            key={index}
            className={`flex-row items-center px-4 py-3 mb-2 rounded-lg ${
              item.earned ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            {/* Icon */}
            <View className="w-10">
              <FontAwesome name="certificate" size={28} color={item.earned ? "gold" : "gray"} />
            </View>

            {/* Certificate Title */}
            <Text className="text-lg font-['PoppinsSemiBold'] flex-1">{item.title}</Text>

            {/* Earned Status */}
            {item.earned ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Text className="text-gray-600">Pending</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Certificates;
