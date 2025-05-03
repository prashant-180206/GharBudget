import { View, Text } from "react-native";
import React from "react";

const HomeCard = ({ title, info, bg }: any) => {
  return (
    <View
      className={`my-3 mb-0 ${bg} p-4 rounded-xl flex flex-row items-center shadow-xl justify-between `}
    >
      <Text className="text-2xl font-semibold text-Txt">{title}</Text>
      <Text className="text-xl text-Txt-secondary">{info}</Text>
    </View>
  );
};

export default HomeCard;
