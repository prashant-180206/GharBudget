import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "@/components/chart";
import CircularLoader from "@/components/circularLoader";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import { router } from "expo-router";
import { useAppData } from "@/context/AppContext";
import CombinedList from "@/components/tabs/ExpenseView";

const Transactions = () => {
  const { userData } = useAppData();
  const [routename, setroute] = useState<"all" | "income" | "expense">("all");

  return (
    <>
      <View className="h-full w-full bg-primary">
        <View className="w-full h-[25%] lg:h-[25%] lg:w-[50vw] lg:ml-[23vw]">
          <View className="h-full w-full flex p-4 gap-4 lg:gap-2 px-10 justify-center">
            <View className="bg-col_bg h-2/6 rounded-xl flex flex-col lg:flex-row lg:gap-7 lg:w-[34vw] lg:relative lg:left-[5vw] items-center justify-center">
              <Text className="font-semibold text-Txt-secondary">
                Total balance :
              </Text>
              <Text className="text-2xl font-bold">
                {userData?.Income_this_month
                  ? userData?.Income_this_month - userData?.Expense_this_month
                  : "Add Income to see"}
              </Text>
            </View>

            <View className="h-3/6 gap-4 flex flex-row justify-between">
              {/* Income Block */}
              <TouchableOpacity
                className="rounded-xl flex-grow h-full lg:h-[6vw]"
                onPress={() => {
                  setroute(routename === "income" ? "all" : "income");
                }}
              >
                <View
                  className={`rounded-xl flex-grow h-full flex lg:w-[15vw] lg:relative lg:left-[6vw] flex-col items-center justify-center ${
                    routename === "income" ? "bg-button-dark" : "bg-col_bg"
                  }`}
                >
                  <Ionicons
                    name="cash-outline"
                    size={30}
                    color={
                      routename === "income"
                        ? Colors.Txt.light
                        : Colors.primary.DEFAULT
                    }
                  />
                  <Text
                    className={`font-semibold ${
                      routename === "income" ? "text-Txt-light" : "text-Txt"
                    }`}
                  >
                    Income
                  </Text>
                  <Text
                    className={`text-2xl font-bold ${
                      routename === "income" ? "text-Txt-light" : "text-primary"
                    }`}
                  >
                    {userData?.Income_this_month}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Expense Block */}
              <TouchableOpacity
                className="rounded-xl flex-grow lg:h-[6vw]"
                onPress={() => {
                  setroute(routename === "expense" ? "all" : "expense");
                }}
              >
                <View
                  className={`rounded-xl flex-grow h-full flex flex-col lg:relative lg:right-[6vw] items-center justify-center ${
                    routename === "expense" ? "bg-button-dark" : "bg-col_bg"
                  }`}
                >
                  <Ionicons
                    name="card-outline"
                    size={30}
                    color={
                      routename === "expense"
                        ? Colors.Txt.light
                        : Colors.button.dark
                    }
                  />
                  <Text
                    className={`font-semibold w-full text-center ${
                      routename === "expense"
                        ? "text-Txt-light"
                        : "text-Txt-secondary"
                    }`}
                  >
                    Expense
                  </Text>
                  <Text
                    className={`text-2xl font-bold ${
                      routename === "expense"
                        ? "text-Txt-light"
                        : "text-button-dark"
                    }`}
                  >
                    {userData?.Expense_this_month}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View className="bg-white h-2/6"></View> */}
          </View>
        </View>
        <View className="w-full h-[75%] bg-col_bg absolute bottom-0 rounded-t-[80px] lg:px-[15vw]">
          <View className="w-full h-full pt-12 pb-32 px-6 ">
            <CombinedList filterType={routename || "all"} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Transactions;
