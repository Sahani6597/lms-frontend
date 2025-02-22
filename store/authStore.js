import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode"; 

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          set({ user: token });
        } else {
          await AsyncStorage.removeItem("userToken");
          set({ user: null });
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
    set({ loading: false });
  },

  login: async (token) => {
    await AsyncStorage.setItem("userToken", token);
    set({ user: token });
  },

  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ user: null });
  }
}));
