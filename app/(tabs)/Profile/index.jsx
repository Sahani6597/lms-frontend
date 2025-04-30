import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
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

      <View className="flex-row items-center justify-between py-2 px-2 border-b border-gray-300">
        <Text className="text-2xl font-['PoppinsBold']">Profile</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="help-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Info Section */}
        <View className="mt-4 items-center">
          {/* Profile Image Container (Larger) */}
          <View className="w-32 h-32 bg-transparent rounded-full justify-center items-center border-4 border-black">
            <Image
              source={require('@/assets/images/profile1.jpg')}
              className="w-28 h-28 rounded-full"
            />
          </View>

          {/* User Info */}
          <View className="mt-4 items-center">
            <Text className="text-2xl font-['PoppinsSemiBold'] text-gray-900">{name || 'User'}</Text>
            <Text className="text-sm text-gray-500 font-['PoppinsSemiBold'] mt-1">{email || 'No email'}</Text>
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
            <Text className="text-lg font-['PoppinsMed'] ml-4 flex-1">{item.name}</Text>
            <MaterialIcons name="navigate-next" size={24} color="grey" />
          </TouchableOpacity>
        ))}

        {/* Log Out Section */}
        <View className="py-4">
          <TouchableOpacity 
            className="px-6 py-3 flex-row items-center justify-center bg-red-50 rounded-xl mx-4" 
            onPress={handleLogout}
          >
            <MaterialIcons name="exit-to-app" size={26} color="#EF4444" />
            <Text className="text-xl text-red-500 font-['PoppinsBold'] ml-2">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
