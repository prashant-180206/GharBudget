import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
    initialRouteName="expense"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          height: 70, // ⬅️ fixed height looks better
          borderRadius: 25,
          backgroundColor: Colors.col_bg.light,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 10,
          paddingBottom: 5, // ⬅️ inner padding instead of making height auto
          paddingTop: 15,
          padding:10,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {/** Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center w-[20vw] ">
              <Ionicons
                size={26}
                name={focused ? "home" : "home-outline"}
                color={focused ? Colors.primary.DEFAULT : Colors.primary.light.DEFAULT}
              />
              <Text className="text-[12px] text-Txt">Home</Text>
            </View>
          ),
        }}
      />

      {/** Expense Tab */}
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center w-[20vw] ">
              <Ionicons
                size={26}
                name={focused ? "wallet" : "wallet-outline"}
                color={focused ? Colors.primary.DEFAULT : Colors.primary.light.DEFAULT}
              />
              <Text className="text-[12px] text-Txt">Expense</Text>
            </View>
          ),
        }}
      />

      {/** Budget Tab */}
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center w-[20vw]">
              <Ionicons
                size={26}
                name={focused ? "trending-up" : "trending-up-outline"}
                color={focused ? Colors.primary.DEFAULT : Colors.primary.light.DEFAULT}
              />
              <Text className="text-[12px] text-Txt">Budget</Text>
            </View>
          ),
        }}
      />

      {/** Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center w-[20vw]">
              <Ionicons
                size={26}
                name={focused ? "person" : "person-outline"}
                color={focused ? Colors.primary.DEFAULT : Colors.primary.light.DEFAULT}
              />
              <Text className="text-[12px] text-Txt">Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
