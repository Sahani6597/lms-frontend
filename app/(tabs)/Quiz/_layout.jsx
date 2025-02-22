import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="quizpre" 
        options={{ title: "Quiz", presentation: "modal", headerShown: false }} 
      />
      <Stack.Screen 
        name="result" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
