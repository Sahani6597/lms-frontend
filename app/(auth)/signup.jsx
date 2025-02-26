import { useState } from "react";
import { 
  View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { signupUser } from "../../utils/auth";

const Signup = () => {
  // State Management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await signupUser({ name, email, password });
      Alert.alert("Success", response.message);
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 px-2">
          <Text className="text-3xl font-['PoppinsBold']">Sign up</Text>
          <Ionicons name="help-circle-outline" size={30} color="black" />
        </View>

        {/* Signup Image */}
        <Image 
          source={require("../../assets/images/signup.png")} 
          resizeMode="contain" 
          className="h-60 w-full mt-1 -mb-" 
        />

        <Text className="px-3 text-xl font-['PoppinsSemiBold'] mt-2">Create your Account</Text>

        {/* Input Fields */}
        <View className="px-3 items-center justify-center">
          <TextInput
            className="w-full h-14 px-3 py-2 mt-3 rounded-lg text-2xl bg-gray-300 font-['Poppins']"
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="w-full h-14 px-3 py-2 mt-3 rounded-lg text-2xl bg-gray-300 font-['Poppins']"
            placeholder="Enter your Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full h-14 px-3 py-2 mt-3 rounded-lg text-2xl bg-gray-300 font-['Poppins']"
            placeholder="Enter your Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            className="w-full h-14 px-3 py-2 mt-3 rounded-lg text-2xl bg-gray-300 font-['Poppins']"
            placeholder="Confirm your Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Signup Button */}
          <TouchableOpacity 
            className="mx-3 w-full bg-blue-700 mt-4 rounded-md flex items-center justify-center py-3"
            onPress={handleSignup}
          >
            <Text className="text-3xl font-['PoppinsBold'] text-white">Sign Up</Text>
          </TouchableOpacity>

          <Text className="text-center text-lg font-['Poppins'] my-1">or</Text>

          {/* Google Signup */}
          <TouchableOpacity className="w-full mx-3 flex-row justify-center items-center rounded-lg bg-gray-300 py-4">
            <Image 
              source={require("../../assets/images/google.png")} 
              resizeMode="contain" 
              className="h-6 w-6" 
            />
            <Text className="text-xl pl-3 font-['PoppinsSemiBold'] text-center">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation to Login */}
        <Text className="mt-5 text-center text-md font-['PoppinsMed']">
          Already Registered?  
          <Link href={"/(auth)"}>
            <Text className="text-blue-500"> Sign in</Text>
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
