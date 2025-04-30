import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const BarItems = [
    { name: 'Course', color: '#4F46E5', route: '/(tabs)/Search' }, // Deep indigo
    { name: 'Guide', color: '#0EA5E9', route: '/(tabs)/Guide' },   // Sky blue
    { name: 'Quiz', color: '#EC4899', route: '/(tabs)/Quiz' },     // Pink
    { name: 'More', color: '#8B5CF6', route: '/(tabs)/Profile' },  // Purple
];

export default function Explore() {
    const router = useRouter();

    return (
        <View className="py-2">
            {/* Title */}
            <Text className="text-2xl px-4 font-[PoppinsSemiBold] text-gray-800">
                Explore
            </Text>

            {/* Scrollable Bar Items */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-3 pl-2"
                contentContainerStyle={{ paddingRight: 20 }} // Extra padding at the end
            >
                {BarItems.map((item, index) => (
                    <Pressable 
                        key={index} 
                        onPress={() => router.push(item.route)}
                        className="h-40 w-36 mx-2 justify-center items-center rounded-xl shadow-lg active:opacity-80"
                        style={{ backgroundColor: item.color }}
                    >
                        <Text className="text-3xl text-white font-['PoppinsBold']">{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
