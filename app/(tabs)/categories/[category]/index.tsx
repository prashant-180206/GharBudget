import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { auth, db } from "@/FirebaseConfig";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const category = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const [Data, setData] = useState<DocumentData>({});
  const [TotalIncome, setTotalIncome] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);

  const isfocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          Alert.alert("Authentication Error", "User is not authenticated.");
          return;
        }

        // Fetch user document
        const userDocRef = doc(db, "users", userId);
        const userDataDoc = await getDoc(userDocRef);

        if (!userDataDoc.exists()) {
          Alert.alert("Data Error", "User data not found.");
          return;
        }

        // Fetch expenses
        const expenseQuery = query(
          collection(db, "expenses"),
          where("userId", "==", userId)
        );
        const expenseSnapshot = await getDocs(expenseQuery);

        // Fetch income
        const incomeQuery = query(
          collection(db, "income"),
          where("userId", "==", userId)
        );
        const incomeSnapshot = await getDocs(incomeQuery);

        // Set user data
        const userData = userDataDoc.data();
        setData(userData);

        // Calculate expenses
        let totalExpenses = 0;
        expenseSnapshot.forEach((doc) => {
          const amt = doc.data().Amount;
          if (typeof amt === "number") totalExpenses += amt;
        });
        setTotalAmount(totalExpenses);

        // Calculate income
        let totalIncomeVal = 0;
        incomeSnapshot.forEach((doc) => {
          const amt = doc.data().Amount;
          if (typeof amt === "number") totalIncomeVal += amt;
        });
        setTotalIncome(totalIncomeVal);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        Alert.alert(
          "Error",
          error.message || "Failed to fetch data. Please try again later."
        );
      }
    };

    fetchData();
  }, [isfocused]);

  return (
    <View>
      <Text>category : {category}</Text>
      <TouchableOpacity
        onPress={() => {
          router.push(`/(tabs)/categories/${category}/addexpense`);
        }}
      >
        <Text>qwertyuiop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default category;
