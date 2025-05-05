// components/DropdownInput.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface DropdownInputProps {
  items: { label: string; value: string }[];
  value: string | null;
  onChange: (val: string) => void;
  placeholder?: string;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  items,
  value,
  onChange,
  placeholder = "Select a Category",
}) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = items.find((item) => item.value === value)?.label;

  return (
    <View className="w-full  my-2 rounded-full ">
      {/* Dropdown Button */}
      <TouchableOpacity
        className=" rounded-full p-4 px-6 bg-col_bg-dark"
        onPress={() => setOpen(!open)}
      >
        <Text className="text-Txt">
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Options List */}
      {open && (
        <View className=" bg-col_bg p-2 max-h-36 overflow-hidden">
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4  bg-col_bg-dark rounded-full mb-2"
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                <Text className="text-base">{item.label}</Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled
          />
        </View>
      )}
    </View>
  );
};

export default DropdownInput;
