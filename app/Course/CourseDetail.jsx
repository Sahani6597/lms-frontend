import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; // For rating stars
import { StatusBar } from 'expo-status-bar';

const CourseDetail = () => {
  const { course } = useLocalSearchParams();
  const parsedCourse = JSON.parse(course);

  return (
    <SafeAreaView className='flex-1 bg-white' >
      <StatusBar style="dark" />
      <ScrollView className="pt-8"  showsVerticalScrollIndicator={false} >
        {/* Course Image Section */}
        <View className="w-full px-2">
          <View className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              source={parsedCourse.image}
              className="w-full h-full object-cover"
            />
          </View>
        </View>

        {/* Course Title and Price */}
        <View className="mt-2 px-4">
          <Text className="text-3xl  font-['PoppinsBold']">{parsedCourse.title}</Text>
          <View className="flex-row justify-between ">
            <Text className="text-2xl font-['PoppinsBold'] text-blue-600 mt-2">${parsedCourse.price}</Text>
            <View className="flex-row items-center gap-2 pr-2">
              <Text className="text-yellow-500 text-xl font-['PoppinsBold']">⭐</Text>
              <Text className="text-2xl font-['PoppinsBold']">
                {parsedCourse.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* Course Description */}
        <View className="mt-3 px-4">
          <Text className="text-2xl font-['PoppinsBold']">Course Description</Text>
          <Text className="text-lg text-gray-900 mt-2 leading-7 font-['Poppins']">{parsedCourse.description}</Text>
        </View>

        {/* Learning Outcomes */}
        <View className="mt-3 px-4">
          <Text className="text-2xl font-['PoppinsBold']">What You'll Learn</Text>
          <View className="">
            {parsedCourse.learningOutcomes.map((outcome, index) => (
              <View key={index} className="flex-row items-start mt-2">
                <Text>👉</Text>
                <Text className="text-lg text-gray-900 ml-2 flex-1 font-['Poppins']">{outcome}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Course Modules */}
        <View className="mt-3 px-4">
          <Text className="text-2xl font-['PoppinsBold']">Course Content</Text>
          {parsedCourse.modules.map((module, index) => (
            <View key={index} className="mt-3 p-4 bg-gray-200 rounded-lg">
              <Text className="text-xl font-['PoppinsSemiBold']">{module.title}</Text>
              <Text className="text-md text-gray-900 mt-1 font-['PoppinsBold']">{module.duration}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity className="sticky bottom-0 mx-3 py-3 bg-blue-700 mt-4 mb-10 rounded-md">
          <Text
            className="text-3xl font-['PoppinsBold'] text-center text-white "
            style={{ textAlignVertical: 'center' }}
          >
            Enroll Now 
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CourseDetail;