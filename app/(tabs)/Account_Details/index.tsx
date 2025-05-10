import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import CustomHalfPieChart from "@/components/ringPieChart";
import Chart from "@/components/chart";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { Colors } from "@/assets/colors";

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

const Account_Details = () => {
  const router = useRouter();
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [expenseData, setExpenseData] = useState<BudgetData | null>(null);

  // Fetch budget data
  const getBudgetData = async () => {
    if (!auth.currentUser) return null;
    const docRef = doc(db, "budget", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setBudgetData(data);
      return data;
    } else {
      return null;
    }
  };

  // Fetch expense data
  const getExpenseData = async () => {
    if (!auth.currentUser) return null;
    const now = new Date();
    const docid = `${auth.currentUser.uid}${now.getMonth()}${now.getFullYear()}`;
    const docRef = doc(db, "monthly_expense", docid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setExpenseData(data);
      return data;
    } else {
      return null;
    }
  };

  // Convert budget data for pie chart
  function BudgetDataToPieChart(data: BudgetData): TransformedEntry[] {
    const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
    return Object.entries(data)
      .filter(
        ([key, value]) =>
          !ignoreFields.includes(key) &&
          typeof value === "string" &&
          value.trim() !== ""
      )
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: parseInt(value as string),
      }));
  }

  // Combine budget and expense data for chart
  function BudgetDataToChart(
    budget: BudgetData,
    expense: BudgetData | null
  ): ChartEntry[] {
    const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
    // Normalize expense keys to lowercase for easy lookup
    const normalizedExpense: Record<string, number> = {};
    if (expense) {
      Object.entries(expense).forEach(([ekey, evalue]) => {
        if (typeof evalue === "number") {
          normalizedExpense[ekey.toLowerCase()] = evalue;
        } else if (typeof evalue === "string" && !isNaN(Number(evalue))) {
          normalizedExpense[ekey.toLowerCase()] = Number(evalue);
        }
      });
    }

    return Object.entries(budget)
      .filter(
        ([key, value]) =>
          !ignoreFields.includes(key) &&
          typeof value === "string" &&
          value.trim() !== ""
      )
      .map(([key, value]) => {
        const lowerKey = key.toLowerCase();
        return {
          column: key.charAt(0).toUpperCase() + key.slice(1),
          income: parseInt(value as string),
          expense: normalizedExpense[lowerKey] ?? 0,
        };
      });
  }

  // Fetch data on screen focus
  useFocusEffect(
    useCallback(() => {
      getBudgetData();
      getExpenseData();
      return () => {};
    }, [])
  );

  const hasBudget = budgetData && Object.keys(budgetData).length > 0;
  const hasExpense = expenseData && Object.keys(expenseData).length > 0;

  return (
    <View className="h-full w-full bg-primary ">
      <View className="w-full h-[20%] flex flex-col items-center justify-start">
        <View className="w-full h-full items-center justify-start">
          <Dashboard />
        </View>
      </View>

      <View className="w-full h-[80%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start gap-0">
        <View className="h-full w-full pt-12 pb-32 px-6 ">
          <ScrollView className="mb-32">
            <View className="bg-button-light p-4 rounded-[4rem] items-center">
              {hasBudget && (
                <CustomHalfPieChart
                  data={BudgetDataToPieChart(budgetData!)}
                  backgroundColor={Colors.button.light}
                />
              )}
              <View className="flex flex-row w-5/6 gap-4 pt-2">
                <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold">
                  Budget Set By User
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/(tabs)/Account_Details/changebudget");
                  }}
                >
                  <Text className="bg-primary p-2 rounded-full text-center flex-1 font-semibold px-4">
                    Modify Budget
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-4">
              {hasBudget && hasExpense && (
                <Chart
                  data={BudgetDataToChart(budgetData!, expenseData!)}
                  maxHeight={120}
                />
              )}
            </View>
            <TouchableOpacity
              className="w-full p-4 bg-primary rounded-full "
              onPress={() => {
                router.push("/(tabs)/Account_Details/addincome");
              }}
            >
              <Text className="text-center font-semibold text-xl">
                Add Income
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Account_Details;
