import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SecurityScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 bg-col_bg absolute bottom-0 w-full h-[90%] rounded-t-[60px] pt-20 px-6">
          {/* Title */}
          

          {/* Change Password */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile/ChangePassword")}
            className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4 shadow"
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="lock-closed-outline" size={22} color="#052224" />
              <Text className="text-base font-medium text-[#222]">
                Change Password
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#052224" />
          </TouchableOpacity>

          {/* Terms and Conditions */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile/TermsAndConditions")}
            className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4 shadow"
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="document-text-outline" size={22} color="#052224" />
              <Text className="text-base font-medium text-[#222]">
                Terms and Conditions
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#052224" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
