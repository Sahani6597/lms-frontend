import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, View, SafeAreaView, Text, Pressable } from 'react-native';
import useCourseStore from '../../../store/courseStore';
import Coursecard from '../../components/Coursecard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { courses, loadCourses } = useCourseStore();

  useEffect(() => {
    loadCourses(searchQuery);
  }, [searchQuery]);

  const renderItem = ({ item }) => (
     <Pressable

                    onPress={() =>
                      router.push({
                        pathname: `/Course/CourseDetail`,
                        params: { course: JSON.stringify(item) },
                      })
                    }
                  >
    <Coursecard
      title={item.title}
      imageSource={item.image}
      price={item.price}
      rating={item.rating}
    />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-[36px] px-2">
      <StatusBar style="dark" />
      <View className='bg-blue-700 flex-row mt-2 mb-4 rounded-xl justify-center items-center h-16'>
        <Feather 
          name="search" 
          size={24} 
          color="white" 
          style={{ paddingHorizontal: 3, paddingVertical: 12 }} 
        />
        <TextInput 
          className="text-white mt-1 w-10/12 font-['PoppinsMed'] text-xl h-full"
          placeholder="What are you looking for?"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="white"
          style={{
            textAlignVertical: 'center',
            paddingVertical: 0,
          }} 
        />
      </View>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20,marginHorizontal:-6 }}
      />
    </SafeAreaView>
  );
}
