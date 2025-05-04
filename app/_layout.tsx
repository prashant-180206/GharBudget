import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(auth)">
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(expenses)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
