import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import LoadingBar from "../loadingBar";
import { Ionicons } from "@expo/vector-icons";
import { useAppData } from "@/context/AppContext";

const Dashboard = ({
  balanceLabel = "Total Balance",
  expenseLabel = "Total Expense",
  loadingBarBg = "black",
  loadingBarFill = "#fff",
}) => {
  const { totalBalance, totalExpense, loading } = useAppData();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  var progress = (totalExpense / totalBalance) * 100;
  if (progress > 100) {
    progress = 100;
  }

  return (
    <View className="w-5/6 flex-grow flex flex-col justify-center items-center">
      <View className="w-full flex flex-row items-center justify-between p-4">
        {/* Balance */}
        <View className="w-3/6 border-r-2 border-col_bg pr-4 items-start">
          <View className="flex flex-row gap-2 items-center justify-start">
            <Ionicons name="cash-outline" size={15} />
            <Text className="font-semibold text-Txt-secondary">
              {balanceLabel}
            </Text>
          </View>
          <Text className="text-3xl mt-1 text-Txt-light font-bold">
            ₹{totalBalance.toLocaleString()}
          </Text>
        </View>
        {/* Expense */}
        <View className="w-3/6 pl-4 items-end">
          <View className="flex flex-row gap-2 items-center justify-start">
            <Ionicons name="card-outline" size={15} />
            <Text className="font-semibold text-Txt-secondary">
              {expenseLabel}
            </Text>
          </View>
          <Text className="text-3xl mt-1 text-button-dark font-bold">
            - ₹{totalExpense.toLocaleString()}
          </Text>
        </View>
      </View>

      <LoadingBar
        progress={progress}
        backgroundColor={loadingBarBg}
        fillColor={loadingBarFill}
        startText={`${progress.toFixed(1)} %`}
      />

      <View className="flex flex-row items-center justify-start w-full px-4 mt-2">
        <Ionicons name="checkmark-circle-sharp" size={15} className="mr-2" />
        <Text className="font-semibold text-Txt-secondary">
          {`${progress.toFixed(1)} %`} of Your Expenses , Looks Good
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
