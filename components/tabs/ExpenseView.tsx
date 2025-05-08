import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useAppData } from "@/context/AppContext";
import { Timestamp } from "firebase/firestore";

const CombinedList = () => {
  const { IncomeData, ExpenseData } = useAppData();

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
    // If your Date is a Firestore Timestamp, convert to milliseconds
    const aTime =
      a.Date instanceof Timestamp ? a.Date.toMillis() : new Date(a.Date).getTime();
    const bTime =
      b.Date instanceof Timestamp ? b.Date.toMillis() : new Date(b.Date).getTime();
    return bTime - aTime; // Most recent first
  });

  return (
    <ScrollView>
      {combined.map((item, idx) => (
        <View
          key={idx}
          style={{
            backgroundColor: item.type === "income" ? "#DFF6DD" : "#FFE5E5",
            margin: 8,
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {item.type === "income" ? "Income" : "Expense"}: {item.Title}
          </Text>
          <Text>Amount: ₹{item.Amount}</Text>
          <Text>
            Date:{" "}
            {item.Date instanceof Timestamp
              ? item.Date.toDate().toLocaleDateString()
              : new Date(item.Date).toLocaleDateString()}
          </Text>
          <Text>
            {item.type === "income"
              ? `Label: ${item.Label}`
              : `Category: ${item.Category}`}
          </Text>
          {item.Message ? <Text>Note: {item.Message}</Text> : null}
        </View>
      ))}
    </ScrollView>
  );
};

export default CombinedList;
