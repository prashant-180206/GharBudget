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



const CategoryGrid = () => {

  const categories: Category[] = [
    { label: "Food", icon: "fast-food-outline", route: "Food" },
    { label: "Daily", icon: "calendar-outline", route: "Daily" },
    { label: "Groceries", icon: "cart-outline", route: "Groceries" },
    { label: "Travel", icon: "car-outline", route: "Travel" },
    { label: "Rent", icon: "home-outline", route: "Rent" },
    { label: "Health", icon: "medkit-outline", route: "Health" },
    { label: "Entertainment", icon: "tv-outline", route: "Entertainment" },
    { label: "Bills", icon: "receipt-outline", route: "Bills" },
    { label: "Maintenance", icon: "build-outline", route: "Maintenance" },
    { label: "Subscriptions", icon: "repeat-outline", route: "Subscriptions" },
    { label: "Savings", icon: "wallet-outline", route: "Savings" },
    { label: "Other", icon: "ellipsis-horizontal-outline", route: "Other" },
  ];
  
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
