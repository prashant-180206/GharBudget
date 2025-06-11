import { Stack } from "expo-router";
import "./global.css";
import { auth } from "@/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AppProvider } from "@/context/AppContext";
import { SavingsProvider } from "@/context/SavingContext";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
