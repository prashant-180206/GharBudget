import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { useDailyExpense } from "@/context/DailyExpenseContext"; // <-- import context

const Addcategory = () => {
  const router = useRouter();
  const { dailyExpenseData, refresh } = useDailyExpense(); // <-- use context

  const [amount, setAmount] = useState(0);
  const [dailyCat, setDailyCat] = useState("");

  const handleAddCategory = async () => {
    if (!auth.currentUser?.uid) {
      Alert.alert("User not authenticated");
      return;
    }

    if (!dailyCat || amount <= 0) {
      Alert.alert("Please provide valid category name and amount");
      return;
    }

    try {
      const newExpense = {
        categories: [
          ...(dailyExpenseData?.categories || []),
          { [dailyCat]: amount },
        ],
        Taken: [...(dailyExpenseData?.Taken || [])],
      };

      await setDoc(doc(db, "Daily_Expense", auth.currentUser.uid), newExpense);
      await refresh(); // refresh context data

      router.push("/(tabs)/categories/Daily");
    } catch (err) {
      Alert.alert((err as Error).message);
      router.push("/(tabs)/categories/Daily");
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View className="flex-1 bg-primary pt-10">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-col_bg rounded-t-[80px] px-4 pb-32 justify-start pt-10 gap-8 items-center">
              {/* Category Name Input */}
              <View className="w-5/6">
                <Text className="p-2 font-semibold text-Txt-secondary">
                  Category Name
                </Text>
                <TextInput
                  className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                  placeholder="Category Name "
                  value={dailyCat}
                  onChangeText={setDailyCat}
                />
              </View>

              {/* Amount Paid Daily Input */}
              <View className="w-5/6">
                <Text className="p-2 font-semibold text-Txt-secondary">
                  Enter Daily Amount{" "}
                </Text>
                <TextInput
                  className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                  placeholder="Enter Amount Paid Daily"
                  keyboardType="numeric"
                  value={amount == 0 ? "" : `${amount}`}
                  onChangeText={(tex) => setAmount(Number(tex))}
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleAddCategory}
                className="bg-primary p-2 rounded-full text-Txt w-9/12 text-center"
              >
                <Text className="text-xl mx-4 font-semibold text-Txt text-center">
                  + Add Daily Category
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Addcategory;
