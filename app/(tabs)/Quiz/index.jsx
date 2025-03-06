import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Quiz } from "../../../constants/quizData";
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useQuizStore from '../../../store/quizStore';

const Index = () => {
  const getQuizScore = useQuizStore((state) => state.getQuizScore);

  return (
    <View className="flex-1 bg-white mt-6 px-3">
      <StatusBar style="dark" />
      {/* Heading */}
      <Text className="text-3xl font-['PoppinsBold'] text-center mt-5">
        Technical Quizzes 📖
      </Text>
      <Text className="text-lg text-center mb-8 font-['PoppinsMed']">
        Test your knowledge 🧠 with these quizzes!
      </Text>

      {/* Quiz Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {Quiz.map((item) => {
          const quizScore = getQuizScore(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              className="bg-gray-100 rounded-xl p-5 mb-4 shadow-sm shadow-black flex-row justify-between"
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/Quiz/quizpre',
                  params: { quizData: JSON.stringify(item) },
                })
              }
            >
              <View>
                <Text className="text-2xl font-['PoppinsBold']">
                  {item.title}
                </Text>
                <Text className="text-md text-gray-900 font-['PoppinsMed'] mt-1">
                  {item.questions.length} questions
                </Text>
              </View>
              <Text className="text-md text-green-600 font-['PoppinsMed'] self-center">
                Score: {quizScore?.score ?? 0}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Index;