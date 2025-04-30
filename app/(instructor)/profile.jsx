import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const Profile = () => {
  const router = useRouter();
  const { getUserInfo, logout } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userData, setUserData] = React.useState({ name: '', email: '' });

  React.useEffect(() => {
    try {
      const user = getUserInfo();
      setUserData(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.replace('/(auth)/');
    } catch (err) {
      setError('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-red-500 font-['PoppinsSemiBold']">{error}</Text>
        <TouchableOpacity 
          className="mt-4 px-6 py-2 bg-blue-500 rounded-lg"
          onPress={() => router.replace('/(auth)/')}
        >
          <Text className="text-white font-['PoppinsSemiBold']">Back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-10 px-4">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center justify-between py-2 px-2 border-b border-gray-300">
        <Text className="text-2xl font-['PoppinsBold']">Profile</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="help-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Centered Profile Section */}
      <View className="flex-1 justify-center items-center">
        {/* Profile Image */}
        <View className="w-36 h-36 rounded-full justify-center items-center border-4 border-black">
          <Image
            source={require('@/assets/images/books.png')}
            className="w-32 h-32 rounded-full"
          />
        </View>

        {/* User Info */}
        <View className="mt-4 items-center">
          <Text className="text-2xl font-['PoppinsSemiBold'] text-gray-900">{userData.name || 'User'}</Text>
          <Text className="text-sm text-gray-500 font-['PoppinsSemiBold'] mt-1">{userData.email || 'No email'}</Text>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity 
          className="px-6 py-3 mt-5 flex-row items-center justify-center bg-red-50 rounded-xl mx-4" 
          onPress={handleLogout}
        >
          <MaterialIcons name="exit-to-app" size={26} color="#EF4444" />
          <Text className="text-xl text-red-500 font-['PoppinsBold'] ml-2">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
