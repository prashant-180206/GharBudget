import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Category = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const categories: Category[] = [
  { label: "Daily", icon: "calendar-outline", route: "daily" },
  { label: "Groceries", icon: "cart-outline", route: "groceries" },
  { label: "Food", icon: "fast-food-outline", route: "food" },
  { label: "Travel", icon: "car-outline", route: "travel" },
  { label: "Rent", icon: "home-outline", route: "rent" },
  { label: "Health", icon: "medkit-outline", route: "health" },
  { label: "Entertainment", icon: "tv-outline", route: "entertainment" },
  { label: "Bills", icon: "receipt-outline", route: "bills" },
  { label: "Maintenance", icon: "build-outline", route: "maintenance" },
  { label: "Subscriptions", icon: "repeat-outline", route: "subscriptions" },
  { label: "Savings", icon: "wallet-outline", route: "savings" },
  { label: "Other", icon: "ellipsis-horizontal-outline", route: "other" },
];

const CategoryGrid = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 3.5; // Adjust spacing

  return (
    <View className="flex flex-wrap flex-row justify-center w-full">
      {categories.map((item) => (
        <View key={item.route} style={{ width: itemWidth, padding: 8 }}>
          <TouchableOpacity
            style={{ width: "100%", aspectRatio: 1 }}
            onPress={() => router.push(`/(tabs)/categories/${item.route}`)}
          >
            <View className="flex-1 bg-button-light rounded-3xl justify-center items-center">
              <Ionicons name={item.icon} size={50} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text className="text-Txt text-sm mt-1 font-semibold text-center">
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryGrid;
