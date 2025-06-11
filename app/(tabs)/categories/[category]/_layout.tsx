import CustomHeader from "@/components/CustomHeader";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  const { category } = useLocalSearchParams();
 

  return (
    <Stack >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title={`${category}`} />,
        }}
      />
      <Stack.Screen
        name="addexpense"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Add Expense" />,
        }}
      />
      {/* <Stack.Screen name="changebudget" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
