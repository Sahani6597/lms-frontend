import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
const onbording = () => {
  return (
    (
        <View className="flex-1 justify-center items-center bg-white" >
       <StatusBar style="dark" backgroundColor="white" translucent={false} />
          < View className='w-full h-[40%] mb-14 justify-center items-center'><Image source={require('@/assets/images/onbor.jpg')} className="h-full w-[80%] " />
          </View>
          <Text className="text-4xl font-['PoppinsExtraBold']  text-center leading-[3.5rem]"> Discover and improve your skills</Text>
      
          <Text className="text-[17px] font-['PoppinsSemiBold'] text-center mt-3"> Learn from the best Courses and Tutorial. 🚀 </Text>
      
          <TouchableOpacity className="mt-8 border-none rounded-2xl h-16 w-[70%] bg-blue-700 justify-center items-center "
            onPress={() => router.push("/(auth)/signin")}>
            <Text className="text-white text-xl font-['PoppinsBold']">Get Started</Text>
          </TouchableOpacity>
        </View>)
  )
}

export default onbording