import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Profile" />,
        }}
      />
      <Stack.Screen
        name="editprofile"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Edit My Profile" />,
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Help And Support" />,
        }}
      />
      <Stack.Screen
        name="logout"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Logout" />,
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Security" />,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Settings" />,
        }}
      />
    </Stack>
  );
}
