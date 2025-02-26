import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!feedback || rating === 0) {
      Alert.alert("Error", "Please provide feedback and select a rating.");
      return;
    }
    Alert.alert("Success", "Thank you for your feedback!");
    setFeedback("");
    setRating(0);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-2">
      <View className="flex-row items-center py-3 border-b border-gray-300">
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Feedback</Text>
      </View>

      <View className="px-1 ">
      <Text className="text-3xl font-['PoppinsSemiBold']  mt-4">We Value Your Feedback! 
      </Text>
      <Text className="text-xl font-['Poppins'] text-gray-900 pt-2">Your thoughts and suggestions help us improve your experience. Let us know what you love and what we can do better!</Text>
      {/* Star Rating */}
      <View className="flex-row justify-center my-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={40}
              color={star <= rating ? "gold" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Input */}
      <TextInput
        className="w-full h-32 bg-gray-200 rounded-lg py-2 px-3 text-xl font-['Poppins'] placeholder:text-gray-600"
        placeholder="Write your feedback..."
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="mt-6 bg-blue-600 rounded-lg py-3 items-center"
        onPress={handleSubmit}
      >
        <Text className="text-white text-2xl font-['PoppinsBold']">Submit Feedback</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
