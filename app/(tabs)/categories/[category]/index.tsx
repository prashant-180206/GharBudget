import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import { auth, db } from "@/FirebaseConfig";
import {
  collection,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import ExpenseList from "@/components/expense/expenseList";

interface ExpenseData {
  Amount: number; // Amount of the expense
  Category: string; // Category of the expense (e.g., "Food")
  Created_At: Timestamp; // Timestamp when the expense is created
  Date: Timestamp; // Date of the expense
  Message: string; // Message related to the expense
  Month: number; // Month of the expense (e.g., 4 for April)
  Title: string; // Title of the expense (e.g., "Vada pav")
  Year: number; // Year of the expense (e.g., 2025)
  userId: string; // User ID of the person associated with the expense
}

const Category = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [ExpenseData, setExpenseData] = useState<
    (ExpenseData & { id: string })[] | null
  >(null);

  const getCategoryData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      // console.log("Fetching for user:", userId, "category:", category);
      const snapshot = await getDocs(
        query(
          collection(db, "expenses"),
          where("userId", "==", userId),
          where("Category", "==", category),
          limit(15)
        )
      );
      const dataarr: (ExpenseData & { id: string })[] = [];
      snapshot.forEach((expense) => {
        const data = expense.data() as ExpenseData;
        dataarr.push({
          ...data,
          id: expense.id,
        });
      });
      setExpenseData(dataarr);
      // console.log("Expense data array:", dataarr);
    } catch (e) {
      // console.log("Error fetching category data:", e);
      Alert.alert("Error Getting data");
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log("Screen focused. category param:", category);
      getCategoryData();
      return () => {};
    }, [category])
  );

  return (
    <>
      <View className="flex-1 bg-primary">
        {/* Header */}
        <View className="items-center w-full h-[25%] justify-center py-6">
          <Dashboard />
        </View>

        {/* Scrollable Content */}
        <View className="flex-1 w-full h-[80%] bg-col_bg rounded-t-[80px] pt-0 px-4 pb-32">
          <View className=" h-full w-full pt-12 px-6">
            <ScrollView className="">
              <ExpenseList ExpenseData={ExpenseData || []} />
            </ScrollView>
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/(tabs)/categories/${category.toString()}/addexpense`
                )
              }
              className="bg-primary p-3 rounded-full mt-2 mx-auto px-6"
            >
              <Text className="text-Txt text-base font-semibold text-center">
                Add Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Category;
