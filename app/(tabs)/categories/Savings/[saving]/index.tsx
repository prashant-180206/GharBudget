import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { savingsCategories } from "@/assets/constants";
import CircularIconLoader from "@/components/categories/CircularIconLoader";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  limit,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "@/FirebaseConfig";
import SavingList from "@/components/expense/savingList";

type Category = {
  label: string;
  icon: string; // If you use Ionicons, use keyof typeof Ionicons.glyphMap
  route: string;
};

interface SavingItem {
  Amount: number;
  Category: string;
  Created_At: Timestamp;
  Date: Timestamp;
  Message: string;
  Month: number;
  Title: string;
  Year: number;
  userId: string;
  id: string;
}

const Savings = () => {
  const router = useRouter();
  const { saving } = useLocalSearchParams();

  const [RouteInfo, setRouteInfo] = useState<Category | null>(null);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [savingData, setSavingData] = useState<SavingItem[] | null>(null);
  const [currentGoal, setCurrentGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch savings data for this category
  const getCategoryData = async () => {
    try {
      setLoading(true);
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setSavingData([]);
        setLoading(false);
        return;
      }
      const snapshot = await getDocs(
        query(
          collection(db, "savings"),
          where("userId", "==", userId),
          where("Category", "==", saving),
          limit(15)
        )
      );
      const dataarr: SavingItem[] = [];
      snapshot.forEach((sav) => {
        const data = sav.data() as Omit<SavingItem, "id">;
        dataarr.push({
          ...data,
          id: sav.id,
        });
      });
      setSavingData(dataarr);
      setLoading(false);
    } catch (e) {
      setSavingData([]);
      setLoading(false);
      console.error("Error fetching saving data:", e);
      Alert.alert("Error Getting data");
    }
  };

  // Fetch current goal for this category
  const fetchGoal = async (userId: string, route: string) => {
    try {
      const docRef = doc(db, "savings_goals", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data[route] !== undefined) {
          setCurrentGoal(Number(data[route]));
        } else {
          setCurrentGoal(null);
        }
      } else {
        setCurrentGoal(null);
      }
    } catch (error) {
      setCurrentGoal(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategoryData();
      const routeinfo =
        savingsCategories.find((val) => val.route == saving) || null;
      setRouteInfo(routeinfo);
      if (auth.currentUser && routeinfo) {
        fetchGoal(auth.currentUser.uid, routeinfo.route);
      } else {
        setCurrentGoal(null);
      }
      return () => {};
    }, [saving])
  );

  // Handle goal setting
  const handleSetGoal = async () => {
    if (!goalAmount || isNaN(Number(goalAmount))) {
      Alert.alert("Please enter a valid amount.");
      return;
    }
    if (!auth.currentUser) {
      Alert.alert("You must be logged in to set a goal.");
      return;
    }
    if (!RouteInfo) {
      Alert.alert("No saving selected.");
      return;
    }
    try {
      await setDoc(
        doc(db, "savings_goals", auth.currentUser.uid),
        { [RouteInfo.route]: Number(goalAmount) },
        { merge: true }
      );
      Alert.alert(
        "Goal Set!",
        `Your goal for ${RouteInfo.label}: ₹${goalAmount}`
      );
      setGoalModalVisible(false);
      setGoalAmount("");
      // Refresh goal display
      fetchGoal(auth.currentUser.uid, RouteInfo.route);
    } catch (error) {
      Alert.alert("Error", "Failed to set goal. Please try again.");
    }
  };

  return (
    <View className="h-full w-full bg-primary ">
      <View className="mt-[8%] w-full h-[92%]  absolute rounded-t-[80px] flex flex-col justify-start items-center pb-32 bg-col_bg pt-10">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-lg font-semibold">Goal</Text>
            <Text className="text-base text-gray-500">
              {currentGoal !== null ? `₹${currentGoal}` : "No goal set"}
            </Text>
          </View>
          <View className="w-3/6">
            <CircularIconLoader
              icon={RouteInfo?.icon}
              title={RouteInfo?.label}
              iconSize={70}
              iconColor="white"
            />
          </View>
        </View>
        <View className="w-full h-[55%]">
          <ScrollView className=" w-full px-10 ">
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#007AFF"
                className="mt-8"
              />
            ) : (
              <SavingList SavingData={savingData ?? []} />
            )}
          </ScrollView>
        </View>
        <View className="flex flex-row justify-between gap-4 w-5/6">
          <TouchableOpacity
            onPress={() => setGoalModalVisible(true)}
            className="bg-primary p-2 rounded-full flex-1"
          >
            <Text className="text-xl mx-4 text-center font-semibold text-Txt">
              Set Goal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push(`/(tabs)/categories/Savings/${saving}/addsavings`);
            }}
            className="bg-primary p-2 rounded-full text-Txt flex-1"
          >
            <Text className="text-xl text-center mx-4 font-semibold text-Txt">
              Add Savings
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal for setting goal */}
        <Modal
          visible={goalModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setGoalModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white rounded-2xl p-8 w-5/6 items-center">
                <Text className="text-xl font-bold mb-4">
                  Set Your Savings Goal
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={goalAmount}
                  onChangeText={setGoalAmount}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
                />
                <View className="flex flex-row gap-4">
                  <TouchableOpacity
                    className="bg-primary px-4 py-2 rounded-lg"
                    onPress={handleSetGoal}
                  >
                    <Text className="text-white font-semibold">Set Goal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                    onPress={() => setGoalModalVisible(false)}
                  >
                    <Text className="font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

export default Savings;
