import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchbar";
import OptionSelector from "@/components/option_selector";
import HomeCard from "@/components/homeCard";
import { Colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
// import Btn from "@/components/Btn";

const home = () => {
  return (
    <ScrollView className="h-[100vh] w-full bg-col_bg p-4">
      <View className="w-full text-left flex flex-col gap-4">
        <Text className="text-heading font-bold text-3xl">Hello , Priya</Text>
        <Text className="text-heading-secondary text-xl">
          Here's Your Financial SnapShot
        </Text>
      </View>
      <SearchBar />
      <OptionSelector
        title="Daily Expense Check"
        options={["Milk", "Newspaper", "Laundry"]}
      />

      <HomeCard title="Budget This Month" info="12000" bg="bg-card-1" />

      <HomeCard title="Remaining Amount" info="2500" bg="bg-card-2" />

      <HomeCard title="Spent" info="9500 | 12000" bg="bg-card-3" />

      <HomeCard
        title="Pending Bills"
        info="Electricity | 1500"
        bg="bg-card-4"
      />
      <View className="w-full flex flex-row justify-center">
        <TouchableOpacity className="bg-button-dark p-4 rounded-full my-4 w-3/6 flex flex-row items-center justify-center shadow-xl">
          <Ionicons
            name="add-circle-outline"
            color={Colors.Txt.light}
            size={28}
            className="mr-2"
          />
          <Text className="text-xl text-Txt-light ">Add Expense</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default home;
