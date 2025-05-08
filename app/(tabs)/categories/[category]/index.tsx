import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";

const category = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  return (
    <>
      <View className="flex-1 bg-primary">
        {/* Header */}
        <View className="items-center w-full h-[25%] justify-center py-6">
          <Dashboard />
        </View>

        {/* Scrollable Content */}
        <View className="flex-1 w-full h-[80%] bg-col_bg rounded-t-[80px] pt-0 px-4 pb-32">
          <TouchableOpacity
            onPress={() =>
              router.push(
                `/(tabs)/categories/${category.toString()}/addexpense`
              )
            }
            className="bg-primary p-3 rounded-full mt-8 mx-auto px-6"
          >
            <Text className="text-Txt text-base font-semibold text-center">
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default category;
