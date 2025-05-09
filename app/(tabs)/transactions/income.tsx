import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "@/components/chart";
import CircularLoader from "@/components/circularLoader";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import { router } from "expo-router";
import { useAppData } from "@/context/AppContext";

const income = () => {
  const { userData } = useAppData();

  return (
    <>
      <View className="h-full w-full bg-primary  ">
        <View className="w-full h-[30%] ">
          <View className="h-full w-full flex p-4 gap-4 px-10 justify-center ">
            <View className="bg-col_bg h-2/6 rounded-xl flex flex-col items-center justify-center">
              <Text className="font-semibold text-Txt-secondary">
                Total balance
              </Text>
              <Text className="text-2xl font-bold">
                {userData?.Income_this_month
                  ? userData?.Income_this_month - userData?.Expense_this_month
                  : "qwertyuiop"}
              </Text>
            </View>
            <View className=" h-3/6 gap-4 flex flex-row justify-between">
              <View className="bg-button-dark rounded-xl flex-grow h-full flex flex-col items-center justify-center">
                <Ionicons
                  name="cash-outline"
                  size={30}
                  color={Colors.col_bg.light}
                />
                <Text className="font-semibold text-Txt-light">Income</Text>
                <Text className="text-2xl font-bold text-Txt-light">
                  {userData?.Income_this_month}
                </Text>
              </View>
              <View className="bg-col_bg rounded-xl flex-grow h-full flex flex-col items-center justify-center">
                <Ionicons
                  name="card-outline"
                  size={30}
                  color={Colors.button.dark}
                />
                <Text className="font-semibold text-Txt-secondary w-full text-center">
                  Expense
                </Text>
                <Text className="text-2xl font-bold text-button-dark">
                  {userData?.Expense_this_month}
                </Text>
              </View>
            </View>
            {/* <View className="bg-white h-2/6"></View> */}
          </View>
        </View>
        <View
          className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] 
        "
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/transactions/addincome");
            }}
          >
            <Text>Go to add Income</Text>
          </TouchableOpacity>
          <View className="w-2/6 ">
            <CircularLoader progress={45} />
          </View>
          <Text>ertyuio</Text>
          <View className="flex items-center justify-center p-4  w-full">
            <Chart
              data={[
                { column: "Mon", income: 700, expense: 400 },
                { column: "Tue", income: 500, expense: 300 },
                { column: "Wed", income: 600, expense: 500 },
                { column: "Thu", income: 100, expense: 200 },
                { column: "Fri", income: 900, expense: 800 },
                { column: "Sat", income: 200, expense: 100 },
                { column: "Sun", income: 600, expense: 200 },
              ]}
              maxHeight={120}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default income;
