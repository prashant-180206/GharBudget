import React from "react";
import { View, Text } from "react-native";
import LoadingBar from "../loadingBar";
 // Adjust the import path as needed

interface DashboardProps {
  totalBalance: number | string;
  totalExpense: number | string;
  progress: number; // 0-100
  balanceLabel?: string;
  expenseLabel?: string;
  progressText?: string;
  loadingBarBg?: string;
  loadingBarFill?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalBalance,
  totalExpense,
  progress,
  balanceLabel = "Total Balance",
  expenseLabel = "Total Expense",
  progressText = "",
  loadingBarBg = "#e5e7eb", // Default: Tailwind gray-200
  loadingBarFill = "#fff",
}) => (
  <View className="w-full flex-grow flex flex-col justify-center items-center p-4">
    <View className="w-full flex flex-row items-center justify-between p-4">
      {/* Balance Card */}
      <View className="w-3/6 border-r-2 border-col_bg pr-4 items-start">
        <Text className="text-xs text-gray-500">{balanceLabel}</Text>
        <Text className="text-xl font-bold">{totalBalance}</Text>
      </View>
      {/* Expense Card */}
      <View className="w-3/6 pl-4 items-end">
        <Text className="text-xs text-gray-500">{expenseLabel}</Text>
        <Text className="text-xl font-bold">{totalExpense}</Text>
      </View>
    </View>
    <LoadingBar
      progress={progress}
      backgroundColor={loadingBarBg}
      fillColor={loadingBarFill}
      startText=""
    />
    {progressText ? <Text>{progressText}</Text> : null}
  </View>
);

export default Dashboard;
