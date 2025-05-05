import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Colors } from "@/assets/colors";
import CustomHeader from "@/components/CustomHeader";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 100,
          borderRadius: 40,
          backgroundColor: Colors.col_bg.dark, // light green background
          borderTopWidth: 0,
          paddingTop: 30,
          elevation: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 rounded-3xl items-center justify-center ${
                focused ? "bg-primary" : ""
              }`}
            >
              <Ionicons name={"home-outline"} size={35} color={"#000"} />
            </View>
          ),
        }}
      />

      {/* Analysis */}
      <Tabs.Screen
        name="analysis"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Analysis" />,
          title: "Analysis",
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 rounded-3xl items-center justify-center ${
                focused ? "bg-primary" : ""
              }`}
            >
              <Ionicons name={"analytics-outline"} size={35} color={"#000"} />
            </View>
          ),
        }}
      />

      {/* Transactions */}
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Transactions" />,
          title: "Transactions",
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 rounded-3xl items-center justify-center ${
                focused ? "bg-primary" : ""
              }`}
            >
              <Ionicons
                name={"swap-horizontal-outline"}
                size={35}
                color={"#000"}
              />
            </View>
          ),
        }}
      />

      {/* Categories */}
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Categories" />,
          title: "Categories",
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 rounded-3xl items-center justify-center ${
                focused ? "bg-primary" : ""
              }`}
            >
              <Ionicons name={"layers-outline"} size={35} color={"#000"} />
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-16 h-16 rounded-3xl items-center justify-center ${
                focused ? "bg-primary" : ""
              }`}
            >
              <Ionicons name={"person-outline"} size={35} color={"#000"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
