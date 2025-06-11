import React from "react";
import { View, Text } from "react-native";
import { savingsCategories, savingsCategoryOptions } from "@/assets/constants";
import CircularIconLoader from "../categories/CircularIconLoader";
import { useSavings } from "@/context/SavingContext";

function getCategoryProgress(saving: number, goal: number) {
  if (!goal || goal <= 0) return 0;
  return Math.min((saving / goal) * 100, 100);
}

const SavingsCategoryLoaders = () => {
  const { savingexpense, goal, loading } = useSavings();

  if (loading) return <Text>Loading...</Text>;
  //   console.log(savingexpense, goal);

  return (
    <View className="flex-row flex-wrap justify-center p-4 ">
      {savingsCategoryOptions.map((cat) => {
        const saved = savingexpense?.[cat.label] ?? 0;
        const goalAmount = goal?.[cat.label] ?? 0;
        if (!goalAmount && !saved) return null;

        const progress = getCategoryProgress(saved, goalAmount);

        return (
          <View key={cat.value} className="m-2 w-[40%] items-center">
            <CircularIconLoader
              progress={progress}
              title={cat.label}
              icon={
                savingsCategories.filter((doc) => doc.label === cat.label)[0]
                  .icon
              }
            />
            <Text className="mt-1 text-xs text-center">
              {saved} / {goalAmount}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default SavingsCategoryLoaders;
