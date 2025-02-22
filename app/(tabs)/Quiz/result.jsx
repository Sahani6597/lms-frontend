import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const ResultScreen = () => {
  const { score, totalQuestion,quizid } = useLocalSearchParams();
  const router = useRouter();
  // Calculate percentage
  const percentage = ((score / totalQuestion) * 100).toFixed(2);

  // Handle retaking the quiz
  const handleRetakeQuiz = () => {
    // Navigate back to the quiz screen (or index)
    router.push("/(tabs)/Quiz");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      {/* Quiz Completed Title */}
      <Text className="text-4xl font-['PoppinsBold'] mb-4">Quiz Completed</Text>

      {/* Display the score and total questions */}
      <Text className="text-2xl font-['PoppinsSemiBold'] mb-2">
        Your Have Scored
      </Text>
      <Text
        className={`text-xl font-['PoppinsBold'] mb-2 ${
          percentage < 50 ? "text-red-600" : "text-blue-600"
        }`}
      >
        {score} / {totalQuestion}
      </Text>

      {/* Show percentage */}
      <Text className="text-xl mb-8 font-['PoppinsSemiBold']">
        {percentage}% Correct
      </Text>

      {/* Retake Quiz Button */}
      <TouchableOpacity
        onPress={handleRetakeQuiz}
        className="bg-blue-600 px-8 py-3 rounded-lg shadow-md"
      >
        <Text className="text-white text-xl font-['PoppinsSemiBold']">
          Retake Quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;