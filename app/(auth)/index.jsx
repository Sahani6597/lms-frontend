import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      const { token } = response.data.token;
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView>
        <View className="flex-row items-center justify-between mt-4 px-2">
          <Text className="text-3xl font-['PoppinsBold']">Log in</Text>
          <Ionicons name="help-circle-outline" size={30} color="black" />
        </View>

        <Image source={require('../../assets/images/signin.png')} resizeMode='contain' className="h-60 w-full mt-14 mb-5" />

        <View className="px-3 items-center justify-center">
          <TextInput
            className="w-full h-14 px-3 py-2 rounded-lg text-2xl bg-gray-300 font-['Poppins'] leading-none"
            placeholder="Enter your Email"
            style={{ textAlignVertical: 'center' }}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full h-14 px-3 py-2 mt-3 rounded-lg text-2xl bg-gray-300 font-['Poppins'] leading-none"
            style={{ textAlignVertical: 'center' }}
            placeholder="Enter your Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="mx-3 w-full bg-blue-700 mt-4 rounded-md flex items-center justify-center py-2"
            onPress={handleLogin}
          >
            <Text className="text-3xl font-['PoppinsBold'] text-white">Login</Text>
          </TouchableOpacity>

          <Text className="text-center text-lg font-['Poppins'] my-1">or</Text>

          <TouchableOpacity className="w-full mx-3 flex-row justify-center items-center rounded-lg bg-gray-300 py-4">
            <Image source={require('../../assets/images/google.png')} resizeMode='contain' className="h-6 w-6" />
            <Text className="text-lg pl-3 font-['PoppinsSemiBold'] text-center">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-5 text-center text-md font-['PoppinsMed']">
          Not Yet Registered? <Link href={'/(auth)/signup'}>
            <Text className="text-blue-500"> Register Now</Text>
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;