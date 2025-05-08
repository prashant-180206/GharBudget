import React from "react";
import { View, Text, ViewProps } from "react-native";

interface LoadingBarProps extends ViewProps {
  progress: number; // 0 - 100
  height?: number; // px
  backgroundColor?: string; // color string, e.g. "#e0e0de"
  fillColor?: string; // color string, e.g. "#4CAF50"
  startText?: string;
  centerText?: string;
  endText?: string;
  textColor?: string; // color string, e.g. "#fff"
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  progress,
  height = 30,
  backgroundColor = "#e0e0de",
  fillColor = "#4CAF50",
  startText = "",
  centerText = "",
  endText = "",
  textColor = "#fff",
  style,
  ...props
}) => {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View
      className="w-full rounded-full overflow-hidden relative "
      style={[{ height, backgroundColor }, style]}
      {...props}
    >
      {/* Bar Fill */}
      <View
        className="absolute right-0 top-0 h-full rounded-full"
        style={{
          width: `${clamped}%`,
          backgroundColor: fillColor,
        }}
      />
      {/* Text Overlay */}
      <View
        className="flex-row items-center absolute left-0 top-0 w-full h-full px-6"
        pointerEvents="none"
      >
        <View className="flex-1">
          {startText ? (
            <Text style={{ color: textColor }} className=" font-semibold">
              {startText}
            </Text>
          ) : null}
        </View>
        <View className="flex-1 items-center">
          {centerText ? (
            <Text
              style={{ color: textColor, textAlign: "center" }}
              className="font-semibold"
            >
              {centerText}
            </Text>
          ) : null}
        </View>
        <View className="flex-1 items-end">
          {endText ? (
            <Text
              style={{ color: textColor, textAlign: "right" }}
              className="font-semibold"
            >
              {endText}
            </Text>
          ) : null}
        </View>
      </View>
      {/* Spacer for bar height */}
      <View style={{ height }} />
    </View>
  );
};

export default LoadingBar;
