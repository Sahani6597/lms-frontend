import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { API_BK } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore().token;
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCourses = async () => {
    if (!token) {
      Alert.alert('Error', 'No authentication token found');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BK}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.log('Fetch error:', error);
      Alert.alert('Error', `Failed to fetch courses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to delete this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!token) {
                Alert.alert('Error', 'No authentication token found');
                return;
              }

              await axios.delete(`${API_BK}/courses/${courseId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
              Alert.alert('Success', 'Course deleted successfully');
            } catch (error) {
              console.log('Delete error:', error);
              Alert.alert('Error', `Failed to delete course: ${error.message}`);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCourse = ({ item }) => (
    <View className="flex-row justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-md">
      <View className="flex-1">
        <Text className="text-lg font-['PoppinsSemiBold']">{item.title}</Text>
        <Text className="text-sm font-['PoppinsMed'] text-gray-600">Instructor: {item.instructor.name}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 px-3 py-2 rounded-md"
        onPress={() => handleDelete(item._id)}
      >
        <Text className="text-white font-['PoppinsBold']">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-['PoppinsBold'] mb-4">All Courses</Text>
      <View className="bg-gray-200 flex-row items-center mb-4 rounded-xl justify-center h-14 pl-3">
        <Feather 
          name="search" 
          size={20} 
          color="gray" 
          style={{ paddingHorizontal: 2, paddingVertical: 10 }} 
        />
        <TextInput
          className="flex-1 font-['PoppinsMed'] text-lg h-full"
          placeholder="Search courses"
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="blue"
          style={{
            textAlignVertical: 'center',
            paddingVertical: 0,
          }}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item._id}
          className="flex-1"
        />
      )}
    </SafeAreaView>
  );
}
