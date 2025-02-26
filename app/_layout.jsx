import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore"; // ✅ Import Zustand store
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const router = useRouter();
  const { token, login } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        login(storedToken); // ✅ Restore token
        router.replace("/(tabs)"); // ✅ Redirect to Home if authenticated
      } else {
        router.replace("/(tabs)"); // ✅ Redirect to Login if not
      }
    };

    checkAuth();
  }, []);

  return <Stack screenOptions={{headerShown:false}} />;
}
