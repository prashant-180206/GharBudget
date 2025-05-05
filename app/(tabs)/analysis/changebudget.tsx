import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DropdownInput from "@/components/dropdown";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";

type BudgetItem = {
  name: string;
  amount: string;
};

const changebudget = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);

  const [decided, setDecided] = useState<BudgetItem[]>([]);
  const [amount, setAmount] = useState("");

  const options = [
    { label: "Daily", value: "daily" },
    { label: "Groceries", value: "groceries" },
    { label: "Food", value: "food" },
    { label: "Travel", value: "travel" },
    { label: "Rent", value: "rent" },
    { label: "Health", value: "health" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Bills", value: "bills" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Subscriptions", value: "subscriptions" },
    { label: "Savings", value: "savings" },
    { label: "Other", value: "other" },
  ];

  const addAmount = () => {
    if (!selected || !amount) return;

    setDecided((prev) => [...prev, { name: selected.toUpperCase(), amount }]);
    setAmount(""); // reset after adding
  };

  const updateBudget = async () => {
    try {
      const docRef = await addDoc(collection(db, "budget"), {
        Budget: decided,
        Total_Budget: totalBudget,
        User_Id: auth.currentUser?.uid,
        Created_At: new Date(),
        Updated_At: new Date(),
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
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[15%] flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">
            Create / Update Budget
          </Text>
        </View>
        <View
          className="w-full h-[85%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col justify-start items-center
        "
        >
          <View className="w-5/6 p-4 mt-10">
            <Text className="text-sm">Add total money</Text>
            <TextInput
              className="bg-col_bg-dark p-4 rounded-full text-Txt "
              placeholder="Write Total Money to add "
              keyboardType="numeric"
              value={`${totalBudget}`}
              onChangeText={(num) => {
                setTotalBudget(Number(num));
              }}
            />
          </View>
          <View className="w-5/6 p-4">
            <Text className="text-sm">Add total money</Text>
            <View className="flex flex-row items-center justify-center">
              <View className="w-4/6">
                <DropdownInput
                  items={options}
                  value={selected}
                  onChange={(val) => setSelected(val)}
                  placeholder="Choose a category"
                />
              </View>
              <TextInput
                className="bg-col_bg-dark h-12 rounded-full p-3 w-2/6"
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                addAmount();
              }}
              className="bg-primary p-2 rounded-full text-center"
            >
              <Text className=" mx-4 font-semibold text-Txt text-center">
                Add Amount
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={decided}
            className="gap-4 w-5/6 border-2 mb-4 rounded-xl border-primary"
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <View className="px-4 py-3 bg-col_bg-dark rounded-full mb-2 w-full">
                <Text className="text-base text-Txt">
                  {item.name}: ₹{item.amount}
                </Text>
              </View>
            )}
            nestedScrollEnabled
            style={{ flexGrow: 0, maxHeight: 200 }} // Set the max height here
          />

          <TouchableOpacity
            onPress={updateBudget}
            className="bg-primary p-2 rounded-full m-4 w-5/6 text-center"
          >
            <Text className="text-xl mx-4 font-semibold text-Txt text-center">
              Make Changes in Budget
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/analysis");
            }}
            className="bg-primary p-2 rounded-full "
          >
            <Text className="text-xl mx-4 font-semibold text-Txt">Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default changebudget;
