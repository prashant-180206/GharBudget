import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import { useDailyExpense } from "@/context/DailyExpenseContext";
import { DailyExpense } from "@/assets/types";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";

interface DailyExpenseOptionSelectorProps {
  title: string;
  options: string[];
  onClose?: () => void;
}

const Daily_Expense_Option_selector: React.FC<
  DailyExpenseOptionSelectorProps
> = ({ title, options, onClose = () => {} }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { dailyExpenseData, refresh } = useDailyExpense();

  const toggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const onclose = async () => {
    setVisible(false);
    onClose();

    if (dailyExpenseData) {
      const now = new Date();
      const today = now.toISOString().slice(0, 10);

      // Filter out any existing entry for today
      const filteredTaken = dailyExpenseData.Taken.filter(
        (entry) => entry.date !== today
      );

      const doctosave: DailyExpense = {
        categories: [...dailyExpenseData.categories],
        Taken: [
          ...filteredTaken,
          {
            date: today,
            categories: [...selectedOptions],
          },
        ],
      };

      await setDoc(
        doc(db, "Daily_Expense", auth.currentUser?.uid || ""),
        doctosave
      );
      await refresh();
    }
  };

  useEffect(() => {
    if (dailyExpenseData) {
      const now = new Date();
      const today = now.toISOString().slice(0, 10);

      const todayEntry = dailyExpenseData.Taken.find(
        (entry) => entry.date === today
      );

      if (todayEntry) {
        setSelectedOptions(todayEntry.categories);
      }
    }
  }, []);

  if (!visible) return null;

  return (
    <View className="p-4 w-full bg-button-light rounded-3xl shadow-xl">
      <Text className="text-xl font-bold text-Txt mb-4 px-2">{title}</Text>

      <TouchableOpacity
        className="absolute right-4 top-4 z-10"
        onPress={onclose}
      >
        <Ionicons name="close" size={24} color={Colors.Txt.DEFAULT} />
      </TouchableOpacity>

      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        return (
          <TouchableOpacity
            key={option}
            onPress={() => toggle(option)}
            className={`p-3 rounded-full m-2 px-4 flex-row items-center justify-start ${
              isSelected ? "bg-button-dark" : "bg-blue-400"
            }`}
          >
            {isSelected && (
              <Ionicons
                name="checkmark"
                size={20}
                color={Colors.Txt.DEFAULT}
                style={{ marginRight: 12 }}
              />
            )}
            <Text className="text-Txt-light font-semibold text-lg">
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Text className="w-full text-center my-2 font-semibold">
        Close to save{" "}
      </Text>
    </View>
  );
};

export default Daily_Expense_Option_selector;
