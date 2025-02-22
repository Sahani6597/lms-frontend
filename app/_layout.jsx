
import React from 'react'
import {  Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <>
    <StatusBar style="dark" />
    <Stack>
       <Stack.Screen name='index' options={{headerShown:false}}/>
       <Stack.Screen name='(auth)' options={{headerShown:false}}/>
       <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
       <Stack.Screen name='Course/CourseDetail' options={{headerShown:false}}/>
    </Stack> 
    </>
  )
}

export default _layout