import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Timestamp } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { ExpenseTypes } from "@/assets/constants";

// Define the SavingOrExpenseItem type
interface SavingOrExpenseItem {
  Amount: number; // Amount of the expense
  Category: string; // Category of the expense (e.g., "Food")
  Created_At: Timestamp; // Timestamp when the expense is created
  Date: Timestamp; // Date of the expense
  Message: string; // Message related to the expense
  Month: number; // Month of the expense (e.g., 4 for April)
  Title: string; // Title of the expense (e.g., "Vada pav")
  Year: number; // Year of the expense (e.g., 2025)
  userId: string;
  id: string; // User ID of the person associated with the expense
}

type ExpenseListProps = {
  ExpenseData?: SavingOrExpenseItem[];
};

const ExpenseList: React.FC<ExpenseListProps> = ({ ExpenseData = [] }) => {
  function getExpenseIcon(category: string): string {
    const match = ExpenseTypes.find((item) => item.label === category);
    return match ? match.icon : "help-circle-outline"; // fallback icon
  }

  function formatTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const monthNames = [
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
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${hours}:${minutes} - ${month} ${day}`;
  }

  // Sort ExpenseData by Date (descending)
  const sortedExpenses = [...ExpenseData].sort((a, b) => {
    const aTime =
      a.Date instanceof Timestamp
        ? a.Date.toMillis()
        : new Date(a.Date).getTime();
    const bTime =
      b.Date instanceof Timestamp
        ? b.Date.toMillis()
        : new Date(b.Date).getTime();
    return bTime - aTime; // Most recent first
  });

  return (
    <ScrollView>
      {sortedExpenses.map((item, idx) => (
        <View
          key={idx}
          className={`rounded-xl mb-2 p-4 flex flex-row justify-between items-center`}
        >
          <View className="flex flex-row gap-5 items-center justify-between ">
            <View className="p-4 rounded-[25%] bg-button-light">
              <Ionicons
                name={getExpenseIcon(item.Category) as any}
                size={40}
                color="white"
              />
            </View>

            <View>
              <Text className="text-xl font-semibold">{item.Title}</Text>
              <Text className="font-semibold text-button-dark">
                {formatTimestamp(item.Created_At)}
              </Text>
            </View>
          </View>

          <View className=" h-full flex flex-row items-center justify-end">
            <Text className="text-xl text-button-dark">- ₹ {item.Amount}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ExpenseList;
