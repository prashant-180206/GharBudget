import { AnalysisProvider } from "@/context/AnalysisContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AnalysisProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AnalysisProvider>
  );
}
