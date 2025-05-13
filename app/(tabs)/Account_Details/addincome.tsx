import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import DateInput from "@/components/DateInput";
import { Colors } from "@/assets/colors";
import { auth, db } from "@/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useAnalysis } from "@/context/AnalysisContext";
// import { useAnalysis } from "@/path/to/AnalysisContext"; // <-- update the path as needed

const Income = () => {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(""); // Store the date as string initially
  const [error, setError] = useState("");
  const [label, setlabel] = useState("Monthly");

  // Access context values for reading
  const { Budget_Expense, Monthly_Expense, loading } = useAnalysis();

  const ConvertDate = (dateString: string) => {
    setDate(dateString);
    const convertedDate = new Date(dateString);
    return convertedDate;
  };

  const validateForm = () => {
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

  // --- KEEP ALL WRITES/UPDATES AS BEFORE ---
  const IncomeSubmit = async () => {
    if (validateForm()) {
      try {
        const userId = auth.currentUser?.uid || "";
        const now = new Date();

        // Add new income document
        await addDoc(collection(db, "income"), {
          userId: userId,
          Title: expenseTitle,
          Created_At: now,
          Amount: Number(amount),
          Date: ConvertDate(date),
          Month: now.getMonth(),
          Year: now.getFullYear(),
          Message: message,
          Label: label,
        });

        // Update user's monthly income
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          Income_this_month: increment(Number(amount)),
        });

        router.push("/(tabs)/transactions");
      } catch (err) {
        if (err instanceof Error) {
          Alert.alert(err.message);
        } else {
          Alert.alert("An unexpected error occurred.");
        }
        router.push("/(tabs)/transactions");
      }
    }
  };

  // Optional: Show info from context
  const currentIncome = Monthly_Expense?.income || 0;
  const currentBudget = Budget_Expense?.income || 0;

  return (
    <View className="flex-1 bg-primary pt-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-1 bg-col_bg rounded-t-[80px] px-4 pb-32 justify-start pt-10 gap-8 items-center">
            <View className="w-full h-full ">
              <ScrollView className="w-full h-full">
                <View className="flex flex-col w-full gap-4 items-center">
                  {/* Show context summary if available */}
                  {!loading && (
                    <View className="w-5/6 mb-2">
                      <Text className="text-lg font-semibold text-Txt-secondary">
                        Current Month Income:{" "}
                        <Text className="font-bold text-primary">
                          ₹{currentIncome}
                        </Text>
                      </Text>
                      <Text className="text-lg font-semibold text-Txt-secondary">
                        Budgeted Income:{" "}
                        <Text className="font-bold text-primary">
                          ₹{currentBudget as String}
                        </Text>
                      </Text>
                    </View>
                  )}

                  <View className="w-5/6 flex justify-center items-center">
                    <DateInput onDateChange={(date) => setDate(date)} />
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

                  {/* Income Title Input */}
                  <View className="w-5/6">
                    <Text className="p-2 font-semibold text-Txt-secondary">
                      Income Title
                    </Text>
                    <TextInput
                      className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                      placeholder="Income Title (optional)"
                      value={expenseTitle}
                      onChangeText={setExpenseTitle}
                    />
                  </View>
                  {/* Income Label Input */}
                  <View className="w-5/6">
                    <Text className="p-2 font-semibold text-Txt-secondary">
                      Income Label
                    </Text>
                    <TextInput
                      className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                      placeholder="Monthly"
                      value={label}
                      onChangeText={setlabel}
                    />
                  </View>

                  {/* Message Input */}
                  <TextInput
                    className="bg-col_bg-dark w-5/6 h-32 rounded-xl px-6 py-4 text-primary"
                    placeholder="Enter Message (optional)"
                    placeholderTextColor={Colors.primary.DEFAULT}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={message}
                    onChangeText={setMessage}
                  />

                  {/* Error Message */}
                  {error ? <Text className="text-red-500">{error}</Text> : null}

                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={IncomeSubmit}
                    className="bg-primary p-2 rounded-full text-Txt w-3/6 text-center"
                  >
                    <Text className="text-xl mx-4 font-semibold text-Txt text-center">
                      Add Income
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Income;
