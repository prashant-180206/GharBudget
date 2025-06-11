import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

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
      <Stack.Screen
        name="TermsAndConditions"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Terms And Conditions" />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Change Password" />,
        }}
      />
      <Stack.Screen
        name="notificationSettings"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Notification Settings" />,
        }}
      />

      <Stack.Screen
        name="deleteAccount"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Delete Account" />,
        }}
      />
    </Stack>
  );
}
