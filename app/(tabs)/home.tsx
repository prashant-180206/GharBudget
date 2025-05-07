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
  const [BudgetData, setBudgetData] = useState<DocumentData>({});
  const [TotalAmount, setTotalAmount] = useState(0);

  const isfocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        Alert.alert("User is not Authenticated");
        return;
      }

      const userDataDoc = await getDoc(doc(db, "users", userId));
      const BudgetDataDoc = await getDocs(
        query(
          collection(db, "budget"),
          where("User_Id", "==", userId)
          // limit(1)
        )
      );
      const ExpenseDataDoc = await getDocs(
        query(collection(db, "expenses"), where("userId", "==", userId))
      );

      if (userDataDoc.exists()) {
        const userData = userDataDoc.data();
        setData(userData);
        BudgetDataDoc.forEach((document) => {
          setBudgetData(document.data());
        });
        let total = 0;
        ExpenseDataDoc.forEach((doc) => {
          total += doc.data().Amount;
        });
        setTotalAmount(total);
      } else {
        Alert.alert("Error Getting Data");
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
          <Dashboard
            totalBalance={BudgetData.Total_Budget ?? "--"}
            totalExpense={TotalAmount ?? "--"}
            progress={
              BudgetData.Total_Budget
                ? (TotalAmount / BudgetData.Total_Budget) * 100
                : 0
            }
            progressText="30% of your Expense, Looks Good"
            loadingBarBg={Colors.Txt.DEFAULT}
            loadingBarFill="white"
          />
        </View>
        <View className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start gap-0  "></View>
      </SafeAreaView>
    </>
  );
};

export default home;
