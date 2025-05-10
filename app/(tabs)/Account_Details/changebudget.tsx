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
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch budget data on mount and set as default values
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const docRef = doc(db, "budget", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Only set values for categories in ExpenseCategories
          setAmounts((prev) =>
            ExpenseCategories.reduce((acc, category) => {
              acc[category.value] =
                typeof data[category.value] === "string"
                  ? data[category.value]
                  : "";
              return acc;
            }, {} as Amounts)
          );
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);

  const handleChange = (value: string, key: string) => {
    setAmounts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      const now = new Date();
      const docId = `${userId}`;
      const budgetRef = doc(db, "budget", docId);

      await setDoc(budgetRef, {
        ...amounts,
        user_Id: userId,
        Created_At: now,
        Updated_At: now,
      });

      router.push("/(tabs)/Account_Details");
    } catch (err) {
      Alert.alert("Error Changing Budget");
      router.push("/(tabs)/Account_Details");
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
            keyboardVerticalOffset={80}
          >
            <ScrollView
              className="bg-col_bg pb-20 w-full h-full px-4 mb-32"
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex flex-col items-center justify-evenly">
                {ExpenseCategories.map((category) => (
                  <View key={category.value} className="mb-4 flex flex-row justify-between px-10 w-full items-start">
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
                disabled={loading}
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
