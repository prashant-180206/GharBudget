import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CircularIconLoader from "./CircularIconLoader";
import { Colors } from "@/assets/colors";
import { useSavings } from "@/context/SavingContext";

interface SavingDashboardProps {
  revenue?: number;
  food?: number;
}

interface SavingsGoal {
  [route: string]: number; // e.g., { "myRoute": 5000 }
}

interface SavingExpense {
  [category: string]: number; // e.g., { "Food": 200, "Transport": 100 }
}

const SavingDashboard: React.FC<SavingDashboardProps> = ({}) => {
  const { goal, savingexpense, loading } = useSavings();

  const [saving, setSaving] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    if (goal) {
      let savcount = 0;
      for (const value of Object.values(goal as SavingsGoal)) {
        savcount += Number(value);
      }
      setSaving(savcount);
    }

    if (savingexpense) {
      let expcount = 0;
      for (const value of Object.values(savingexpense as SavingExpense)) {
        expcount += Number(value);
      }
      setExpense(expcount);
    }
  }, [goal, savingexpense]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />;
  }

  return (
    <View className="flex-row bg-primary rounded-[3rem] lg:rounded-[15px] lg:z-5 lg:px-[8vw] lg:relative lg:bottom-6 lg:pr-[15vw] p-4 lg:py-1 items-center self-center lg:my-1 my-4 pb-5">
      {/* Left section */}
      <View className="w-full flex flex-row justify-evenly ">
        <View className="items-center w-[40%] h-[80%] lg:w-[25%] lg:h-[50%] bord er-r-2 border-col_bg my-4">
          <View className="w-full">
            <CircularIconLoader
              backgroundColor={Colors.primary.DEFAULT}
              icon="car-sport-outline"
              iconSize={50}
              title="Savings"
              iconColor={Colors.Txt.DEFAULT}
              progress={(expense/saving)*100}
            />
          </View>
        </View>
        {/* Divider */}

        {/* Right section */}
        <View className="w-[50%]  flex flex-col lg:flex-row lg:gap-25 justify-evenly my-4">
          <View className="flex-row items-center mb-2 lg:pr-10">
            <Ionicons name="cash-outline" size={40} />
            <View className="ml-2">
              <Text className="text-sm text-gray-900 font-medium">
                Total Savings Goal
              </Text>
              <Text className="text-lg text-gray-900 font-bold">{saving}</Text>
            </View>
          </View>
          <View className="h-[2px] bg-col_bg  my-1" />
          <View className="flex-row items-center ">
            <Ionicons name="trending-up-outline" size={40} color="#222" />
            <View className="ml-2">
              <Text className="text-sm text-gray-900 font-medium">
                Total Saved Amount
              </Text>
              <Text className="text-lg text-button-dark font-bold">
                {expense}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SavingDashboard;
