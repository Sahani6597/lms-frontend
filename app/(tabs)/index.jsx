import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import Explore from '../components/Explore';
import Coursecard from '../components/Coursecard';
import { router } from 'expo-router';

const Home = () => {
  const course = {
    title: 'Introduction to Python Programming',
    instructor: 'John Doe',
    rating: 4.5,
    reviews: 1200,
    price: 99.99,
    image: require('../../assets/images/AI.jpg'),
    description: 'Learn Python from scratch and build real-world projects.',
    learningOutcomes: [
      'Understand Python basics',
      'Build a web scraper',
      'Work with data structures',
    ],
    modules: [
      { title: 'Week 1: Python Basics', duration: '2 hours' },
      { title: 'Week 2: Data Structures', duration: '3 hours' },
    ],
    instructorImage: 'https://example.com/course-image.jpg',
    instructorBio: 'John is a senior software engineer with 10+ years of experience.',
    reviews: [
      { author: 'Alice', text: 'Great course! Highly recommended.' },
      { author: 'Bob', text: 'Very informative and well-structured.' },
    ],
  };

  return (
    <View className='bg-white flex-1'>
      <StatusBar style="light" backgroundColor="" />
      <ScrollView className='mb-2' showsVerticalScrollIndicator={false}>
        <Header />
        <Explore />
        {/* Course Section */}
        <Text className="text-3xl px-3 pt-2 font-['PoppinsBold']">
          Trending
        </Text>
        <Pressable onPress={()=>(router.push({pathname:`/Course/CourseDetail`,params: { course: JSON.stringify(course)},}))}>
        <Coursecard
        title={course.title}
        imageSource={course.image}
        price={course.price}
        rating={course.rating}
        />
          <Coursecard
        title={course.title}
        imageSource={course.image}
        price={course.price}
        rating={course.rating}
        />
          <Coursecard
        title={course.title}
        imageSource={course.image}
        price={course.price}
        rating={course.rating}
        />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Home;
