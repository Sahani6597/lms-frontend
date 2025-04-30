import { View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

const Header = () => {
    const router = useRouter();
    const { getUserInfo } = useAuthStore();
    const { name, email } = getUserInfo();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    return (
        <View className="pt-[24px] px-4 bg-blue-700 shadow-lg">
            {/* Top Section with Greeting and Notification Icon */}
            <View className="flex-row items-center justify-between">
                <View className="flex-col">
                    <Text className="pt-3 text-white font-['PoppinsSemiBold'] flex-wrap">
                        {greeting} 👋
                    </Text>
                    <Text className="text-2xl text-white font-['PoppinsBold']">
                        {name}
                    </Text>
                </View>
                <TouchableOpacity className="relative">
                    <Feather name="bell" size={30} color="white" />
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                        <Text className="text-white text-xs">2</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TouchableOpacity 
                onPress={() => router.push("/(tabs)/Search")}
                className="bg-blue-600/30 flex-row mt-2 mb-4 rounded-xl items-center px-4 py-3 active:opacity-80"
            >
                <Feather name="search" size={20} color="#E0E7FF" />
                <Text className="text-blue-100 font-['PoppinsMed'] text-lg ml-2 opacity-80">
                    What are you looking for?
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Header;