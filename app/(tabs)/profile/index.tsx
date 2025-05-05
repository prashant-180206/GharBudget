import React from "react";

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import help from "./help";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="flex-1 bg-primary">
        {/* White Layer Content */}
        <View className="flex-1 bg-col_bg absolute bottom-0 w-full h-[90%] rounded-t-[60px] pt-20 px-6">
          {/* Profile Image */}
          <View className="absolute -top-14 self-center">
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/uyT08IJT10/f0xci0gx_expires_30_days.png",
              }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
          </View>

          {/* Name and ID */}
          <View className="items-center mb-6">
            <Text className="text-lg font-bold text-heading-secondary">
              John Smith
            </Text>
            <Text className="text-sm text-Txt">ID: 25030024</Text>
          </View>

          {/* Menu Items */}
          {[
            {
              title: "Edit Profile",
              icon: "person-outline",
              screen: "editprofile",
            },
            {
              title: "Security",
              icon: "shield-checkmark-outline",
              screen: "security",
            },
            { title: "Setting", icon: "settings-outline", screen: "settings" },
            { title: "Help", icon: "help-circle-outline", screen: "help" },
            { title: "Logout", icon: "log-out-outline", logout: true },
          ].map(({ title, icon, screen, logout }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                logout ? alert("Logged out!") : router.push("/(auth)")
              }
              className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow"
            >
              {/* <Ionicons name={icon} size={24} color="#1E90FF" className="mr-4" /> */}
              <Text className="text-base font-medium text-[#222]">{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation */}
        <View className="absolute bottom-0 w-full items-center">
          <View className="flex-row bg-[#E8F9EF] px-6 py-3 rounded-t-3xl w-11/12 justify-between">
            {[
              { icon: "home-outline" },
              { icon: "bar-chart-outline" },
              { icon: "swap-horizontal-outline" },
              { icon: "layers-outline" },
              { icon: "person-circle-outline" },
            ].map((item, i) => (
              <TouchableOpacity key={i}>
                {/* <Ionicons name={item.icon} size={24} color="#1E90FF" /> */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
