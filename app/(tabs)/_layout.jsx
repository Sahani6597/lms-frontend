import { Tabs, usePathname } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function Layout() {
  const [isTabVisible, setIsTabVisible] = useState(true);
  const pathname = usePathname(); // Get the current route path

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

  // Hide the tab bar when navigating inside Quiz subpages
  const shouldHideTabBar = pathname.startsWith('/Quiz/');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: isTabVisible && !shouldHideTabBar ? 'flex' : 'none', // Hide when keyboard is visible or on Quiz subpages
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="Guide"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={30} color={color} />
          ),
          tabBarLabel: 'Guide',
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={30} color={color} />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tabs.Screen
        name="Quiz"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="quiz" size={30} color={color} />
          ),
          tabBarLabel: 'Quiz',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
