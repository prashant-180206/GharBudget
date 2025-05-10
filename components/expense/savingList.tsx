import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Timestamp } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { savingsCategories } from "@/assets/constants";
// import { SavingsTypes } from "@/assets/constants"; // <-- You should define this similar to ExpenseTypes

// Define the SavingOrExpenseItem type
interface SavingOrExpenseItem {
  Amount: number;
  Category: string;
  Created_At: Timestamp;
  Date: Timestamp;
  Message: string;
  Month: number;
  Title: string;
  Year: number;
  userId: string;
  id: string;
}

type SavingListProps = {
  SavingData?: SavingOrExpenseItem[];
};

const SavingList: React.FC<SavingListProps> = ({ SavingData = [] }) => {
  function getSavingIcon(category: string): string {
    // You should have a SavingsTypes array similar to ExpenseTypes
    const match = savingsCategories.find((item) => item.label === category);
    return match ? match.icon : "cash-outline"; // fallback icon
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

  // Sort SavingData by Date (descending)
  const sortedSavings = [...SavingData].sort((a, b) => {
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
      {sortedSavings.map((item, idx) => (
        <View
          key={idx}
          className="rounded-xl mb-2 p-4 flex flex-row justify-between items-center"
        >
          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="p-4 rounded-[25%] bg-green-200">
              <Ionicons
                name={getSavingIcon(item.Category) as any}
                size={40}
                color="green"
              />
            </View>
            <View>
              <Text className="text-xl font-semibold">{item.Title}</Text>
              <Text className="font-semibold text-green-800">
                {formatTimestamp(item.Created_At)}
              </Text>
            </View>
          </View>
          <View className="h-full flex flex-row items-center justify-end">
            <Text className="text-xl text-green-800">+ ₹ {item.Amount}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default SavingList;
