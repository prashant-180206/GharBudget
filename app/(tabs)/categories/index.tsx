import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CategoryGrid from "@/components/CategoryGrid";

const Transactions = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="flex-1 bg-primary">
        {/* Header */}
        <View className="items-center justify-center py-6">
          <Text className="text-3xl font-semibold text-Txt">Categories</Text>
        </View>

        {/* Scrollable Content */}
        <View className="flex-1 bg-col_bg rounded-t-[80px] pt-0 px-4 pb-32">
          <ScrollView
            className="p-4 my-4"
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <CategoryGrid />

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/categories/addexpense")}
              className="bg-primary p-3 rounded-full mt-8 mx-auto px-6"
            >
              <Text className="text-Txt text-base font-semibold text-center">
                Add Expense
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Transactions;
