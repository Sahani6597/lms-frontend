import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const BarItems = [
    {
      name: 'Course',
      color: '#00A9FF'
    },
    {
      name: 'Guide',
      color: '#3AA6B9'
    },
  
    {
      name: 'Quiz',
      color: '#FF76CE'
    },
    {
      name: 'Books',
      color: '#7C00FE'
    },
    {
      name: 'More',
      color: '#5C2FC2'
    },
  ]
export default function Explore() {
  return (
    <View className='h-56 gap-2'>
    <Text className="text-3xl px-3 pt-2 font-['PoppinsBold']">
      Explore
    </Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {BarItems.map(
        (item, index) => (
          <View className='h-40 w-32 mx-3 justify-center items-center bg-green-300 rounded-2xl' style={{ backgroundColor: item.color }} key={index}>
            <Text className="text-3xl text-white font-['PoppinsBold']">{item.name}</Text>
          </View>
        )
      )
      }
    </ScrollView>
  </View>
  )
}