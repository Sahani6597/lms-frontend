import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview'; // Import WebView for YouTube videos
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { StatusBar } from 'expo-status-bar';
import { enrollInCourse, checkEnrollmentStatus, unenrollFromCourse } from '../../utils/enrollmentService';

const CourseDetail = () => {
  const { course } = useLocalSearchParams();
  const { token } = useAuthStore();
  const parsedCourse = JSON.parse(course);
  
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    checkEnrollmentStatusHandler();
  }, []);

  const checkEnrollmentStatusHandler = async () => {
    try {
      const response = await checkEnrollmentStatus(parsedCourse._id, token);
      setIsEnrolled(response.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  const handleEnrollment = async () => {
    try {
      setIsEnrolling(true);
      await enrollInCourse(parsedCourse._id, token);
      setIsEnrolled(true);
      Alert.alert('Success', 'Successfully enrolled in the course!', [
        { text: 'OK' }
      ]);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to enroll in the course';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    try {
      setIsEnrolling(true);
      await unenrollFromCourse(parsedCourse._id, token);
      setIsEnrolled(false);
      Alert.alert('Success', 'Successfully unenrolled from the course!');
    } catch (error) {
      Alert.alert('Error', 'Failed to unenroll from the course');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handlePayment = async () => {
    try {
      // Add your payment processing logic here
      setShowPaymentModal(false);
      // After successful payment, proceed with enrollment
      await handleEnrollment();
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  };

  const initiateEnrollment = () => {
    setShowPaymentModal(true);
  };

  const isYouTubeVideo = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="dark" />
      <ScrollView className="pt-8" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center py-3 mb-3 border-b border-gray-300">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={30} color="blue" />
          </TouchableOpacity>
          <Text className="text-2xl font-['PoppinsBold'] ml-4">Course Detail</Text>
        </View>

        {/* Course Media Section */}
        <View className="w-full px-2">
          <View className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
            {selectedVideo ? (
              isYouTubeVideo(selectedVideo) ? (
                <WebView
                  source={{ uri: getYouTubeEmbedUrl(selectedVideo) }}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Video
                  source={{ uri: selectedVideo }}
                  useNativeControls
                  resizeMode="contain"
                  shouldPlay
                  className="w-full h-full"
                />
              )
            ) : (
              <Image
                source={{ uri: parsedCourse.image }}
                className="w-full h-full object-cover"
              />
            )}
          </View>
        </View>

        {/* Course Title and Price */}
        <View className="mt-2 px-4">
          <Text className="text-2xl font-['PoppinsBold']">{parsedCourse.title}</Text>
          <View className="flex-row justify-between">
            <Text className="text-xl font-['PoppinsBold'] text-blue-600 mt-2">{parsedCourse.price===0 ? "Free":"$"+parsedCourse.price}</Text>
            <View className="flex-row items-center gap-2 pr-2">
              <Text className="text-yellow-500 text-xl font-['PoppinsBold']">⭐</Text>
              <Text className="text-xl font-['PoppinsBold']">{parsedCourse.rating}</Text>
            </View>
          </View>
        </View>

        {/* Course Description */}
        <View className="mt-3 px-4">
          <Text className="text-xl font-['PoppinsBold']">Course Description</Text>
          <Text className="text-lg text-gray-900 mt-2 leading-7 font-['PoppinsMed']">{parsedCourse.description}</Text>
        </View>
           <View className="mt-3 px-4">
          <Text className="text-xl font-['PoppinsBold']">What You'll Learn</Text>
          <View>
            {parsedCourse.learningOutcomes.map((outcome, index) => (
              <View key={index} className="flex-row items-start mt-2">
                <Text>👉</Text>
                <Text className="text-lg text-gray-900 ml-2 flex-1 font-['PoppinsMed']">{outcome}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Course Modules */}
        <View className="mt-3 px-4">
          <Text className="text-xl font-['PoppinsBold']">Course Content</Text>
          {parsedCourse.modules.map((module, index) => (
            <TouchableOpacity
              key={index}
              className="mt-3 p-4 bg-gray-200 rounded-lg"
              onPress={() => isEnrolled && setSelectedVideo(module.videoUrl)}
              disabled={!isEnrolled}
            >
              <Text className="text-lg font-['PoppinsSemiBold']">{module.title}</Text>
              <Text className="text-sm text-gray-900 mt-1 font-['PoppinsBold']">{module.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPaymentModal}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View className="absolute inset-0 flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-xl w-[90%] m-4 shadow-xl">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-['PoppinsBold']">
                  {parsedCourse.price === 0 ? 'Demo Payment' : 'Payment Details'}
                </Text>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              
              <View className="border-b border-gray-200 pb-4 mb-4">
                <Text className="text-lg font-['PoppinsMed'] mb-2">Course: {parsedCourse.title}</Text>
                <Text className="text-xl font-['PoppinsBold'] text-blue-600">
                  {parsedCourse.price === 0 ? 'Demo Payment - Free' : `Amount: $${parsedCourse.price}`}
                </Text>
                {parsedCourse.price === 0 && (
                  <Text className="text-sm text-gray-600 mt-2">
                    This is a demo payment for a free course. Click "Proceed" to enroll.
                  </Text>
                )}
              </View>
              
              <TouchableOpacity 
                className="bg-blue-700 py-4 rounded-md mb-3"
                onPress={handlePayment}
              >
                <Text className="text-white text-xl text-center font-['PoppinsBold']">
                  {parsedCourse.price === 0 ? 'Proceed' : 'Pay Now'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="bg-gray-500 py-4 rounded-md"
                onPress={() => setShowPaymentModal(false)}
              >
                <Text className="text-white text-xl text-center font-['PoppinsBold']">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Enrollment Button */}
        <TouchableOpacity 
          className={`sticky bottom-0 mx-3 py-3 ${
            isEnrolling ? 'bg-blue-500' : 
            isEnrolled ? 'bg-red-600' : 'bg-blue-700'
          } mt-4 mb-10 rounded-md`}
          onPress={isEnrolled ? handleUnenroll : initiateEnrollment}
          disabled={isEnrolling}
        >
          <Text className="text-2xl font-['PoppinsBold'] text-center text-white">
            {isEnrolling ? 'Processing...' : isEnrolled ? 'Unenroll' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetail;
