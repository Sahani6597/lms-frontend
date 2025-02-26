import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const ProfileInfo = () => {
  const router = useRouter();
  
  // Dummy user data (to be replaced with actual user data from store)
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Profile Info</Text>
      </View>

      {/* Profile Fields */}
      <View className="p-4">
        {/* Name */}
        <Text className="text-lg font-['PoppinsSemiBold'] mb-1">Name</Text>
        <TextInput
          className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-gray-100 text-lg"
          value={name}
          onChangeText={setName}
        />

        {/* Email (Read-only) */}
        <Text className="text-lg font-['PoppinsSemiBold'] mt-4 mb-1">Email</Text>
        <TextInput
          className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-gray-100 text-lg text-gray-500"
          value={email}
          editable={false}
        />

        {/* Phone Number */}
        <Text className="text-lg font-['PoppinsSemiBold'] mt-4 mb-1">Phone Number</Text>
        <TextInput
          className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-gray-100 text-lg"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Save Button */}
        <TouchableOpacity className="mt-6 w-full bg-blue-600 py-3 rounded-lg flex items-center">
          <Text className="text-white text-2xl font-['PoppinsBold']">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileInfo;
