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
            header: () => <CustomHeader title="Analysis" />,
          }}
        />
      </Stack>
    </AnalysisProvider>
  );
}
