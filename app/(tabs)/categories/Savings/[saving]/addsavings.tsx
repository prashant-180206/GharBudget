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
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateInput from "@/components/DateInput";
import DropdownInput from "@/components/dropdown";
import { ExpenseCategories, savingsCategoryOptions } from "@/assets/constants";
import { Colors } from "@/assets/colors";
import { auth, db } from "@/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AddSavings = () => {
  const router = useRouter();
  const { saving } = useLocalSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    saving ? saving.toString() : ""
  );
  const [amount, setAmount] = useState("");
  const [savingTitle, setSavingTitle] = useState(`${saving}`);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(""); // Store the date as string initially
  const [error, setError] = useState("");

  const ConvertDate = (dateString: string) => {
    const convertedDate = new Date(dateString);
    return convertedDate;
  };

  const validateForm = () => {
    if (!selectedCategory) {
      setError("Please select a saving.");
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
        const userId = auth.currentUser?.uid || "";
        const now = new Date();
        // const docId = `${userId}`;
        const budgetRef = doc(db, "saving_expense", userId);

        await setDoc(
          budgetRef,
          {
            [selectedCategory]: increment(Number(amount)),
          },
          { merge: true }
        );

        await addDoc(collection(db, "expenses"), {
          userId: userId,
          Title: savingTitle,
          Created_At: now,
          Month: now.getMonth(),
          Year: now.getFullYear(),
          Category: "Savings",
          Amount: Number(amount),
          Date: ConvertDate(date),
          Message: message,
        });

        await addDoc(collection(db, "savings"), {
          userId: userId,
          Title: savingTitle,
          Created_At: now,
          Month: now.getMonth(),
          Year: now.getFullYear(),
          Category: selectedCategory,
          Amount: Number(amount),
          Date: ConvertDate(date),
          Message: message,
        });

        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          Expense_this_month: increment(Number(amount)),
        });

        router.push(
          saving
            ? `/(tabs)/categories/Savings/${saving.toString()}`
            : "/(tabs)/categories"
        );
      } catch (err) {
        if (err instanceof Error) {
          Alert.alert(err.message);
        } else {
          Alert.alert("An unexpected error occurred.");
        }
        router.push(
          saving
            ? `/(tabs)/categories/${saving.toString()}`
            : "/(tabs)/categories"
        );
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
            <View className="flex-1 rounded-t-[80px] bg-col_bg px-4 pb-32 justify-start pt-10 gap-8 items-center">
              <ScrollView className="w-full ">
                <View className=" w-full flex-col items-center gap-10 pb-10">
                  <View className="w-5/6 flex justify-center items-center">
                    <DateInput onDateChange={setDate} />
                  </View>

                  {/* Category Input */}
                  <View className="w-5/6">
                    <Text className="font-semibold px-4 text-Txt-secondary">
                      Category
                    </Text>
                    <DropdownInput
                      items={savingsCategoryOptions}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      placeholder={
                        saving ? saving.toString() : "Select Category"
                      }
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

                  {/* Saving Title Input */}
                  <View className="w-5/6">
                    <Text className="p-2 font-semibold text-Txt-secondary">
                      Saving Title
                    </Text>
                    <TextInput
                      className="bg-col_bg-dark w-full rounded-full px-6 py-4"
                      placeholder="Saving Title (optional)"
                      value={savingTitle}
                      onChangeText={setSavingTitle}
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
                    onPress={ExpenseSubmit}
                    className="bg-primary p-2 rounded-full text-Txt w-3/6 text-center"
                  >
                    <Text className="text-xl mx-4 font-semibold text-Txt text-center">
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default AddSavings;
