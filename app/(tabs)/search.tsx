import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Alert } from "react-native";
import { Colors } from "@/assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "@/components/tabs/Drop_down";
import { auth, db } from "@/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { MonthlyExpense } from "@/context/AnalysisContext";
import CustomHalfPieChart from "@/components/ringPieChart";
import { useRouter } from "expo-router";
import Chart from "@/components/chart";
// import Dropdown from "@/components/tabs/Drop_down";

type ExpenseData = {
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
function parseExpenseValue(
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

// Chart logic remains unchanged
function ExpenseDataToChart(expense: ExpenseData | null): ChartEntry[] {
  const ignoreFields = ["Created_At", "Updated_At", "user_Id"];

  if (!expense) return [];

  return Object.entries(expense)
    .filter(
      ([key, value]) =>
        !ignoreFields.includes(key) &&
        (typeof value === "string" || typeof value === "number") &&
        parseExpenseValue(value) > 0
    )
    .map(([key, value]) => ({
      column: key.charAt(0).toUpperCase() + key.slice(1),
      income: 0,
      expense: parseExpenseValue(value),
    }));
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) =>
  (2024 + i).toString()
);

const SearchScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [monthlyExpense, setmonthlyExpense] = useState<MonthlyExpense | null>(
    null
  );
  const router = useRouter();

  const fetchMonthlyExpense = async () => {
    try {
      if (selectedMonth === "Select Month" || selectedYear === "Select Year") {
        Alert.alert("Please select both month and year");
        return;
      }

      const docId = `${auth.currentUser?.uid}${months.indexOf(
        selectedMonth
      )}${selectedYear}`;
      const expensedocref = doc(db, "monthly_expense", docId);
      const docSnap = await getDoc(expensedocref);
      const data = docSnap.exists() ? (docSnap.data() as MonthlyExpense) : null;
      setmonthlyExpense(data);
    } catch (error) {
      setmonthlyExpense(null);
      Alert.alert("Error", (error as Error).message);
    } finally {
    }
  };

  return (
    <>
      <View className="bg-primary flex-1">
        <View className=" items-center justify-center">
          <View className="w-full my-4 flex-row justify-between gap-2 px-6 lg:w-[50vw]">
            <View className="flex-row flex-auto bg-col_bg-dark items-center rounded-full">
              <Dropdown
                label="Month"
                options={months}
                selected={selectedMonth}
                onSelect={setSelectedMonth}
              />
              <Text>-</Text>
              <Dropdown
                label="Year"
                options={years}
                selected={selectedYear}
                onSelect={setSelectedYear}
              />
            </View>

            <TouchableOpacity
              className="flex-row items-center bg-button-light px-4 rounded-full border-1 border-button-dark p-2"
              onPress={() => {
                fetchMonthlyExpense();
              }}
            >
              <Ionicons name="search" size={24} color="black" />
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-[5] bg-col_bg rounded-t-[80px] items-center lg:w-[50vw] lg:ml-[25vw]">
          <View className="w-5/6 mt-10">
            <Text className="p-2 text-center bg-button-light text-lg font-semibold rounded-full mb-10">
              Expense : {`${selectedMonth}  -  ${selectedYear}`}
            </Text>
            {monthlyExpense ? (
              <>
                <View className="bg-button-light p-4 rounded-[4rem] items-center mb-4">
                  <CustomHalfPieChart
                    data={ExpenseDataToPieChart(monthlyExpense!)}
                    backgroundColor={Colors.button.light}
                  />

                  <View className="flex flex-row w-5/6 gap-4 pt-2">
                    <Text className="bg-primary-light-100 p-2 rounded-full text-center flex-1 font-semibold">
                      Expenses in {`${selectedMonth} - ${selectedYear}`}
                    </Text>
                  </View>
                </View>

                <View className="mt-4">
                  <Chart
                    data={ExpenseDataToChart(monthlyExpense)}
                    maxHeight={120}
                    col1={"Budget"}
                    col2={"Expense"}
                  />
                </View>
              </>
            ) : (
              <>
                <Text className=" text-center my-10">
                  Search month and Year to See Analysis
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default SearchScreen;
