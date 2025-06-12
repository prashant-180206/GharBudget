import React from "react";
import { View, Text } from "react-native";

// Vibrant colors palette
const vibrantColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Aqua
  "#FFD93D", // Yellow
  "#1A936F", // Green
  "#FF5E5B", // Coral
  "#3A86FF", // Blue
  "#FFBE0B", // Orange
  "#6A4C93", // Purple
  "#8338EC", // Violet
  "#FB5607", // Deep Orange
];

type PieSliceData = {
  name: string;
  value: number;
  // color is no longer required
};

type ProcessedSlice = PieSliceData & {
  color: string;
  rotation: number;
  angle: number;
};

type CustomHalfPieChartProps = {
  data: PieSliceData[];
  backgroundColor?: string;
};

const getPieSlices = (inputData: PieSliceData[]): ProcessedSlice[] => {
  const total = inputData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return inputData.map((item, idx) => {
    const angle = (item.value / total) * 180;
    const slice: ProcessedSlice = {
      ...item,
      color: vibrantColors[idx % vibrantColors.length],
      rotation: currentAngle,
      angle,
    };
    currentAngle += angle;
    return slice;
  });
};

const CustomHalfPieChart: React.FC<CustomHalfPieChartProps> = ({
  data,
  backgroundColor = "#ffffff",
}) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const pieSlices = getPieSlices(sortedData);

  return (
    <View
      className="w-full flex flex-row items-center justify-between px-10 rounded-3xl"
      style={{ backgroundColor }}
    >
      {/* Pie Chart */}
      <View className="w-3/6 lg:w-[25vw] aspect-[2/1] overflow-hidden">
        <View className="w-full lg:w-[25vw] aspect-square items-center justify-center">
          {/* Background semi-circle */}
          <View className="h-full w-full rounded-full z-10 absolute">
            <View className="absolute bottom-0 h-1/2 w-full rounded-b-full" />
          </View>

          {/* Pie slices */}
          {pieSlices.map((slice, idx) => (
            <View
              key={`${slice.name}-${idx}`}
              className="absolute w-full h-full items-center justify-end"
              style={{
                transform: [{ rotate: `${180 - slice.rotation}deg` }],
              }}
            >
              <View
                className="w-full h-1/2 rounded-b-full absolute bottom-0"
                style={{ backgroundColor: slice.color }}
              />
            </View>
          ))}

          {/* Inner circle for donut effect */}
          <View
            className="absolute w-5/6 h-5/6 rounded-full z-10"
            style={{ backgroundColor }}
          />
        </View>
      </View>
      {/* Legend with values */}
      <View className="z-50 mr-8 lg:ml-10 flex-col justify-center gap-2 p-2 ">
        {pieSlices.map((slice, idx) => (
          <View
            key={`${slice.name}-${idx}`}
            className="flex-row justify-between items-center gap-2 mb-1"
          >
            <View className="flex flex-row gap-2">
              <View
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <Text className="text-xs text-black text-left">{slice.name}</Text>
            </View>
            <Text className="text-xs text-gray-600 ml-1 font-semibold">
              {slice.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomHalfPieChart;
