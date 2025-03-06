import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../store/authStore';

const Profile = () => {
  const router = useRouter();
  const { getUserInfo, logout } = useAuthStore();
  const { name, email } = getUserInfo();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/');
  };

  const data = [
    {
      name: "Profile Info",
      icon: <MaterialIcons name="account-circle" size={28} color="grey" />,
      route:"/(tabs)/Profile/profileInfo",
    },
    {
      name: "Guidence Session ",
      icon: <MaterialIcons name="bookmarks" size={28} color="grey" />,
      route:"/(tabs)/Profile/guidenceStatus",
    },
    {
      name: "Milestones",
      icon: <FontAwesome name="trophy" size={28} color="grey" />,
      route:"/(tabs)/Profile/milestone",
    },
    {
      name: "Course Status",
      icon: <MaterialIcons name="school" size={28} color="grey" />,
      route:"/(tabs)/Profile/courseStatus",
    },
    {
      name: "Transaction History",
      icon: <MaterialIcons name="receipt" size={28} color="grey" />,
      route:"/(tabs)/Profile/transaction",
    },
    {
      name: "Certificates",
      icon: <FontAwesome name="certificate" size={28} color="grey" />,
      route:"/(tabs)/Profile/certificates",
    },
    {
      name: "Feedback",
      icon: <Entypo name="chat" size={28} color="grey" />,
      route:"/(tabs)/Profile/feedback",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white pt-10 px-4">
      <StatusBar style="dark" />

      {/* Header Section */}
      {/* <View className="flex-row justify-between items-center w-full">
        <Text className="text-3xl font-['PoppinsBold'] text-gray-800">Profile</Text>
        <MaterialIcons name="help-outline" size={30} color="#2563EB" />
      </View> */}

      <View className="flex-row items-center justify-between py-2 px-2 border-b border-gray-300">
        <Text className="text-2xl font-['PoppinsBold']">Profile</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="help-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View> 

      {/* Profile Info Section */}
      <View className="mt-2 bg-blue-700 h-32 w-full rounded-xl flex-row items-center px-4">
        <View className="w-20 h-20 bg-white rounded-full justify-center items-center">
          <Image
            source={require('@/assets/images/books.png')}
            className="w-12 h-12 rounded-full"
          />
        </View>
        <View className="ml-4">
          <Text className="text-2xl font-['PoppinsSemiBold'] text-white">{name}</Text>
          <Text className="text-sm text-white font-['PoppinsSemiBold']">{email}</Text>
        </View>
      </View>

      {/* Menu Items Section */}
      {data.map((item, index) => (
        <TouchableOpacity
          className="mt-3 h-14 w-full flex-row items-center px-4 border-b border-gray-300"
          key={index}
          onPress={()=>router.push(item.route)}
        >
          <View className="w-10 justify-center items-center">
            {item.icon}
          </View>
          <Text className="text-xl font-['PoppinsMed'] ml-4 flex-1">{item.name}</Text>
          <MaterialIcons name="navigate-next" size={24} color="grey" />
        </TouchableOpacity>
      ))}

      {/* Log Out Section */}
      <TouchableOpacity 
        className="mt-4 px-4 flex-row items-center" 
        onPress={handleLogout}
      >
        <MaterialIcons name="exit-to-app" size={26} color="red" />
        <Text className="text-xl text-red-600 font-['PoppinsBold'] ml-2">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
