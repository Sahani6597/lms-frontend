import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const QuizScreen = () => {
  const { quizData } = useLocalSearchParams();
  const quiz = JSON.parse(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const router = useRouter();

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
    if (selectedAnswer) {
      // Final answer check for the last question
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
      }
    }
    // Navigate to the result screen with the score
    router.push({
      pathname: "/(tabs)/Quiz/result",
      params: {
        score: score + (selectedAnswer === currentQuestion.answer ? 1 : 0), // Ensure score is updated on submit
        totalQuestion: quiz.questions.length,
      },
    });
  };

  return (
    <View className="flex-1 bg-white p-5 justify-center">
      {/* Quiz Title */}
      <Text className="text-3xl font-['PoppinsBold'] text-center my-8">{quiz.title}</Text>

      {/* Question Container */}
      <View className="flex-1 justify-center">
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
                selectedAnswer === option ? "bg-blue-100 border-blue-600" : "bg-gray-100 border-gray-300"
              }`}
            >
              <Text className={`text-xl text-center font-['PoppinsMed'] ${
                selectedAnswer === option ? 'text-blue-900' : 'text-gray-900'
              }`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next or Submit Button */}
      <View className="mt-8">
        {currentQuestionIndex + 1 < quiz.questions.length ? (
          <TouchableOpacity
            onPress={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`p-4 rounded-lg ${selectedAnswer ? "bg-blue-600" : "bg-gray-400"}`}
          >
            <Text className={`text-3xl font-['PoppinsBold'] text-center ${selectedAnswer ? "text-white" : "text-gray-700"}`}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmitQuiz}
            disabled={!selectedAnswer}
            className={`p-4 rounded-lg ${selectedAnswer ? "bg-blue-600" : "bg-gray-400"}`}
          >
            <Text className={`text-3xl font-['PoppinsBold'] text-center ${selectedAnswer ? "text-white" : "text-gray-700"}`}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuizScreen;