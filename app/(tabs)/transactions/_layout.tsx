import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Transactions" />,
        }}
      />
      <Stack.Screen
        name="expense"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="See Expenses" />,
        }}
      />
      <Stack.Screen
        name="income"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Income" />,
        }}
      />
    </Stack>
  );
}
