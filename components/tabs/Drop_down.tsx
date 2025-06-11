import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

type DropdownProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

const Dropdown = ({ label, options, selected, onSelect }: DropdownProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className="flex-1 mx-1">
      
      <TouchableOpacity
        className="bg-col_bg-dark rounded-full py-2 px-4"
        onPress={() => setVisible(true)}
      >
        <Text className="text-Txt">{selected}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View className="bg-white w-5/6 rounded-xl max-h-[300px]">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-200"
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text className="text-black">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
