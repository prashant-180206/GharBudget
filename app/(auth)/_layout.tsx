import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot_password" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
