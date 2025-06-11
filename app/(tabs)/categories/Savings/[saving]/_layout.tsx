import CustomHeader from "@/components/CustomHeader";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  const { saving } = useLocalSearchParams();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title={`${saving}`} />,
        }}
      />
      <Stack.Screen
        name="addsavings"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Add Savings" />,
        }}
      />
      {/* <Stack.Screen name="changebudget" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
