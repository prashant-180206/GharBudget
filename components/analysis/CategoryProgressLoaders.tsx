import React from "react";
import { View, Text } from "react-native";
import { useAnalysis } from "@/context/AnalysisContext";
import { ExpenseCategories, ExpenseTypes } from "@/assets/constants";
import CircularIconLoader from "../categories/CircularIconLoader";
import { Colors } from "@/assets/colors";

// Utility to get the correct key from an object (case-insensitive)
function getCategoryValue(obj: any, key: string): number {
  if (!obj) return 0;
  // Try exact match first
  if (key in obj) {
    const val = obj[key];
    if (typeof val === "number") return val;
    if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
    return 0;
  }
  // Try lowercase match
  const lowerKey = key.toLowerCase();
  if (lowerKey in obj) {
    const val = obj[lowerKey];
    if (typeof val === "number") return val;
    if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
    return 0;
  }
  // Try capitalized match
  const capKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  if (capKey in obj) {
    const val = obj[capKey];
    if (typeof val === "number") return val;
    if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
    return 0;
  }
  return 0;
}

function getCategoryProgress(expense: number, budget: number) {
  if (!budget || budget <= 0) return 0;
  return Math.min((expense / budget) * 100, 100);
}

const CategoryProgressLoaders = () => {
  const { Monthly_Expense, Budget_Expense, loading } = useAnalysis();

  if (loading) return <Text>Loading...</Text>;

  return (
    <View className="flex-row flex-wrap justify-center">
      {ExpenseCategories.map((cat) => {
        // Robustly get values regardless of key case
        const expense = getCategoryValue(Monthly_Expense, cat.value);
        const budget = getCategoryValue(Budget_Expense, cat.value);

        // Don't render if neither budget nor expense is set
        if (!budget && !expense) return null;

        const progress = getCategoryProgress(expense, budget);
        // console.log(cat.label);

        return (
          <View key={cat.value} className="m-2 w-[40%] items-center">
            <CircularIconLoader
              progress={progress}
              title={cat.label}
              //
              color={Colors.button.dark}
              backgroundColor={Colors.button.light}
              inactiveColor={Colors.col_bg.DEFAULT}
              icon={
                ExpenseTypes.filter((doc) => doc.label == cat.label)[0].icon
              }
              iconColor={Colors.col_bg.DEFAULT}
              iconSize={45}
            />
            <Text className="mt-1 text-xs text-center">
              {expense} / {budget}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default CategoryProgressLoaders;
