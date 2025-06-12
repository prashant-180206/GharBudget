import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import CustomHalfPieChart from "@/components/ringPieChart";
import Chart from "@/components/chart";
import { Colors } from "@/assets/colors";
import { useAnalysis } from "@/context/AnalysisContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";

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

// Utility to get a number from string | number | object
function parseBudgetValue(
  val: string | number | { seconds: number; nanoseconds: number }
): number {
  if (typeof val === "number") return val;
  if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
  // Could handle timestamp objects here if needed
  return 0;
}

const Account_Details = () => {
  const router = useRouter();
  const {
    Budget_Expense: budgetData,
    Monthly_Expense: expenseData,
    loading,
  } = useAnalysis();

  const [ResetModalVisible, setResetModalVisible] = useState(false);

  // Convert budget data for pie chart
  function BudgetDataToPieChart(data: BudgetData): TransformedEntry[] {
    const ignoreFields = ["Created_At", "Updated_At", "user_Id"];
    return Object.entries(data)
      .filter(
        ([key, value]) =>
          !ignoreFields.includes(key) &&
          (typeof value === "string" || typeof value === "number") &&
          parseBudgetValue(value) > 0
      )
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: parseBudgetValue(value),
      }));
  }

  const resetDetails = async () => {
    const docref = doc(db, "users", `${auth.currentUser?.uid}`);
    // const docinfo = await getDoc(docref);
    await setDoc(
      docref,
      {
        Expense_this_month: 0,
        Income_this_month: 0,
      },
      { merge: true }
    );
    // console.log(docinfo.data());
  };

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
            <View className="flex flex-row gap-4 justify-evenly">
              <TouchableOpacity
                className=" p-4 px-4 bg-primary rounded-full mb-6 "
                onPress={() => {
                  router.push("/(tabs)/Account_Details/addincome");
                }}
              >
                <Text
                  className="text-center mx-2 font-semibold truncate"
                  numberOfLines={1}
                >
                  Add Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" p-4 px-4 bg-primary rounded-full mb-6 flex-1"
                onPress={() => {
                  setResetModalVisible(true);
                }}
              >
                <Text
                  className="text-center  mx-2 font-semibold "
                  numberOfLines={1}
                >
                  Reset Balance And Expense
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="p-4 bg-button-light text-Txt rounded-full mb-6 text-center font-semibold text-xl">
              Analyse Budget And Expenses Below
            </Text>

            {loading && (
              <View className="items-center justify-center py-12">
                <ActivityIndicator
                  size="large"
                  color={Colors.primary.DEFAULT}
                />
                <Text>Loading data...</Text>
              </View>
            )}

            {!loading && hasBudget && (
              <View className="bg-button-light p-4 rounded-[4rem] items-center">
                <CustomHalfPieChart
                  data={BudgetDataToPieChart(budgetData!)}
                  backgroundColor={Colors.button.light}
                />
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
            )}

            {!loading && hasBudget && hasExpense && (
              <View className="mt-4">
                <Chart
                  data={BudgetDataToChart(budgetData!, expenseData!)}
                  maxHeight={120}
                  col1="Budget"
                  col2="Expense"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <Modal
        visible={ResetModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-8 w-5/6 items-center">
              <Text className="text-xl font-bold mb-4 w-5/6">
                Reseting Will make your current Expenses and Budget to Zero
              </Text>
              <Text className="text-xl font-semibold mb-6 w-5/6">
                It is recommended to use this feature only when you are starting
                a new month
              </Text>

              <View className="flex flex-row gap-4">
                <TouchableOpacity
                  className="bg-primary px-4 py-2 rounded-full"
                  onPress={() => {
                    resetDetails();
                    setResetModalVisible(false);
                  }}
                >
                  <Text className="text-white font-semibold">
                    Reset Expense And Balance
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-300 px-4 py-2 rounded-full"
                  onPress={() => setResetModalVisible(false)}
                >
                  <Text className="font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Account_Details;
