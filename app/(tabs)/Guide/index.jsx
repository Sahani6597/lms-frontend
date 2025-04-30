import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import useGuideStore from '../../../store/guideStore';
import {useAuthStore} from '../../../store/authStore';

const GuideScreen = () => {
  const { bookSession, getInstructors, loading } = useGuideStore();
  const { token } = useAuthStore();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await getInstructors();
        setInstructors(data);
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
      }
    };
    fetchInstructors();
  }, []);

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

  const handleBookSession = async () => {
    if (!selectedTopic || !selectedTime || !selectedInstructor) {
      alert('Please select a topic, time slot, and instructor.');
      return;
    }

    const guideData = {
      topic: topics.find((t) => t.id === selectedTopic)?.title,
      timeSlot: timeSlots.find((t) => t.id === selectedTime)?.time,
      instructor: selectedInstructor,
      notes,
    };

    try {
      await bookSession(guideData,token);
      alert('Session booked successfully!');
    } catch (error) {
      alert('Failed to book session.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="px-3 pt-6 mt-5">
        <Text className="text-3xl font-['PoppinsBold']">Book a Guidance Session</Text>
        <Text className="text-md text-gray-600 mt-1 font-['PoppinsMed']">
          Get personalized advice and roadmaps for your career growth with Industrial Specialists. 🚀
        </Text>

        {/* Topic Selection */}
        <View className="mt-4">
          <Text className="text-xl font-['PoppinsBold']">Select a Topic</Text>
          <View className="mt-3">
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                className={`p-2 mb-3 rounded-lg border ${
                  selectedTopic === topic.id ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-gray-100'
                }`}
                onPress={() => setSelectedTopic(topic.id)}
              >
                <Text className={`text-md font-['PoppinsMed'] ${selectedTopic === topic.id ? 'text-blue-600' : 'text-gray-600'}`}>
                  {topic.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Instructor Selection */}
        <View className="mt-4">
          <Text className="text-xl font-['PoppinsBold']">Select an Instructor</Text>
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-300"
          >
            <Text className="text-md font-['PoppinsSemiBold'] text-gray-600">
              {selectedInstructor ? 
                instructors.find(i => i._id === selectedInstructor)?.name : 
                'Choose an instructor'}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-white rounded-t-3xl p-5">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-['PoppinsBold']">Select Instructor</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text className="text-xl font-['PoppinsBold'] text-blue-600">Close</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView className="max-h-[400px]">
                  {instructors.map((instructor) => (
                    <TouchableOpacity
                      key={instructor._id}
                      className={`p-4 mb-2 rounded-lg ${
                        selectedInstructor === instructor._id ? 'bg-blue-100' : 'bg-gray-50'
                      }`}
                      onPress={() => {
                        setSelectedInstructor(instructor._id);
                        setModalVisible(false);
                      }}
                    >
                      <Text className={`text-lg font-['PoppinsMed'] ${
                        selectedInstructor === instructor._id ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {instructor.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        {/* Time Slot Selection */}
        <View className="mt-4">
          <Text className="text-xl font-['PoppinsBold']">Select a Time Slot</Text>
          <View className="mt-3">
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                className={`p-2 mb-3 rounded-lg border ${
                  selectedTime === slot.id ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-gray-100'
                }`}
                onPress={() => setSelectedTime(slot.id)}
              >
                <Text className={`text-md font-['PoppinsMed'] ${selectedTime === slot.id ? 'text-blue-600' : 'text-gray-600'}`}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mt-6">
          <Text className="text-xl font-['PoppinsBold'] text-gray-900">Additional Notes</Text>
          <TextInput
            className="mt-3 py-4 px-2 bg-gray-50 rounded-lg border border-gray-200 text-md text-gray-900 font-['PoppinsMed']"
            placeholder="Any specific questions or concerns?"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          className={`mt-8 mb-10 py-3 rounded-lg shadow-md font-['PoppinsBold'] ${
            loading ? 'bg-gray-400' : 'bg-blue-600'
          }`}
          onPress={handleBookSession}
          disabled={loading}
        >
          <Text className="text-2xl font-['PoppinsBold'] text-white text-center">
            {loading ? 'Booking...' : 'Book Now'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideScreen;