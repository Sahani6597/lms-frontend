import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function Layout() {
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsTabVisible(false);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsTabVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: isTabVisible ? 'flex' : 'none', // Hide tabs when keyboard is visible
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
          tabBarLabel: 'Home', // Title for the Home tab
        }}
      />
      <Tabs.Screen
        name="Guide"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={30} color={color} />
          ),
          tabBarLabel: 'Guide', // Title for the Guide tab
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={30} color={color} />
          ),
          tabBarLabel: 'Search', // Title for the Search tab
        }}
      />
      <Tabs.Screen
        name="Quiz"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="quiz" size={30} color={color} />
          ),
          tabBarLabel: 'Quiz', // Title for the Quiz tab
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
          tabBarLabel: 'Profile', // Title for the Profile tab
        }}
      />
    </Tabs>
  );
}
