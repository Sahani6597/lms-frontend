import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, FlatList, Text, View, SafeAreaView} from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data] = useState([
    { id: '1', name: 'Full Stack Development' },
    { id: '2', name: 'Python Advance' },
    { id: '3', name: 'Machine Learning' },
    { id: '4', name: 'Business Intellegance' },
  ]);
 const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <SafeAreaView className="flex-1 bg-white pt-[40px] px-2">
      <StatusBar style="dark" />
      <View className='bg-blue-500 flex-row mt-2 mb-4 rounded-xl justify-center items-center h-16'>
      <Feather 
        name="search" 
        size={24} 
        color="white" 
        style={{ paddingHorizontal: 3, paddingVertical: 12 }} 
      />
      <TextInput 
        className="text-white mt-1 w-10/12 font-['Poppins'] text-xl h-full"
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
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="mx-2 px-2 py-2 border-b border-blue-500">
            <Text className="text-lg font-['Poppins']">{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
