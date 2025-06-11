import { Stack } from "expo-router";
import "./global.css";
import { auth } from "@/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AppProvider } from "@/context/AppContext";
import { View, ActivityIndicator } from "react-native";
import { SavingsProvider } from "@/context/SavingContext";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Show loading indicator while initializing
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Only render Stack after auth state is known !user ? "(auth)" :
  return (
    <SavingsProvider>
      <AppProvider>
        <Stack initialRouteName={!user ? "(auth)" : "(tabs)"}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </SavingsProvider>
  );
}
