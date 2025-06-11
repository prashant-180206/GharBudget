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
import Dashboard from "@/components/tabs/Dashboard";
import SavingsGrid from "@/components/categories/SavingsGrid";
import SavingDashboard from "@/components/categories/savingDashboard";

const Savings = () => {
  const router = useRouter();
  return (
    <>
      <View className="h-full w-full bg-primary ">
        <View className="w-full h-[20%] flex items-center justify-center">
          <View className="w-full">
            <SavingDashboard />
          </View>
        </View>
        <View
          className="w-full h-[80%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col justify-center items-center
        "
        >
          <View className="w-full h-full pt-10 pb-32 px-8">
            <ScrollView className=" h-full w-full mb-32">
              <SavingsGrid />
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default Savings;
