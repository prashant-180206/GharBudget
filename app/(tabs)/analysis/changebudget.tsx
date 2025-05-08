import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { ExpenseCategories } from "@/assets/constants";

type Amounts = { [key: string]: string };

const ChangeBudget = () => {
  const [amounts, setAmounts] = useState<Amounts>(() =>
    ExpenseCategories.reduce((acc, category) => {
      acc[category.value] = "";
      return acc;
    }, {} as Amounts)
  );

  const handleChange = (value: string, key: string) => {
    setAmounts((prev) => ({ ...prev, [key]: value }));
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const docId = `${userId}_${year}_${month}`;

      const budgetRef = doc(db, "budget", docId);

      await setDoc(budgetRef, {
        ...amounts,
        user_Id: userId,
        Created_At: now,
        Updated_At: now,
      });

      router.push("/(tabs)/analysis");
    } catch (err) {
      Alert.alert("Error Changing Budget");
      router.push("/(tabs)/analysis");
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary">
        <View className="w-full h-[15%] flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">
            Create / Update Budget
          </Text>
        </View>
        <View className="w-full h-[85%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col justify-start items-center p-4 pt-20 pb-32">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, width: "100%" }}
            keyboardVerticalOffset={80} // Adjust if you have a taller header
          >
            <ScrollView
              className="bg-col_bg pb-20 w-full h-full px-4"
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex flex-col items-center justify-evenly">
                {ExpenseCategories.map((category) => (
                  <View key={category.value} className="mb-4 flex flex-row ">
                    <Text className="text-xl font-medium text-Txt mb-1 w-3/6">
                      {category.label}
                    </Text>
                    <TextInput
                      className="bg-col_bg-dark rounded-full px-6 py-2"
                      placeholder="Enter amount"
                      keyboardType="numeric"
                      value={amounts[category.value]}
                      onChangeText={(text) =>
                        handleChange(text, category.value)
                      }
                      returnKeyType="done"
                    />
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-primary rounded-full py-3 mt-4"
              >
                <Text className="text-center text-Txt-light font-bold text-xl">
                  Submit
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangeBudget;
