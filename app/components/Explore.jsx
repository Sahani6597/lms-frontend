import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const BarItems = [
    { name: 'Course', color: '#00A9FF', route: '/(tabs)/Explore/Course' },
    { name: 'Guide', color: '#3AA6B9', route: '/(tabs)/Guide' },
    { name: 'Quiz', color: '#FF76CE', route: '/(tabs)/Guide' },
    { name: 'Books', color: '#7C00FE', route: '/(tabs)/Guide' },
    { name: 'More', color: '#5C2FC2', route: '/(tabs)/Guide' },
];

export default function Explore() {
    const router = useRouter();

    return (
        <View className="py-4">
            {/* Title */}
            <Text className="text-2xl px-4 font-[PoppinsBold] text-gray-800">
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
                        className="h-44 w-36 mx-2 justify-center items-center rounded-2xl shadow-lg active:opacity-80"
                        style={{ backgroundColor: item.color }}
                    >
                        <Text className="text-3xl text-white font-['PoppinsBold']">{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
