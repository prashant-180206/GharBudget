import React from "react";
import { View, Text } from "react-native";
import LoadingBar from "../loadingBar";
import { Ionicons } from "@expo/vector-icons";

interface DashboardProps {
  totalBalance: number;
  totalExpense: number;
  balanceLabel?: string;
  expenseLabel?: string;
  loadingBarBg?: string;
  loadingBarFill?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalBalance,
  totalExpense,
  balanceLabel = "Total Balance",
  expenseLabel = "Total Expense",
  loadingBarBg = "#e5e7eb",
  loadingBarFill = "#fff",
}) => (
  <View className="w-5/6 flex-grow flex flex-col justify-center items-center p">
    <View className="w-full flex flex-row items-center justify-between p-4">
      {/* Balance Card */}
      <View className="w-3/6 border-r-2 border-col_bg pr-4 items-start">
        <View className="flex flex-row gap-2 items-center justify-start">
          <Ionicons name="cash-outline" size={15} />
          <Text className="font-semibold text-Txt-secondary">
            {balanceLabel}
          </Text>
        </View>
        <Text className="text-3xl mt-1 text-Txt-light font-bold">
          ₹{totalBalance.toLocaleString()}.00
        </Text>
      </View>
      {/* Expense Card */}
      <View className="w-3/6 pl-4 items-end">
        <View className="flex flex-row gap-2 items-center justify-start">
          <Ionicons name="card-outline" size={15} />
          <Text className="font-semibold text-Txt-secondary">
            {expenseLabel}
          </Text>
        </View>
        <Text className="text-3xl mt-1 text-button-dark font-bold">
          - ₹{totalExpense.toLocaleString()}.00
        </Text>
      </View>
    </View>
    <LoadingBar
      progress={(totalExpense / totalBalance) * 100}
      backgroundColor={loadingBarBg}
      fillColor={loadingBarFill}
      startText={`${((totalExpense / totalBalance) * 100).toFixed(1)} %`}
    />
    {/* Example progress text */}
    <View className="flex flex-row items-center justify-start w-full px-4 mt-2">
      <Ionicons name="checkmark-circle-sharp" size={15} className="mr-2" />
      <Text className="font-semibold text-Txt-secondary">
        {`${((totalExpense / totalBalance) * 100).toFixed(1)} %`} of Your
        Expenses , Looks Good
      </Text>
    </View>
  </View>
);

export default Dashboard;
