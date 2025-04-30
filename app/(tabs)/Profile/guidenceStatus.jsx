import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useAuthStore } from '../../../store/authStore';
import useGuideStore from '../../../store/guideStore';

const GuidanceStatus = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { sessions, loading, error, fetchSessions } = useGuideStore();

  useEffect(() => {
    if (token) {
      fetchSessions(token).catch(console.error);
    }
  }, [token]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-2 py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Your Sessions</Text>
      </View>

      {error ? (
        <View className="p-4">
          <Text className="text-red-500 font-['PoppinsMed'] text-center">{error}</Text>
          <TouchableOpacity 
            onPress={fetchSessions}
            className="mt-4 bg-blue-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-['PoppinsMed']">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="p-4">
          {sessions.length === 0 ? (
            <Text className="text-center text-gray-500 mt-4">No sessions found</Text>
          ) : (
            sessions.map((session, index) => {
              const getStatusStyle = (status) => {
                switch(status.toLowerCase()) {
                  case 'completed':
                    return {
                      container: 'bg-green-100',
                      text: 'text-green-600',
                      icon: 'checkcircle'
                    };
                  case 'cancelled':
                    return {
                      container: 'bg-red-100',
                      text: 'text-red-600',
                      icon: 'closecircle'
                    };
                  case 'confirmed':
                    return {
                      container: 'bg-yellow-100',
                      text: 'text-yellow-600',
                      icon: 'clockcircle'
                    };
                  case 'pending':
                    return {
                      container: 'bg-blue-100',
                      text: 'text-blue-600',
                      icon: 'loading1'
                    };
                  default:
                    return {
                      container: 'bg-gray-100',
                      text: 'text-gray-600',
                      icon: 'questioncircle'
                    };
                }
              };

              const statusStyle = getStatusStyle(session.status);
              const capitalizedStatus = session.status.charAt(0).toUpperCase() + session.status.slice(1).toLowerCase();

              return (
                <View
                  key={index}
                  className={`p-4 mb-2 rounded-lg ${statusStyle.container}`}
                >
                  <Text className="text-lg font-['PoppinsSemiBold']">{session.topic}</Text>
                  <Text className="text-md text-gray-700 font-['PoppinsMed'] mt-1">
                    Time Slot: {session.timeSlot}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <AntDesign name={statusStyle.icon} size={16} className={statusStyle.text} />
                    <Text className={`text-md font-['PoppinsMed'] ml-1 ${statusStyle.text}`}>
                      {capitalizedStatus}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default GuidanceStatus;
