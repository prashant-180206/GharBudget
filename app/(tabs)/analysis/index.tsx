import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import CustomHalfPieChart from "@/components/ringPieChart";
import Chart from "@/components/chart";
import { Colors } from "@/assets/colors";
import { useAnalysis } from "@/context/AnalysisContext";
import CategoryProgressLoaders from "@/components/analysis/CategoryProgressLoaders";
import SavingsCategoryLoaders from "@/components/analysis/SavingProgressLoader";
import SavingsChart from "@/components/analysis/savingsChart";
import { useSavings } from "@/context/SavingContext";

type MonthlyExpense = {
  [category: string]: number;
};

type BudgetData = {
  [key: string]: string | number | { seconds: number; nanoseconds: number };
};

type ChartEntry = {
  column: string;
  income: number;
  expense: number;
};

type TransformedEntry = {
  name: string;
  value: number;
};

function SavingsDataToPieChart(
  goal: Record<string, number> | null,
  savingexpense: Record<string, number> | null
): TransformedEntry[] {
  // Use empty object if null
  const goalObj = goal ?? {};
  const savingexpenseObj = savingexpense ?? {};

  const keys = new Set([
    ...Object.keys(goalObj),
    ...Object.keys(savingexpenseObj),
  ]);
  const result: TransformedEntry[] = [];
  keys.forEach((key) => {
    const value = (goalObj[key] || 0) - (savingexpenseObj[key] || 0);
    if (value > 0) {
      result.push({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      });
    }
  });
  return result;
}

// Utility to get a number from string | number | object
function parseBudgetValue(
  val: string | number | { seconds: number; nanoseconds: number }
): number {
  if (typeof val === "number") return val;
  if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
  return 0;
}

// Pie chart for expense data
function ExpenseDataToPieChart(data: MonthlyExpense): TransformedEntry[] {
  const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
  return Object.entries(data)
    .filter(
      ([key, value]) =>
        !ignoreFields.includes(key) && typeof value === "number" && value > 0
    )
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
}

function BudgetDataToPieChart(data: BudgetData): TransformedEntry[] {
  const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
  return Object.entries(data)
    .filter(
      ([key, value]) =>
        !ignoreFields.includes(key) &&
        (typeof value === "string" || typeof value === "number") &&
        !isNaN(Number(value)) &&
        Number(value) > 0
    )
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: typeof value === "number" ? value : Number(value),
    }));
}

// Chart logic remains unchanged
function BudgetDataToChart(
  budget: BudgetData,
  expense: BudgetData | null
): ChartEntry[] {
  const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
  const normalizedExpense: Record<string, number> = {};
  if (expense) {
    Object.entries(expense).forEach(([ekey, evalue]) => {
      normalizedExpense[ekey.toLowerCase()] = parseBudgetValue(evalue);
    });
  }

  return Object.entries(budget)
    .filter(
      ([key, value]) =>
        !ignoreFields.includes(key) &&
        (typeof value === "string" || typeof value === "number") &&
        parseBudgetValue(value) > 0
    )
    .map(([key, value]) => {
      const lowerKey = key.toLowerCase();
      return {
        column: key.charAt(0).toUpperCase() + key.slice(1),
        income: parseBudgetValue(value),
        expense: normalizedExpense[lowerKey] ?? 0,
      };
    });
}

const Analysis = () => {
  const router = useRouter();
  const {
    Budget_Expense: budgetData,
    Monthly_Expense: expenseData,
    loading,
  } = useAnalysis();

  const { goal, savingexpense } = useSavings();

  const [tab, setTab] = useState<"Expense" | "Budget" | "Savings">("Expense");

  const hasBudget = budgetData && Object.keys(budgetData).length > 0;
  const hasExpense = expenseData && Object.keys(expenseData).length > 0;

  // console.log("goal : ", goal, "savingexpense : ", savingexpense);

  return (
    <View className="h-full w-full bg-primary ">
      <View className="w-full h-[20%] flex flex-col items-center justify-start">
        <View className="w-full h-full items-center justify-start">
          <Dashboard />
        </View>
      </View>

      <View className="w-full h-[80%] lg:h-[75%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start gap-0">
        <View className="h-full w-full pt-12 lg:pt-6 pb-32 lg:pb-1 px-6 lg:ml-1 ">
          <View className="bg-col_bg-dark p-2 mb-4 rounded-3xl lg:w-[90vw] lg:h-[4vw] flex flex-row justify-between">
            <TouchableOpacity
              className={`flex-1  ${
                tab == "Expense" ? "bg-primary-light" : "bg-col_bg-dark"
              } rounded-full p-4 `}
              onPress={() => setTab("Expense")}
            >
              <Text className="text-center">Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1  ${
                tab == "Budget" ? "bg-primary-light" : "bg-col_bg-dark"
              } rounded-full p-4 `}
              onPress={() => setTab("Budget")}
            >
              <Text className="text-center">Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1  ${
                tab == "Savings" ? "bg-primary-light" : "bg-col_bg-dark"
              } rounded-full p-4 `}
              onPress={() => setTab("Savings")}
            >
              <Text className="text-center">Savings</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="mb-32">
            {loading ? (
              <View className="items-center justify-center py-12">
                <ActivityIndicator
                  size="large"
                  color={Colors.primary.DEFAULT}
                />
                <Text>Loading data...</Text>
              </View>
            ) : (
              <>
                {tab === "Expense" && hasExpense && (
                  <View className="bg-button-light p-4 rounded-[4rem] items-center mb-4">
                    <CustomHalfPieChart
                      data={ExpenseDataToPieChart(expenseData!)}
                      backgroundColor={Colors.button.light}
                    />
                    <View className="flex flex-row w-5/6 gap-4 pt-2">
                      <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold">
                        Expenses This Month
                      </Text>
                      <TouchableOpacity
                        onPress={() => router.push("/(tabs)/categories")}
                      >
                        <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold px-4">
                          Add Expense
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {tab === "Savings" && hasExpense && (
                  <View className="bg-button-light p-4 rounded-[4rem] items-center mb-4">
                    <CustomHalfPieChart
                      data={SavingsDataToPieChart(goal, savingexpense)}
                      backgroundColor={Colors.button.light}
                    />
                    <View className="flex flex-row w-5/6 gap-4 pt-2">
                      <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold">
                        Total Savings
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          router.push("/(tabs)/categories/Savings")
                        }
                      >
                        <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold px-4">
                          Add Savings
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {tab === "Budget" && hasBudget && (
                  <View className="w-full items-center gap-2 p-4 bg-button-light rounded-[4rem] mb-4">
                    <CustomHalfPieChart
                      data={BudgetDataToPieChart(budgetData!)}
                      backgroundColor={Colors.button.light}
                    />
                    <View className="flex flex-row w-5/6 gap-4 pt-2">
                      <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold">
                        Budget This Month
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          router.push("/(tabs)/Account_Details/changebudget")
                        }
                      >
                        <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold px-4">
                          Modify Budget
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {hasBudget &&
                  hasExpense &&
                  (tab === "Budget" || tab === "Expense") && (
                    <View className="mt-4">
                      <Chart
                        data={BudgetDataToChart(budgetData!, expenseData!)}
                        maxHeight={120}
                        col1={"Budget"}
                        col2={"Expense"}
                      />
                    </View>
                  )}

                {tab === "Savings" && <SavingsChart />}

                {(tab === "Budget" || tab === "Expense") && (
                  <CategoryProgressLoaders />
                )}
                {tab === "Savings" && <SavingsCategoryLoaders />}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Analysis;
