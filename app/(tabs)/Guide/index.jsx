import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // For icons
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const GuideScreen = () => {
  // State for selected topic and time slot
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Dummy data for topics and time slots
  const topics = [
    { id: 1, title: 'Career Advice' },
    { id: 2, title: 'Roadmap Planning' },
    { id: 3, title: 'Resume Review' },
    { id: 4, title: 'Interview Preparation' },
  ];

  const timeSlots = [
    { id: 1, time: '10:00 AM - 11:00 AM' },
    { id: 2, time: '11:00 AM - 12:00 PM' },
    { id: 3, time: '1:00 PM - 2:00 PM' },
    { id: 4, time: '3:00 PM - 4:00 PM' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="px-3 pt-6 mt-5">
        {/* Header */}
        <Text className="text-3xl font-['PoppinsBold']">Book a Guidance Session</Text>
        <Text className="text-xl text-gray-600 mt-1 font-['PoppinsMed']">
          Get personalized advice and roadmaps for your career growth with Insustrial Specialists Get a hustle free Carrier <Text className="text-2xl">🚀</Text>.
        </Text>

        {/* Topic Selection */}
        <View className="mt-4">
          <Text className="text-2xl font-['PoppinsBold']">Select a Topic</Text>
          <View className="mt-3">
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                className={`p-4 mb-3 rounded-lg border ${
                  selectedTopic === topic.id
                    ? 'border-blue-600 bg-blue-100'
                    : 'border-gray-300 bg-gray-100'
                }`}
                onPress={() => setSelectedTopic(topic.id)}
              >
                <Text
                  className={`text-lg font-['PoppinsBold'] ${
                    selectedTopic === topic.id ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {topic.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Slot Selection */}
        <View className="mt-4">
          <Text className="text-2xl font-['PoppinsBold']">Select a Time Slot</Text>
          <View className="mt-3">
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                className={`p-4 mb-3 rounded-lg border ${
                  selectedTime === slot.id
                    ? 'border-blue-600 bg-blue-100'
                    : 'border-gray-300 bg-gray-100'
                }`}
                onPress={() => setSelectedTime(slot.id)}
              >
                <Text
                  className={`text-lg font-['PoppinsBold'] ${
                    selectedTime === slot.id ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mt-6">
          <Text className="text-2xl font-['PoppinsBold'] text-gray-900">Additional Notes</Text>
          <TextInput
            className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xl text-gray-900 font-['PoppinsMed']"
            placeholder="Any specific questions or concerns?"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          className="mt-8 mb-10 py-3 bg-blue-600 rounded-lg shadow-md font-['PoppinsBold']"
          onPress={() => {
            if (selectedTopic && selectedTime) {
              alert('Session booked successfully!');
            } else {
              alert('Please select a topic and time slot.');
            }
          }}
        >
          <Text className="text-2xl font-['PoppinsBold'] text-white text-center">Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideScreen;