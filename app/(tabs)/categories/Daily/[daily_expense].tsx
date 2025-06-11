import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { useDailyExpense } from "@/context/DailyExpenseContext";
import { DailyExpense } from "@/assets/types";

// --- Logic separated into functions ---
const updateDailyExpense = async (
  dailyExpenseData: DailyExpense | null,
  category: string,
  amount: number,
  refresh: () => Promise<void>
) => {
  if (!dailyExpenseData || !auth.currentUser?.uid) return;

  await setDoc(doc(db, "Daily_Expense", auth.currentUser.uid), {
    categories: [
      ...dailyExpenseData.categories.filter((val) => !val[category]),
      { [category]: amount },
    ],
    Taken: [...dailyExpenseData.Taken],
  } as DailyExpense);

  await refresh();
};

const deleteCategory = async (
  dailyExpenseData: DailyExpense | null,
  category: string,
  refresh: () => Promise<void>,
  onSuccess?: () => void
) => {
  if (!dailyExpenseData || !auth.currentUser?.uid) return;

  await setDoc(doc(db, "Daily_Expense", auth.currentUser.uid), {
    categories: dailyExpenseData.categories.filter((val) => !val[category]),
    Taken: dailyExpenseData.Taken.map((entry) => ({
      date: entry.date,
      categories: entry.categories.filter((c) => c !== category),
    })),
  } as DailyExpense);

  await refresh();
  onSuccess?.();
};

// --- UI Component ---
const Daily_Expense_Screen = () => {
  const { daily_expense } = useLocalSearchParams<{ daily_expense: string }>();
  const router = useRouter();
  const { dailyExpenseData, refresh } = useDailyExpense();

  const [modalVisible, setModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState("");

  const handleChangeExpense = async () => {
    const value = parseFloat(newExpense);
    if (isNaN(value) || value <= 0) {
      Alert.alert("Invalid input", "Please enter a valid number.");
      return;
    }

    await updateDailyExpense(dailyExpenseData, daily_expense, value, refresh);
    setModalVisible(false);
    setNewExpense("");
  };

  return (
    <>
      <View className="flex-1 bg-primary">
        <View className="bg-col_bg rounded-t-[80px] flex-1 pt-10 pb-32 items-center">
          <View className="flex-1 w-5/6">
            <View className="bg-button-light p-3 rounded-full">
              <Text className="text-xl font-semibold text-center">
                {`Expense : ${daily_expense}`}
              </Text>
            </View>

            <View className="flex-row justify-between gap-2 items-center">
              <Text className="text-lg font font-semibold w-3/6 p-2 my-2 bg-primary-light-100 rounded-full text-center">{`Daily Expense : 50`}</Text>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex-auto bg-primary-light p-2 rounded-full"
              >
                <Text className="text-Txt font-semibold text-lg text-center">
                  Change Expense
                </Text>
              </TouchableOpacity>
            </View>

            <View className="h-1/2 ">
              <ScrollView className=" ">
                <View className=" items-center pt-4">
                  {dailyExpenseData &&
                    dailyExpenseData.Taken.map((val, i) => {
                      return (
                        <View
                          key={val.date}
                          className="flex-row justify-between p-2 px-4 bg-col_bg-dark mb-2 rounded-full w-5/6"
                        >
                          <Text className="text-lg font-semibold w-1/2 text-center">{`Date : ${val.date}`}</Text>
                          <Text className="text-lg pr-4">{`${
                            val.categories.includes(daily_expense) ? "✅" : "❌"
                          }`}</Text>
                        </View>
                      );
                    })}
                </View>
              </ScrollView>
            </View>

            <View className="flex-row justify-between mt-4 gap-2">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/categories/Daily")}
                className="bg-primary-light-100 p-2 rounded-full w-1/2"
              >
                <Text className="text-Txt text-lg font-semibold text-center">
                  Reset Month
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await deleteCategory(
                    dailyExpenseData,
                    daily_expense,
                    refresh,
                    () => router.push("/(tabs)/categories/Daily")
                  );
                }}
                className="bg-primary-light rounded-full p-2 flex-auto"
              >
                <Text className="text-Txt text-lg font-semibold text-center">
                  Delete Category
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Modal for changing daily expense */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-6 w-4/5">
            <Text className="text-lg font-bold mb-4">Set New Expense</Text>
            <TextInput
              placeholder="Enter new amount"
              value={newExpense}
              onChangeText={setNewExpense}
              keyboardType="numeric"
              className="border p-2 rounded mb-4"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity onPress={handleChangeExpense}>
                <Text className="text-green-600">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-600">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Daily_Expense_Screen;
