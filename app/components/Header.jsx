import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

const Header = () => {

    return (
        <View className="pt-[24px] px-4 bg-blue-600">
            <View className='flex-row items-center justify-between'>
                <View >
                    <Text className="pt-3 text-lg text-white font-['Poppins']">Hello , 👋</Text>
                    <Text className="text-2xl text-white font-['PoppinsBold']">Mithun</Text>
                </View>
                <View>
                    <Feather name="bell" size={30} color="white" />
                </View>
            </View>
            <View className='bg-blue-500 flex-row mt-2 mb-4 rounded-xl justify-center items-center'>
      <Feather 
        name="search" 
        size={22} 
        color="white" 
        style={{ paddingHorizontal: 7, paddingVertical: 7 }} 
      />
      <TextInput 
        placeholder="What are you looking for" 
        placeholderTextColor="white" 
        className="text-white pt-1 w-10/12 font-['Poppins'] text-base h-full" 
        selectionColor="white" 
        style={{
          textAlignVertical: 'center',
          paddingVertical: 0, 
        }} 
      />
    </View>
        </View>
    )
}

export default Header