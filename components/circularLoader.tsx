import { Colors } from "@/assets/colors";
import React from "react";
import { View, Text } from "react-native";

const CircularLoader = ({
  progress = 20,
  title = "Title",
  color = Colors.button.dark,
  backgroundColor = Colors.button.light,
  inactiveColor = Colors.col_bg.light,
}) => {
  const rotation = (progress * 360) / 100;

  return (
    <View className="items-center bg-button-light rounded-[25%] p-4 pb-2">
      {/* Circular Progress Bar */}
      <View
        className="justify-center items-center w-5/6 aspect-square  rounded-[25%] "
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

        {/* Center progress text */}
        <Text
          className="text-center text-2xl font-semibold absolute z-40"
          style={{ color: inactiveColor }}
        >
          {String(progress)}%
        </Text>
      </View>

      {/* Title below the loader */}
      <Text
        className="mt-2 text-base font-medium w-5/6 text-center"
        style={{ color: color }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CircularLoader;
