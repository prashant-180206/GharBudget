import React, { useState } from "react";
import { View, Text, Switch, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

type SettingKey =
  | "generalNotification"
  | "sound"
  | "soundCall"
  | "vibrate"
  | "transactionUpdate"
  | "expenseReminder"
  | "budgetNotifications"
  | "lowBalanceAlerts";

const initialSettings: Record<SettingKey, boolean> = {
  generalNotification: true,
  sound: true,
  soundCall: true,
  vibrate: true,
  transactionUpdate: false,
  expenseReminder: false,
  budgetNotifications: true,
  lowBalanceAlerts: true,
};

export default function NotificationSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (key: SettingKey) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingLabels: Record<SettingKey, string> = {
    generalNotification: "General Notification",
    sound: "Sound",
    soundCall: "Sound Call",
    vibrate: "Vibrate",
    transactionUpdate: "Transaction Update",
    expenseReminder: "Expense Reminder",
    budgetNotifications: "Budget Notifications",
    lowBalanceAlerts: "Low Balance Alerts",
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SafeAreaView className="flex-1 bg-primary">
        
        {/* Content Card */}
        <View className="flex-1 bg-col_bg rounded-t-[60px] p-6 mt-20 lg:w-[50vw] lg:ml-[25vw] lg:px-[8vw] lg:pt-[6vw]">
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(settings).map((key) => {
              const typedKey = key as SettingKey;
              return (
                <View
                  key={key}
                  className="flex-row justify-between items-center mb-6"
                >
                  <Text className="text-Txt text-base font-medium">
                    {settingLabels[typedKey]}
                  </Text>
                  <Switch
                    trackColor={{ false: "#888", true: "#00D09E" }}
                    thumbColor={settings[typedKey] ? "#fff" : "#fff"}
                    ios_backgroundColor="#ccc"
                    onValueChange={() => toggleSetting(typedKey)}
                    value={settings[typedKey]}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
