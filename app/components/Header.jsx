import { View, Text, Pressable, TextInput } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
    const { getUserInfo } = useAuthStore();
    const { name, email } = getUserInfo();
    
    return (
      <View className="pt-[24px] px-4 bg-blue-700">
      {/* Top Section with Greeting and Notification Icon */}
      <View className="flex-row items-center justify-between">
          <View className="flex-col">
              <Text className="pt-3 text-lg text-white font-['Poppins'] flex-wrap">
                  Hello, 👋
              </Text>
              <Text className="text-2xl text-white font-['PoppinsSemiBold']">
                  {name}
              </Text>
          </View>
          <View>
              <Feather name="bell" size={30} color="white" />
          </View>
      </View>

      {/* Search Bar */}
      <View className="bg-blue-600 flex-row mt-2 mb-4 rounded-xl items-center px-4 py-1">
          <Feather name="search" size={20} color="white" />
          <TextInput 
              placeholder="What are you looking for?" 
              placeholderTextColor="white" 
              className="text-white flex-1 font-['PoppinsMed'] text-lg ml-2"
              selectionColor="white"
              style={{textAlignVertical:'center'}}
          />
      </View>
  </View>
    )
}

export default Header;