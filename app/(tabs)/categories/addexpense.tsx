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
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DateInput from "@/components/DateInput";
import DropdownInput from "@/components/dropdown";
import { ExpenseCategories } from "@/assets/constants";
import { Colors } from "@/assets/colors";
import { auth, db } from "@/FirebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const AddExpense = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(""); // Store the date as string initially
  const [error, setError] = useState("");

  const ConvertDate = (dateString: string) => {
    setDate(dateString);
    const convertedDate = new Date(dateString);
    return convertedDate;
  };

  const validateForm = () => {
    if (!selectedCategory) {
      setError("Please select a category.");
      return false;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }
    if (!date) {
      setError("Please select a date.");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  const ExpenseSubmit = async () => {
    if (validateForm()) {
      try {
        const userId = auth.currentUser?.uid;

        const docRef = await addDoc(collection(db, "expenses"), {
          userId: userId,
          Title: expenseTitle,
          Created_At: new Date(),
          Category: selectedCategory,
          Amount: Number(amount),
          Date: ConvertDate(date),
          Message: message,
        });
        router.push("/(tabs)/categories");
      } catch (err) {
        if (err instanceof Error) {
          Alert.alert(err.message);
        } else {
          Alert.alert("An unexpected error occurred.");
        }

        router.push("/(tabs)/categories");
      }
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
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="flex-1 bg-col_bg rounded-t-[80px] px-4 pb-32 justify-start pt-10 gap-8 items-center">
                <View className="w-5/6 flex justify-center items-center">
                  <DateInput onDateChange={(date) => setDate(date)} />
                </View>

                {/* Category Input */}
                <View className="w-5/6">
                  <Text className="font-semibold px-4 text-Txt-secondary">
                    Category
                  </Text>
                  <DropdownInput
                    items={ExpenseCategories}
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                    placeholder="Select a Category"
                  />
                </View>

                {/* Amount Input */}
                <View className="w-5/6">
                  <Text className="p-2 font-semibold text-Txt-secondary">
                    Enter Amount
                  </Text>
                  <TextInput
                    className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>

                {/* Expense Title Input */}
                <View className="w-5/6">
                  <Text className="p-2 font-semibold text-Txt-secondary">
                    Expense Title
                  </Text>
                  <TextInput
                    className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                    placeholder="Expense Title (optional)"
                    value={expenseTitle}
                    onChangeText={setExpenseTitle}
                  />
                </View>

                {/* Message Input */}
                <TextInput
                  className="bg-col_bg-dark w-5/6 h-32 rounded-xl px-6 py-4 text-primary"
                  placeholder="Enter Message (optional)"
                  placeholderTextColor={Colors.primary.DEFAULT}
                  multiline
                  numberOfLines={4} // Adjust this value based on how many lines you want to show by default
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                />

                {/* Error Message */}
                {error ? <Text className="text-red-500">{error}</Text> : null}

                {/* Save Button */}
                <TouchableOpacity
                  onPress={ExpenseSubmit}
                  className="bg-primary p-2 rounded-full text-Txt w-3/6 text-center"
                >
                  <Text className="text-xl mx-4 font-semibold text-Txt text-center">
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default AddExpense;
