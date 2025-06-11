import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Categories" />,
        }}
      />

      <Stack.Screen name="[category]" options={{ headerShown: false }} />

      <Stack.Screen
        name="Savings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Daily"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
