import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Category = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const SavingsGrid = () => {
  const savingsCategories: Category[] = [
    {
      label: "Emergency Fund",
      icon: "alert-circle-outline",
      route: "EmergencyFund",
    },
    { label: "Retirement", icon: "hourglass-outline", route: "Retirement" },
    { label: "Education", icon: "school-outline", route: "Education" },
    { label: "Vacation", icon: "airplane-outline", route: "Vacation" },
    { label: "Home Purchase", icon: "home-outline", route: "HomePurchase" },
    { label: "Investments", icon: "trending-up-outline", route: "Investments" },
    { label: "Car", icon: "car-sport-outline", route: "Car" },
    { label: "Wedding", icon: "heart-outline", route: "Wedding" },
    {
      label: "Other",
      icon: "ellipsis-horizontal-outline",
      route: "OtherSavings",
    },
  ];

  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 3.5; // Adjust spacing

  return (
    <View className="flex flex-wrap flex-row justify-center w-full">
      {savingsCategories.map((item) => (
        <View key={item.route} style={{ width: itemWidth, padding: 8 }}>
          <TouchableOpacity
            style={{ width: "100%", aspectRatio: 1 }}
            onPress={() => {
              router.push(`/(tabs)/categories/Savings/${item.route}`);
            }}
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

export default SavingsGrid;
