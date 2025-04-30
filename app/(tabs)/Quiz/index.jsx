import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Quiz } from "../../../constants/quizData";
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {useAuthStore} from '../../../store/authStore';
import { API_BK } from '../../../config';

const Index = () => {
  const [quizScores, setQuizScores] = useState({});
  const token =useAuthStore().token;
  const fetchQuizScores = async () => {
    try {
      const response = await axios.get(`${API_BK}/quiz-scores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const scores = response.data.reduce((acc, score) => {
        acc[score.quizId] = score;
        return acc;
      }, {});
      setQuizScores(scores);
    } catch (error) {
      console.error('Error fetching quiz scores:', error);
    }
  };

  useEffect(() => {
    fetchQuizScores();
  }, []);

  const getQuizScore = (quizId) => {
    return quizScores[quizId] || { score: 0 };
  };

  return (
    <View className="flex-1 bg-white mt-6 px-3">
      <StatusBar style="dark" />
      {/* Heading */}
      <Text className="text-2xl font-['PoppinsBold'] text-center mt-5">
        Technical Quizzes 📖
      </Text>
      <Text className="text-md text-center mb-8 font-['PoppinsMed']">
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
                <Text className="text-xl font-['PoppinsBold']">
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