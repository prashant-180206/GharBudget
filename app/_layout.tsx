import { Stack } from "expo-router";
import "./global.css";
import { auth } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false); // Set initializing to false when auth state is determined
    });

    return unsubscribe;
  }, []);

  // Show loading indicator while initializing
  if (initializing) {
    return null; // or you can render a loading spinner here
  }

  return (
    <Stack initialRouteName={user ? "(tabs)" : "(auth)"}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
