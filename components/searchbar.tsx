import { View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";

const SearchBar = () => {
  return (
    <View className="bg-col_bg-light px-3 my-4 p-3  rounded-full flex flex-row items-center border-2 border-primary-dark">
      <Ionicons name="search-sharp" size={24} color={Colors.Txt.DEFAULT} />
      <TextInput
        placeholder="Search here"
        placeholderTextColor={Colors.Txt.secondary}
        className="flex-1 text-[20px] mx-2 text-Txt"
        style={{ minWidth: 0, paddingVertical: 0 }}
      />
    </View>
  );
};

export default SearchBar;
