import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput, ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { API_BK } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    learningOutcomes: [''],
    modules: [{ title: '', duration: '', videoUrl: '' }],
    instructorImage: '',
    instructorBio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useAuthStore().token;
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCourses = async () => {
    if (!token) {
      Alert.alert('Error', 'No authentication token found');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BK}/instructor/courses`, {
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

  const handleAddCourse = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BK}/courses`, newCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses([...courses, response.data]);
      setModalVisible(false);
      setNewCourse({
        title: '',
        price: '',
        description: '',
        image: '',
        learningOutcomes: [''],
        modules: [{ title: '', duration: '', videoUrl: '' }],
        instructorImage: '',
        instructorBio: '',
      });
      Alert.alert('Success', 'Course created successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to create course: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addModule = () => {
    setNewCourse({
      ...newCourse,
      modules: [...newCourse.modules, { title: '', duration: '', videoUrl: '' }],
    });
  };

  const addLearningOutcome = () => {
    setNewCourse({
      ...newCourse,
      learningOutcomes: [...newCourse.learningOutcomes, ''],
    });
  };

  const removeLearningOutcome = (index) => {
    const newOutcomes = newCourse.learningOutcomes.filter((_, i) => i !== index);
    setNewCourse({...newCourse, learningOutcomes: newOutcomes});
  };

  const removeModule = (index) => {
    const newModules = newCourse.modules.filter((_, i) => i !== index);
    setNewCourse({...newCourse, modules: newModules});
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCourse = ({ item }) => (
    <View className="flex-row justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-md mx-3 mb-1">
      <Text className="text-lg font-['PoppinsSemiBold'] flex-1">{item.title}</Text>
      <TouchableOpacity
        className="bg-red-500 px-3 py-2 rounded-md"
        onPress={() => handleDelete(item._id)}
      >
        <Text className="text-white font-['PoppinsBold']">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 p4 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-2xl font-['PoppinsBold']">My Courses</Text>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-md"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-['PoppinsBold']">Add Course</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-200 flex-row items-center mb-6 mt-2 mx-4 rounded-xl justify-center h-14 pl-3">
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

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-[#F8FAFC]">
          <StatusBar barStyle="dark-content" />
          <View className="flex-1">
            {/* Header */}
            <View className="border-b border-gray-200 bg-white shadow-sm">
              <View className="px-4 py-3 flex-row justify-between items-center">
                <View>
                  <Text className="text-xl font-['PoppinsBold'] text-gray-900">Create New Course</Text>
                  <Text className="text-xs font-['PoppinsMed'] text-gray-500">Fill in the details below</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  className="bg-gray-100 h-8 w-8 rounded-full items-center justify-center"
                >
                  <Text className="text-gray-600 text-base">✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="flex-1">
              <View className="p-3 space-y-3">
                {/* Basic Information Card */}
                <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <View className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <Text className="text-lg font-['PoppinsBold'] text-gray-800">Course Details</Text>
                    <Text className="text-sm font-['PoppinsMed'] text-gray-600">Basic information about your course</Text>
                  </View>
                  <View className="p-4 space-y-3">
                    <View>
                      <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Course Title</Text>
                      <TextInput
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base"
                        placeholder="Enter an engaging title"
                        value={newCourse.title}
                        onChangeText={(text) => setNewCourse({...newCourse, title: text})}
                      />
                    </View>

                    <View className="flex-row space-x-3">
                      <View className="flex-1">
                        <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Price ($)</Text>
                        <TextInput
                          className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base"
                          placeholder="Set your price"
                          value={newCourse.price}
                          onChangeText={(text) => setNewCourse({...newCourse, price: text})}
                          keyboardType="numeric"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Course Image</Text>
                        <TextInput
                          className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base"
                          placeholder="Image URL"
                          value={newCourse.image}
                          onChangeText={(text) => setNewCourse({...newCourse, image: text})}
                        />
                      </View>
                    </View>

                    <View>
                      <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Description</Text>
                      <TextInput
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base min-h-[80]"
                        placeholder="Write an engaging description of your course"
                        value={newCourse.description}
                        onChangeText={(text) => setNewCourse({...newCourse, description: text})}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>
                </View>

                {/* Learning Outcomes Card */}
                <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <View className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex-row justify-between items-center">
                    <View>
                      <Text className="text-lg font-['PoppinsBold'] text-gray-800">Learning Outcomes</Text>
                      <Text className="text-sm font-['PoppinsMed'] text-gray-600">What students will learn</Text>
                    </View>
                    <TouchableOpacity
                      className="bg-blue-600 px-3 py-2 rounded-lg shadow-sm"
                      onPress={addLearningOutcome}
                    >
                      <Text className="text-white font-['PoppinsSemiBold'] text-sm">Add Outcome</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="p-4 space-y-3">
                    {newCourse.learningOutcomes.map((outcome, index) => (
                      <View key={index} className="flex-row items-center space-x-2">
                        <View className="w-7 h-7 rounded-full bg-gray-200 items-center justify-center">
                          <Text className="text-gray-700 font-['PoppinsSemiBold'] text-sm">{index + 1}</Text>
                        </View>
                        <TextInput
                          className="flex-1 border border-gray-200 p-3 rounded-lg bg-gray-50 text-base"
                          placeholder="What will students learn?"
                          value={outcome}
                          onChangeText={(text) => {
                            const newOutcomes = [...newCourse.learningOutcomes];
                            newOutcomes[index] = text;
                            setNewCourse({...newCourse, learningOutcomes: newOutcomes});
                          }}
                        />
                        <TouchableOpacity
                          className="bg-red-100 w-7 h-7 rounded-full items-center justify-center"
                          onPress={() => removeLearningOutcome(index)}
                        >
                          <Text className="text-red-500 text-base">×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Modules Card */}
                <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <View className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex-row justify-between items-center">
                    <View>
                      <Text className="text-lg font-['PoppinsBold'] text-gray-800">Course Content</Text>
                      <Text className="text-sm font-['PoppinsMed'] text-gray-600">Organize your course modules</Text>
                    </View>
                    <TouchableOpacity
                      className="bg-blue-600 px-3 py-2 rounded-lg shadow-sm"
                      onPress={addModule}
                    >
                      <Text className="text-white font-['PoppinsSemiBold'] text-sm">Add Module</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="p-4 space-y-3">
                    {newCourse.modules.map((module, index) => (
                      <View key={index} className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <View className="bg-gray-100 px-3 py-2.5 flex-row justify-between items-center border-b border-gray-200">
                          <View className="flex-row items-center space-x-2">
                            <View className="w-7 h-7 rounded-full bg-gray-200 items-center justify-center">
                              <Text className="text-gray-700 font-['PoppinsSemiBold'] text-sm">{index + 1}</Text>
                            </View>
                            <Text className="font-['PoppinsSemiBold'] text-gray-700 text-base">Module {index + 1}</Text>
                          </View>
                          <TouchableOpacity
                            className="bg-red-100 w-7 h-7 rounded-full items-center justify-center"
                            onPress={() => removeModule(index)}
                          >
                            <Text className="text-red-500 text-base">×</Text>
                          </TouchableOpacity>
                        </View>
                        <View className="p-3 space-y-2">
                          <TextInput
                            className="border border-gray-200 p-3 rounded-lg bg-white text-base"
                            placeholder="Module Title"
                            value={module.title}
                            onChangeText={(text) => {
                              const newModules = [...newCourse.modules];
                              newModules[index].title = text;
                              setNewCourse({...newCourse, modules: newModules});
                            }}
                          />
                          <View className="flex-row space-x-2">
                            <View className="flex-1">
                              <TextInput
                                className="border border-gray-200 p-3 rounded-lg bg-white text-base"
                                placeholder="Duration"
                                value={module.duration}
                                onChangeText={(text) => {
                                  const newModules = [...newCourse.modules];
                                  newModules[index].duration = text;
                                  setNewCourse({...newCourse, modules: newModules});
                                }}
                              />
                            </View>
                            <View className="flex-1">
                              <TextInput
                                className="border border-gray-200 p-3 rounded-lg bg-white text-base"
                                placeholder="Video URL"
                                value={module.videoUrl}
                                onChangeText={(text) => {
                                  const newModules = [...newCourse.modules];
                                  newModules[index].videoUrl = text;
                                  setNewCourse({...newCourse, modules: newModules});
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Instructor Information Card */}
                <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-3">
                  <View className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <Text className="text-lg font-['PoppinsBold'] text-gray-800">Instructor Profile</Text>
                    <Text className="text-sm font-['PoppinsMed'] text-gray-600">Your information as the course instructor</Text>
                  </View>
                  <View className="p-4 space-y-3">
                    <View>
                      <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Profile Image</Text>
                      <TextInput
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base"
                        placeholder="Your profile image URL"
                        value={newCourse.instructorImage}
                        onChangeText={(text) => setNewCourse({...newCourse, instructorImage: text})}
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-['PoppinsSemiBold'] text-gray-700 mb-1">Bio</Text>
                      <TextInput
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-base min-h-[80]"
                        placeholder="Write a compelling bio that builds trust with students"
                        value={newCourse.instructorBio}
                        onChangeText={(text) => setNewCourse({...newCourse, instructorBio: text})}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Footer */}
            <View className="px-4 py-3 border-t border-gray-200 bg-white">
              <TouchableOpacity
                className={`${
                  isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-blue-700'
                } p-3 rounded-lg shadow-sm`}
                onPress={handleAddCourse}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-['PoppinsBold'] text-center text-base">Create Course</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {loading && (
        <View className="absolute inset-0 bg-black/20 justify-center items-center">
          <View className="bg-white p-4 rounded-lg">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-2 font-['PoppinsSemiBold']">Loading...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
