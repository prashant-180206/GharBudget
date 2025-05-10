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
import CategoryGrid from "@/components/categories/CategoryGrid";
import Dashboard from "@/components/tabs/Dashboard";

const Transactions = () => {
  const router = useRouter();

  return (
    <>
      <View className="flex-1 bg-primary">
        {/* Header */}
        <View className="items-center w-full h-[25%] justify-center py-6">
          <Dashboard />
        </View>

        {/* Scrollable Content */}
        <View className="flex-1 w-full h-[80%] bg-col_bg rounded-t-[80px] pt-0 px-4 pb-32">
          <ScrollView
            className="p-4 my-4 "
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <CategoryGrid />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Transactions;
