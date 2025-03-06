import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Header from '../components/Header';
import Explore from '../components/Explore';
import Coursecard from '../components/Coursecard';
import useCourseStore from '../../store/courseStore';

const Home = () => {
  const { courses, loadCourses, loading } = useCourseStore();

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <View className='bg-white flex-1'>
      <StatusBar style="light" backgroundColor="" />
      <ScrollView className='mb-2' showsVerticalScrollIndicator={false}>
        <Header />
        <Explore />
        
        {/* Course Section */}
        <Text className="text-2xl px-3 pt-2 font-['PoppinsBold'] text-gray-800">
          Trending
        </Text>

        {/* Loading State */}
        {loading ? (
          <View className="p-4">
            <Text className="text-gray-500 text-center">Loading courses...</Text>
          </View>
        ) : (
          /* Courses List */
          <View className="">
            {courses?.map((course) => (
              <Pressable
                key={course._id}
                onPress={() =>
                  router.push({
                    pathname: `/Course/CourseDetail`,
                    params: { course: JSON.stringify(course) },
                  })
                }
              >
                <Coursecard
                  title={course.title}
                  imageSource={course.image}
                  price={course.price}
                  rating={course.rating}
                />
              </Pressable>
            ))}

            {/* No Courses Found */}
            {courses?.length === 0 && (
              <Text className="text-gray-500 text-center py-4">
                No courses available
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
