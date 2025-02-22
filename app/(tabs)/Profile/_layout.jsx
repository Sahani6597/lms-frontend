import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Profile = () => {
  const data = [
    { name: 'Profile Info', icon: <MaterialIcons name="account-circle" size={28} color="grey" /> },
    { name: 'Certificates', icon: <FontAwesome name="certificate" size={28} color="grey" /> },
    { name: 'Milestones', icon: <FontAwesome name="trophy" size={28} color="grey" /> },
    { name: 'Course Status', icon: <MaterialIcons name="school" size={28} color="grey" /> },
    { name: 'Transaction History', icon: <MaterialIcons name="receipt" size={28} color="grey" /> },
    { name: 'Feedback', icon: <Entypo name="chat" size={28} color="grey" /> },
   
  ];

  return (
    <SafeAreaView className="flex-1 bg-white pt-10 px-4">
      <StatusBar style="dark" />
      
      {/* Header Section */}
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-3xl font-['PoppinsBold'] text-black ">Profile</Text>
        <MaterialIcons name="help-outline" size={30} color="#2563EB" />
      </View>

      {/* Profile Info Section */}
      <View className="mt-3 bg-blue-700 h-32 w-full rounded-xl flex-row items-center px-4">
        <View className="w-20 h-20 bg-white rounded-full justify-center items-center">
          <Image 
            source={require('@/assets/images/books.png')} 
            className="w-12 h-12 rounded-full" 
          />
        </View>
        <View className="ml-4">
          <Text className="text-2xl font-['PoppinsSemiBold'] text-white">John Doe</Text>
          <Text className="text-sm text-white font-['PoppinsSemiBold'] ">Software Engineer</Text>
        </View>
      </View>

      {/* Menu Items Section */}
      {data.map((item, index) => (
        <TouchableOpacity 
          className="mt-3 h-14 w-full flex-row items-center px-4 border-b border-gray-300"
          key={index}>
          <View className="w-10 justify-center items-center">
            {item.icon}
          </View>
          <Text className="text-xl font-['PoppinsSemiBold'] ml-4 flex-1">{item.name}</Text>
          <MaterialIcons name="navigate-next" size={24} color="grey" />
        </TouchableOpacity>
      ))}

      {/* Log Out Section */}
      <TouchableOpacity className="mt-4 px-4 flex-row items-center">
        <MaterialIcons name="exit-to-app" size={26} color="red" />
        <Text className="text-xl text-red-600 font-['PoppinsBold'] ml-2">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
