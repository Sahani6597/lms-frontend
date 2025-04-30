import { View, Text, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuthStore} from "../../store/authStore"
import {API_BK} from "../../config"
import { Feather } from '@expo/vector-icons';

export default function Guide() {
  const [requests, setRequests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const token = useAuthStore().token; 

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch pending guidance requests
  const fetchRequests = async () => {
    try {// Retrieve token
      if (!token) throw new Error('No authentication token found');

      console.log('Fetching with token:', token); // Debug log
      
      const response = await axios.get(`${API_BK}/guide/sessions/instructor/all`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log('Response:', response.data); // Debug log
      
      if (response.data.success) {
        setRequests(response.data.data);
      } else {
        console.error('API returned unsuccessful response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // You might want to add error state handling here
    }
  };

  // Accept a guidance request
  const handleAccept = async (id) => {
    try {
      if (!token) throw new Error('No authentication token found');
      
      await axios.put(`${API_BK}/guide/sessions/${id}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error.response?.data || error);
    }
  };

  // Cancel a guidance request
  const handleCancel = async (id) => {
    try {
      if (!token) throw new Error('No authentication token found');
      
      await axios.put(`${API_BK}/guide/sessions/${id}/status`, {
        status: 'cancelled'
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
    } catch (error) {
      console.error('Error cancelling request:', error.response?.data || error);
    }
  };

  const categories = {
    pending: requests.filter(req => req.status === 'pending'),
    confirmed: requests.filter(req => req.status === 'confirmed'),
    completed: requests.filter(req => req.status === 'completed'),
    cancelled: requests.filter(req => req.status === 'cancelled')
  };

  const CategoryButton = ({ title, count, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(title.toLowerCase())}
      className={`px-4 py-2 rounded-full mr-2 ${
        isSelected ? 'bg-blue-700' : 'bg-gray-200'
      }`}
    >
      <Text className={`font-['Poppins'] ${
        isSelected ? 'text-white' : 'text-gray-700'
      }`}>
        {title} ({count})
      </Text>
    </TouchableOpacity>
  );

  // Map status to color - Updated color scheme
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-400',
      confirmed: 'bg-emerald-500',
      completed: 'bg-blue-600',
      cancelled: 'bg-rose-500',
    };
    return colors[status] || 'bg-slate-500';
  };

  // Render list item - Updated design
  const renderItem = ({ item }) => (
    <View className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-['PoppinsSemiBold']">{item.topic}</Text>
        <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
          <Text className="text-white text-xs font-['Poppins']">{item.status}</Text>
        </View>
      </View>
      
      <View className="space-y-2">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={20} color="#6B7280" />
          <Text className="text-gray-600 font-['Poppins'] ml-2">{item.timeSlot}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="person-outline" size={20} color="#6B7280" />
          <Text className="text-gray-600 font-['Poppins'] ml-2">{item.user?.name || 'Unknown User'}</Text>
        </View>
        <View className="flex-row items-start">
          <Ionicons name="document-text-outline" size={20} color="#6B7280" />
          <Text className="text-gray-600 font-['Poppins'] ml-2 flex-1">{item.notes}</Text>
        </View>
      </View>

      {item.status === 'pending' && (
        <View className="flex-row justify-end gap-4 mt-4">
          <TouchableOpacity
            className="flex-row items-center px-5 py-2.5 bg-blue-700 rounded-xl"
            onPress={() => handleAccept(item._id)}
          >
            <Ionicons name="checkmark-outline" size={18} color="white" className="mr-1" />
            <Text className="text-white font-['Poppins'] ml-1">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center px-5 py-2.5 bg-gray-600 rounded-xl"
            onPress={() => handleCancel(item._id)}
          >
            <Ionicons name="close-outline" size={18} color="white" className="mr-1" />
            <Text className="text-white font-['Poppins'] ml-1">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const filteredRequests = categories[selectedCategory].filter(request =>
    request.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (request.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-['PoppinsBold'] mb-4">Guidance Requests</Text>
        
        <View className="bg-gray-200 flex-row items-center mb-4 rounded-xl justify-center h-12 pl-3">
          <Feather 
            name="search" 
            size={20} 
            color="gray" 
            style={{ paddingHorizontal: 2, paddingVertical: 10 }} 
          />
          <TextInput
            className="flex-1 font-['PoppinsMed'] text-lg h-full"
            placeholder="Search requests"
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor="blue"
            style={{
              textAlignVertical: 'center',
              paddingVertical: 0,
            }}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-4"
        >
          <CategoryButton 
            title="Pending" 
            count={categories.pending.length} 
            isSelected={selectedCategory === 'pending'} 
          />
          <CategoryButton 
            title="Confirmed" 
            count={categories.confirmed.length} 
            isSelected={selectedCategory === 'confirmed'} 
          />
          <CategoryButton 
            title="Completed" 
            count={categories.completed.length} 
            isSelected={selectedCategory === 'completed'} 
          />
          <CategoryButton 
            title="Cancelled" 
            count={categories.cancelled.length} 
            isSelected={selectedCategory === 'cancelled'} 
          />
        </ScrollView>
      </View>

      <FlatList
        className="px-4 pt-4"
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View className="bg-gray-100 p-4 rounded-xl">
            <Text className="text-center text-gray-500 font-['Poppins']">
              No {selectedCategory} requests available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
