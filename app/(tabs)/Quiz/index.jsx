import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import React from 'react';
import { Quiz } from "../../../constants/quizData";
import { router } from 'expo-router';

const Index = () => {

  return (
    <View className="flex-1 bg-white mt-6 px-3">
      {/* Heading */}
      <Text className="text-3xl font-['PoppinsBold'] text-center mt-5">
        Technical Quizzes 📖
      </Text>
      <Text className="text-lg text-center mb-8 font-['PoppinsMed']">
        Test your knowledge 🧠 with these quizzes!
      </Text>

      {/* Quiz Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {Quiz.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-gray-100 rounded-xl p-5 mb-4 shadow-sm shadow-black"
            onPress={() =>
              router.push({
                pathname: '/(tabs)/Quiz/quizpre',
                params: { quizData: JSON.stringify(item) }, // Passing only the current quiz data
              })
            }
          >
            <Text className="text-2xl font-['PoppinsBold']">
              {item.title}
            </Text>
            <Text className="text-md text-gray-900 font-['PoppinsSemiBold'] mt-1">
              {item.questions.length} questions
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Index;