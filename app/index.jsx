import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import "../global.css"; // global css
export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins.ttf'),
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMed: require('@/assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Keyboard.dismiss();
    }
  }
  );
  return;
}
