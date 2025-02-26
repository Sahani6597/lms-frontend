import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="feedback"/>
        <Stack.Screen name="transaction"/>
        <Stack.Screen name="milestone"/>
        <Stack.Screen name="certificates"/>
        <Stack.Screen name="profileInfo"/>
    </Stack>  )
}

export default _layout