import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth, db } from "@/FirebaseConfig";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import LoadingBar from "@/components/loadingBar";

import CustomPieChart from "@/components/ringPieChart";
import CustomHalfPieChart from "@/components/ringPieChart";
import CircularLoader from "@/components/circularLoader";
import Chart from "@/components/chart";
import { useIsFocused } from "@react-navigation/native";
import Dashboard from "@/components/tabs/Dashboard";

// import Btn from "@/components/Btn";

const home = () => {
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
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[30%] flex flex-col items-center justify-start">
          <View className="w-5/6 flex flex-row items-center justify-between m-3">
            <View>
              <Text className="text-heading font-bold text-2xl ">
                Hello ! , {Data.fullName?.split(" ")[0]}
              </Text>
              <Text className="text-heading-secondary font-semibold">
                Welcome Back
              </Text>
            </View>

            <Pressable onPress={() => {}}>
              <View className="p-2 bg-white rounded-full">
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </View>
            </Pressable>
          </View>

          <TouchableOpacity
            className="w-full flex-grow flex flex-col justify-center items-center "
            onPress={() => {
              router.push("/(tabs)/Account_Details");
            }}
          >
            <Dashboard
              totalBalance={TotalIncome ?? "--"}
              totalExpense={TotalAmount ?? "--"}
              loadingBarBg={Colors.Txt.DEFAULT}
              loadingBarFill="white"
            />
          </TouchableOpacity>
        </View>

        <View className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start gap-0  "></View>
      </SafeAreaView>
    </>
  );
};

export default home;
