import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Colors } from "@/assets/colors";
import CustomHeader from "@/components/CustomHeader";
import { DailyExpenseProvider } from "@/context/DailyExpenseContext";

export default function TabLayout() {
  return (
    <DailyExpenseProvider>
      <Tabs
        initialRouteName="search"
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
            // headerShown: true,
            headerShown: false,

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
            title: "Transactions",
            headerShown: true,
            header: () => <CustomHeader title="Transactions" />,
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
        <Tabs.Screen
          name="Account_Details"
          options={{
            title: "Account Details",
            headerShown: false,
            href: null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: true,
            header:()=><CustomHeader title="Search"/>,
            href: null,
          }}
        />
      </Tabs>
    </DailyExpenseProvider>
  );
}
