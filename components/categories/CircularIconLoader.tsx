import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";

const CircularIconLoader = ({
  progress = 20,
  title = "Title",
  color = Colors.button.dark,
  backgroundColor = Colors.button.light,
  inactiveColor = Colors.col_bg.light,
  icon = "cash", // Default to 'cash' icon for savings
  iconColor = Colors.button.dark,
  iconSize = 36,
}) => {
  const rotation = (progress * 360) / 100;

  return (
    <View
      className="items-center rounded-[25%] p-4 pb-2"
      style={{ backgroundColor }}
    >
      {/* Circular Progress Bar */}
      <View
        className="justify-center items-center w-5/6 aspect-square rounded-[25%]"
        style={{ backgroundColor }}
      >
        {/* Background ring */}
        <View className="absolute" style={{ borderColor: backgroundColor }} />

        {/* Inner donut circle */}
        <View
          className="absolute z-30 w-[90%] h-[90%] rounded-full"
          style={{ backgroundColor }}
        />

        {/* Arc layers */}
        <View className="w-full h-full rounded-full">
          {progress <= 50 && (
            <View
              className="w-full h-full rounded-full"
              style={{
                transform: [{ rotate: `${rotation}deg` }],
                backgroundColor: inactiveColor,
              }}
            >
              <View
                className="w-full h-1/2 absolute bottom-0 rounded-b-full z-10"
                style={{ backgroundColor: color }}
              />
            </View>
          )}

          {progress > 50 && (
            <>
              <View
                className="w-full h-full rounded-full z-20 absolute"
                style={{ transform: [{ rotate: `180deg` }] }}
              >
                <View
                  className="w-full h-1/2 absolute bottom-0 rounded-b-full z-20"
                  style={{ backgroundColor: color }}
                />
              </View>
              <View
                className="w-full h-full rounded-full z-20 absolute"
                style={{ transform: [{ rotate: `${rotation}deg` }] }}
              >
                <View
                  className="w-full h-1/2 absolute bottom-0 rounded-b-full z-20"
                  style={{ backgroundColor: color }}
                />
              </View>
            </>
          )}

          <View
            className="w-full h-1/2 absolute bottom-0 rounded-b-full z-10"
            style={{ backgroundColor: inactiveColor }}
          />
        </View>

        {/* Center Icon */}
        <View className="absolute z-40 justify-center items-center">
          <Ionicons name={icon as any} size={iconSize} color={iconColor} />
        </View>
      </View>

      {/* Title below the loader */}
      <Text
        className="mt-2 text-xl font-semibold w-5/6 text-center"
        style={{ color: iconColor }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CircularIconLoader;
