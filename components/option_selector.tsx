import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";

const OptionSelector = ({ title, options }: any) => {
  const [Visible, setVisible] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([""]);

  const toggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item != option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  if (Visible) {
    return (
      <View className="p-4 bg-col_bg-light rounded-xl shadow-xl">
        <Text className="text-xl font-bold text-Txt mb-2 px-2">{title}</Text>

        <TouchableOpacity
          className="absolute right-4 top-4 "
          onPress={() => {
            setVisible(false);
          }}
        >
          <Ionicons name="close" size={24} color={Colors.Txt.DEFAULT} />
        </TouchableOpacity>

        {options.map((option: string, index: Number) => (
          <TouchableOpacity
            className={` p-3 rounded-xl m-2 px-4 flex flex-row items-center justify-start ${
              selectedOptions.includes(option) ? "bg-col_bg-dark" : "bg-col_bg"
            }`}
            key={option}
            onPress={() => {
              toggle(option);
            }}
          >
            {selectedOptions.includes(option) && (
              <>
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={Colors.Txt.DEFAULT}
                  className="mr-3"
                />
              </>
            )}
            <Text className="text-Txt-secondary text-xl">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
};

export default OptionSelector;
