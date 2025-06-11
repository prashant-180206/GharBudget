import CustomHeader from "@/components/CustomHeader";
import { AnalysisProvider } from "@/context/AnalysisContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AnalysisProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Account Details" />,
          }}
        />
        <Stack.Screen
          name="changebudget"
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Change Budget" />,
          }}
        />
        <Stack.Screen
          name="addincome"
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Add Income" />,
          }}
        />
      </Stack>
    </AnalysisProvider>
  );
}
