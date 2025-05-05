import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Categories" />,
        }}
      />
      <Stack.Screen
        name="addexpense"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Add Expense" />,
        }}
      />
      <Stack.Screen name="[category]" options={{ headerShown: false }} />
    </Stack>
  );
}
