import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import "../global.css"; // global css

export default function RootLayout() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins.ttf'),
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMed: require('@/assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [fontsLoaded, token]);

  return null;
}
