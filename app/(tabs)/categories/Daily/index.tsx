import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { MutableRefObject, useRef, useState } from "react";
import Dashboard from "@/components/tabs/Dashboard";
import { useRouter } from "expo-router";
import { useDailyExpense } from "@/context/DailyExpenseContext";
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
// import { DailyExpense } from "@/assets/types";
import { Modal } from "react-native";
import Daily_Expense_Option_selector from "@/components/option_selector";

const Daily = () => {
  const router = useRouter();
  const { dailyExpenseData, refresh } = useDailyExpense(); // <-- use context
  const [modalVisible, setModalVisible] = useState(false);
  let total = useRef(0);

  const handleReset = async () => {
    try {
      if (!auth.currentUser?.uid) {
        Alert.alert("User not authenticated");
        return;
      }
      if (!dailyExpenseData) {
        return null;
      }
      const userId = auth.currentUser?.uid || "";
      const now = new Date();
      const docId = `${userId}${now.getMonth()}${now.getFullYear()}`;
      const expenseref = doc(db, "monthly_expense", docId);

      dailyExpenseData.categories
        .map((val, i) => {
          const [cat, num] = Object.entries(val)[0];
          // console.log(cat, num);
          const count = dailyExpenseData.Taken.filter((tkn) => {
            return tkn.categories.includes(cat);
          }).length;
          total.current += num * count;

          return { category: cat, expense: num * count };
        })
        .forEach(async (val, i) => {
          // console.log(val.category, val.expense);
          await addDoc(collection(db, "expenses"), {
            userId: userId,
            Title: val.category,
            Created_At: now,
            Month: now.getMonth(),
            Year: now.getFullYear(),
            Category: "Daily",
            Amount: val.expense,
            Date: new Date(),
            Message: "Daily Expnse Added on Reset",
          });
        });

      await setDoc(
        expenseref,
        {
          Daily: increment(total.current),
        },
        { merge: true }
      );

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        Expense_this_month: increment(total.current),
      });

      await setDoc(
        doc(db, "Daily_Expense", auth.currentUser.uid),
        {
          categories: dailyExpenseData.categories || [],
          Taken: [...dailyExpenseData.Taken],
        },
        { merge: true } // Ensures only `Taken` is reset, not overwriting entire doc
      );

      // Optionally refresh context data
      await refresh?.();

      setModalVisible(false);
      Alert.alert("Success", "Month data has been reset.");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <View className="w-full flex-1 flex flex-col items-center justify-start">
        <Dashboard />
      </View>
      <View className="flex-[5] rounded-t-[80px] ">
        <View className=" flex-1 pt-10 mt-10 pb-32 bg-col_bg rounded-t-[80px]  ">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black">
              <View className="w-11/12 bg-white p-6 rounded-2xl items-center">
                <Text className="text-lg font-semibold mb-4 text-black">
                  Are you sure you want to reset all data for this month?
                </Text>
                <View className="flex-row gap-4">
                  <TouchableOpacity
                    className="bg-primary px-4 py-2 rounded-full"
                    onPress={handleReset}
                  >
                    <Text className="text-white font-semibold">Yes, Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-300 px-4 py-2 rounded-full"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-black font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <ScrollView className="flex-1  bg-col_bg w-full h-full rounded-t-[40px]">
            <View className="w-full flex flex-col items-center">
              <View className="w-5/6 flex flex-row gap-2 justify-between mb-10">
                <View className="p-2 flex-auto flex flex-row justify-center items-center bg-button-light rounded-full ">
                  <Text className="text-lg font-semibold text-center h-">
                    Daily Expenses
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-primary w-2/6 p-3 rounded-full "
                  onPress={async () => {
                    setModalVisible(true);
                  }}
                >
                  <Text className="text-lg font-semibold text-center text-black">
                    Reset Month
                  </Text>
                </TouchableOpacity>
              </View>

              {dailyExpenseData &&
                dailyExpenseData.categories.map((val, i) => {
                  const [key, value] = Object.entries(val)[0]; // get the category name and value
                  const num = dailyExpenseData.Taken.filter((val) =>
                    val.categories.includes(key)
                  ).length;
                  return (
                    <TouchableOpacity
                      key={i}
                      className="bg-primary-light-100 p-3 w-5/6 flex flex-row justify-between rounded-full mb-2"
                      onPress={() => {
                        router.push(`/(tabs)/categories/Daily/${key}`);
                      }}
                    >
                      <Text className="px-2 text-lg font-semibold w-4/12">{`${key}`}</Text>
                      <Text className="">{`Daily : ₹${value}`}</Text>
                      <Text
                        className="pr-2 flex-1 text-right"
                        numberOfLines={1}
                      >{`Total : ${num * value}`}</Text>
                    </TouchableOpacity>
                  );
                })}

              <TouchableOpacity
                className="bg-primary w-5/6 p-3 rounded-full mt-4"
                onPress={() =>
                  router.push("/(tabs)/categories/Daily/addcategory")
                }
              >
                <Text className="text-lg font-semibold text-center text-black">
                  + Add Category
                </Text>
              </TouchableOpacity>
              <View className="w-5/6 mt-10">
                <Daily_Expense_Option_selector
                  title="Daily Expense"
                  options={
                    dailyExpenseData
                      ? dailyExpenseData.categories.map(
                          (cat) => Object.keys(cat)[0]
                        )
                      : [""]
                  }
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Daily;
