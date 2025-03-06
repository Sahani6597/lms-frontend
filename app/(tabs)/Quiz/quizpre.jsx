import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import useQuizStore from '../../../store/quizStore';

const QuizScreen = () => {
  const { quizData } = useLocalSearchParams();
  const quiz = JSON.parse(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const router = useRouter();
  const setQuizScore = useQuizStore((state) => state.setQuizScore);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  // Handle selecting an answer
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Check if the selected answer is correct
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
      }
      setSelectedAnswer(""); // Reset selected answer
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    }
  };

  // Handle submitting the quiz
  const handleSubmitQuiz = () => {
    const finalScore = score + (selectedAnswer === currentQuestion.answer ? 1 : 0);
    setQuizScore(quiz.id, finalScore, quiz.questions.length);
    router.push({
      pathname: "/(tabs)/Quiz/result",
      params: {
        score: finalScore,
        totalQuestion: quiz.questions.length,
        quizId: quiz.id
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      
      {/* Quiz Title */}
      <View className="flex-row items-center py-3 border-b border-gray-300">
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">{quiz.title}</Text>
      </View>
      

      {/* Question Container */}
      <View className="flex-1 justify-center mt-10 px-4">
        {/* Current Question */}
        <Text className="text-2xl font-['PoppinsSemiBold'] mb-6 text-center"> <Text className=" font-['PoppinsSemiBold']">Q :  </Text>
           { currentQuestion.question}
        </Text>

        {/* Options List */}
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide scrollbar indicator
          contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
        >
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectAnswer(option)}
              className={`p-4 mb-3 rounded-lg border ${
                selectedAnswer === option ? "bg-green-100 border-green-600" : "bg-gray-100 border-gray-300"
              }`}
            >
              <Text className={`text-lg text-center font-['PoppinsMed'] ${
                selectedAnswer === option ? 'text-green-900' : 'text-gray-900'
              }`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next or Submit Button */}
      <View className="mt-8 px-5 mb-5">
        {currentQuestionIndex + 1 < quiz.questions.length ? (
          <TouchableOpacity
            onPress={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`p-4 rounded-lg ${selectedAnswer ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <Text className={`text-2xl font-['PoppinsBold'] text-center ${selectedAnswer ? "text-white" : "text-gray-700"}`}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmitQuiz}
            disabled={!selectedAnswer}
            className={`p-4 rounded-lg ${selectedAnswer ? "bg-blue-600" : "bg-gray-400"}`}
          >
            <Text className={`text-2xl font-['PoppinsBold'] text-center ${selectedAnswer ? "text-white" : "text-gray-700"}`}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;