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
import { Colors } from "@/assets/colors";

export default function SecurityScreen() {
  const router = useRouter();

  return (
    <>
      
      <View className="flex-1 bg-primary">
        <View className="flex-1 bg-col_bg absolute bottom-0 w-full lg:w-[50vw] lg:ml-[30vw] lg:pl-[15vw] lg:pt-[10vw] h-[90%] rounded-t-[60px] pt-20 px-6">
          {/* Change Password */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile/ChangePassword")}
            className="flex-row items-center bg-col_bg p6 rounded-xl px-4 py-3 mb-4"
          >
            <View className="p-2 bg-button-light rounded-2xl">
              <Ionicons
                name="lock-closed-outline"
                size={40}
                color={Colors.col_bg.DEFAULT}
              />
            </View>
            <Text className="text font-medium text-[#222] ml-4">
              Change Password
            </Text>
          </TouchableOpacity>

          {/* Terms and Conditions */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile/TermsAndConditions")}
            className="flex-row items-center bg-col_bg p6 rounded-xl px-4 py-3 mb-4"
          >
            <View className="p-2 bg-button-light rounded-2xl">
              <Ionicons
                name="document-text-outline"
                size={40}
                color={Colors.col_bg.DEFAULT}
              />
            </View>
            <Text className="text font-medium text-[#222] ml-4">
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
