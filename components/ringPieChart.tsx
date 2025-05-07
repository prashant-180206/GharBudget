import React from "react";
import { View } from "react-native";

type PieSliceData = {
  name: string;
  value: number;
  color: string;
};

type ProcessedSlice = PieSliceData & {
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

  return inputData.map((item) => {
    const angle = (item.value / total) * 180;
    const slice: ProcessedSlice = {
      ...item,
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
    <View className="w-4/6 aspect-square relative items-center justify-center">
      {/* Background semi-circle */}
      <View className="h-full w-full rounded-full z-10 absolute">
        <View
          className="absolute bottom-0 h-1/2 w-full rounded-b-full"
          style={{ backgroundColor:backgroundColor }}
        />
      </View>

      {/* Pie slices */}
      {pieSlices.map((slice, index) => (
        <View
          key={index}
          className="absolute w-full h-full items-center justify-end"
          style={{ transform: [{ rotate: `${180-slice.rotation}deg` }] }}
        >
          <View
            className="w-full h-1/2 rounded-b-full absolute bottom-0"
            style={{ backgroundColor: slice.color }}
          />
        </View>
      ))}

      {/* Inner white circle for donut effect */}
      <View className="absolute w-5/6 h-5/6 rounded-full z-10"  
      style={{backgroundColor}}
      />
    </View>
  );
};

export default CustomHalfPieChart;
