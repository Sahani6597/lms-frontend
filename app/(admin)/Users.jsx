import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from "../../store/authStore";
import { API_BK } from "../../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('student');
  const { token } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error('No authentication token found');
      const response = await axios.get(`${API_BK}/users/listofusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data?.data || response.data?.users || response.data;
      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        Alert.alert("Error", "Invalid data format received");
        setUsers([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users");
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    return {
      // student: 'bg-yellow-700',
      // instructor: 'bg-blue-700',
      // admin: 'bg-green-700',
    }[role] || 'bg-blue-600';
  };

  const handleDeleteUser = async (id, role) => {
    if (role === 'admin' && categories.admin.length <= 1) {
      Alert.alert("Error", "Cannot delete the last admin user");
      return;
    }
    Alert.alert("Delete User", `Are you sure you want to delete this ${role}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          setLoading(true);
          try {
            const response = await axios.delete(`${API_BK}/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
              // Immediately update users state by filtering out the deleted user
              setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
              Alert.alert("Success", "User deleted successfully");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to delete user");
            console.error('Error deleting user:', error);
          } finally {
            setLoading(false);
          }
        }
      }
    ]);
  };

  const categories = {
    student: users.filter(user => user.role === 'student'),
    instructor: users.filter(user => user.role === 'instructor'),
    admin: users.filter(user => user.role === 'admin'),
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CategoryButton = ({ title, count }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(title.toLowerCase())}
      className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === title.toLowerCase() ? 'bg-blue-700' : 'bg-gray-200'}`}
    >
      <Text className={`text-md font-['PoppinsMed'] ${selectedCategory === title.toLowerCase() ? 'text-white' : 'text-gray-700'}`}>
  {title} ({count})
</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-['PoppinsBold']  text-gray-900">{item.name || 'No Name'}</Text>
        <View className={`px-3 py-1 rounded-full ${getRoleColor(item.role)}`}>
          <Text className="text-white text-xs font-['PoppinsMed'] capitalize">{item.role}</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Ionicons name="mail-outline" size={18} color="#4B5563" />
        <Text className="text-gray-600 ml-2 font-['PoppinsMed']">{item.email || 'No Email'}</Text>
      </View>
      <View className="flex-row justify-end mt-4">
        <TouchableOpacity
          className="flex-row items-center px-4 py-2 bg-gray-600 text-white rounded-xl"
          onPress={() => handleDeleteUser(item._id, item.role)}
        >
          <Ionicons name="trash-outline" size={16} color="white" />
          <Text className="text-white ml-2 font-['PoppinsBold'] text-sm">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-['PoppinsBold'] text-gray-900 mb-4">Users Management</Text>
        <View className="bg-gray-200 flex-row items-center mb-4 rounded-xl justify-center h-12 pl-3">
          <Feather 
            name="search" 
            size={20} 
            color="gray" 
            style={{ paddingHorizontal: 2, paddingVertical: 10 }} 
          />
          <TextInput
            className="flex-1 font-['PoppinsMed'] text-lg h-full"
            placeholder="Search users by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor="blue"
            style={{
              textAlignVertical: 'center',
              paddingVertical: 0,
            }}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {Object.keys(categories).map((key) => (
            <CategoryButton key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} count={categories[key].length} />
          ))}
        </ScrollView>
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1D4ED8" />
        </View>
      ) : (
        <FlatList
          className="px-4 pt-4"
          data={filteredUsers.filter(user => user.role === selectedCategory)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetchUsers}
          ListEmptyComponent={
            <View className="bg-gray-100 p-4 rounded-xl">
              <Text className="text-center text-gray-500">No {selectedCategory}s found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}