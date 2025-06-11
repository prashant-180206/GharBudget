import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Savings" />,
        }}
      />
      <Stack.Screen
        name="[saving]"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="changebudget" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
