import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; 

export const useAuthStore = create((set) => ({
  user: null,   // Stores user details
  token: null,  // Stores the JWT token
  loading: true,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          set({ user: decoded, token });
        } else {
          await AsyncStorage.removeItem("userToken");
          set({ user: null, token: null });
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
    set({ loading: false });
  },

  login: async (token) => {
    const decoded = jwtDecode(token); // Decode user info from token
    await AsyncStorage.setItem("userToken", token);
    set({ user: decoded, token });
  },

  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ user: null, token: null });
  },
}));
