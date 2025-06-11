import CustomHeader from "@/components/CustomHeader";

import { Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() { 

  return (
    <Stack >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title='Daily' />,
        }}
      />
      <Stack.Screen
        name="addcategory"
        options={{
          headerShown: true,
          header: () => <CustomHeader title='Add Daily Expense ' />,
        }}
      />
      <Stack.Screen
        name="[daily_expense]"
        options={{
          headerShown: true,
          header: () => <CustomHeader title='Daily Expense ' />,
        }}
      />
      
    </Stack>
  );
}
