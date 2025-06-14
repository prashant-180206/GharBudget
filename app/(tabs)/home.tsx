import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import { useAppData } from "@/context/AppContext";
import CombinedList from "@/components/tabs/ExpenseView";
import SavingDashboard from "@/components/categories/savingDashboard";
import React, { useEffect, useState } from "react";
import Daily_Expense_Option_selector from "@/components/option_selector";
import { useDailyExpense } from "@/context/DailyExpenseContext";
// import OptionSelector from "@/components/option_selector";

// import Btn from "@/components/Btn";

const home = () => {
  const router = useRouter();

  const { userData } = useAppData();
  const [dailyshow, setdailyshow] = useState(false);
  const { dailyExpenseData, refresh } = useDailyExpense();

  useEffect(() => {
    if (dailyExpenseData) {
      const dailyavailable = dailyExpenseData?.Taken.filter((val) => {
        return val.date === new Date().toISOString().slice(0, 10);
      }).length;

      if (dailyavailable === 0) {
        setdailyshow(true);
      }
    }
  }, [dailyExpenseData]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        {dailyshow && dailyExpenseData && (
          <View className="bg-black/50 absolute h-full w-full z-50 flex pt-20 items-center">
            <View className="w-5/6 mt-10">
              <Daily_Expense_Option_selector
                title="Daily Expense"
                options={
                  dailyExpenseData
                    ? dailyExpenseData.categories.map(
                        (cat) => Object.keys(cat)[0]
                      )
                    : [""]
                }
                onClose={() => {
                  setdailyshow(false);
                }}
              />
            </View>
          </View>
        )}

        <View className="w-full h-[30%] flex flex-col items-center justify-start">
          <View className="w-5/6 flex flex-row items-center justify-between m-3 lg:pt-5">
            <View>
              <Text className="text-heading font-bold text-2xl lg:text-4xl lg:pt-3">
                Hello ! {userData?.fullName.split(" ")[0]}
              </Text>
              <Text className="text-heading-secondary font-semibold">
                Welcome Back !
              </Text>
            </View>

            <Pressable
              onPress={() => {
                router.push("/(tabs)/search");
              }}
            >
              <View className="p-2 bg-white rounded-full xl:bg-red">
                <Ionicons name="search" size={24} color="black" />
              </View>
            </Pressable>
          </View>

          <TouchableOpacity
            className="w-full flex-grow flex flex-col justify-center items-center "
            onPress={() => {
              router.push("/(tabs)/Account_Details");
            }}
          >
            <Dashboard />
          </TouchableOpacity>
        </View>

        <View className="w-full h-[70%] lg:h-[65%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start pb-32">
          <View className="w-full h-full  flex flex-col items-center justify-between pt-8">
            {/* <OptionSelector title='Daily Expenses' options={['1','2']}/> */}
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/categories");
              }}
              className="h-[16%] w-5/6"
            >
              <View className="h-full w-full">
                <SavingDashboard />
              </View>
            </TouchableOpacity>
            <View className="h-[58%]  w-[87%] ">
              <CombinedList />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default home;
