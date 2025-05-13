import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useAppData } from "@/context/AppContext";
import { Timestamp } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { ExpenseTypes } from "@/assets/constants";

// 1. Define the prop type
type CombinedListProps = {
  filterType?: "income" | "expense" | "all";
};

const CombinedList: React.FC<CombinedListProps> = ({ filterType = "all" }) => {
  const { IncomeData, ExpenseData } = useAppData();

  function getExpenseIcon(category: string): string {
    const match = ExpenseTypes.find((item) => item.label === category);
    return match ? match.icon : "help-circle-outline"; // fallback icon
  }

  function formatTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate(); // Convert to JS Date

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

  // Add a type property to each item for rendering
  const incomeWithType = (IncomeData ?? []).map((item) => ({
    ...item,
    type: "income" as const,
  }));
  const expenseWithType = (ExpenseData ?? []).map((item) => ({
    ...item,
    type: "expense" as const,
  }));

  // Combine and sort by Date (descending)
  const combined = [...incomeWithType, ...expenseWithType].sort((a, b) => {
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

  // Filter based on prop
  const filtered = combined.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <ScrollView>
      {filtered.map((item, idx) => (
        <View
          key={idx}
          className={`rounded-xl mb-2 p-4 flex flex-row justify-between items-center`}
        >
          <View className="flex flex-row gap-5 items-center border-r-2 border-primary pr-2 w-[55%] overflow-hidden ">
            <View className="p-4 rounded-[25%] bg-button-light">
              {item.type === "income" ? (
                <Ionicons name="cash-outline" size={40} color="white" />
              ) : (
                <Ionicons
                  name={getExpenseIcon(item.Category) as any}
                  size={40}
                  color="white"
                />
              )}
            </View>

            <View>
              <Text className="text-xl font-semibold">
                {item.type === "income" ? item.Title : item.Category}
              </Text>
              <Text className="font-semibold text-button-dark">
                {formatTimestamp(item.Created_At)}
              </Text>
            </View>
          </View>
          <View className="flex flex-row h-full items-center w-[45%]">
            <View className="w-3/6 items-center justify-center">
              <Text>{item.type === "expense" ? item.Title : item.Label}</Text>
            </View>

            <View className="w-3/6 border-l-2 h-full border-primary flex flex-row items-center justify-end">
              <Text
                className={`text-xl ${
                  item.type === "income" ? "text-Txt" : "text-button-dark"
                }`}
              >
                {item.type === "income" ? "" : "-"}
                {" ₹ "}
                {item.Amount}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CombinedList;
