import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DataItem = {
  column: string;
  income: number;
  expense: number;
};

type ChartProps = {
  data: DataItem[];
  maxHeight?: number;
  col1: String;
  col2: String; // Optional: height of the tallest bar in px
};

const Chart: React.FC<ChartProps> = ({
  data,
  maxHeight = 120,
  col1 = "Budget",
  col2 = "Expense",
}) => {
  // Find the maximum value in the data for scaling
  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => Math.max(item.income, item.expense)))
      : 1; // fallback to 1 if no data

  const yAxisLabels = [
    0,
    maxValue * 0.25,
    maxValue * 0.5,
    maxValue * 0.75,
    maxValue,
  ];

  {
    yAxisLabels.map((value, idx) => <Text key={idx}>{value}</Text>);
  }

  return (
    <View className="bg-green-100 p-4 rounded-2xl w-full h-[250px] lg:w-[25vw] overflow-hidden">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-base font-semibold text-gray-800">
          <View className="p-2 bg-green-500 mx-2 rounded-full" /> {col1} {"   "}
          <View className="p-2 mx-2 bg-blue-700 rounded-full" />{" "}
          {col2}
        </Text>
        <View className="flex-row space-x-3">
          <Pressable className="p-1 rounded-full bg-white">
            <Ionicons name="search" size={20} color="#047857" />
          </Pressable>
          <Pressable className="p-1 rounded-full bg-white">
            <Ionicons name="calendar-clear" size={20} color="#047857" />
          </Pressable>
        </View>
      </View>

      {/* Chart Area */}
      <View className="flex-row flex-1 justify-end items-end ">
        {/* Y-axis Labels */}
        <View className="h-[80%] mr-2 pb-4 justify-between ">
          {yAxisLabels
            .slice()
            .reverse()
            .map((value) => (
              <Text key={value} className="text-xs text-gray-500 font-semibold">
                {value === 0 ? "0" : `${value}`}
              </Text>
            ))}
        </View>

        {/* Bars */}
        <View className="flex-1 flex-row items-end justify-between  ">
          {data.map(({ column, income, expense }, index) => {
            const incomeHeight = Math.max((income / maxValue) * maxHeight, 6);
            const expenseHeight = Math.max((expense / maxValue) * maxHeight, 6);

            return (
              <View key={`${column}-${index}`} className="items-center flex-1">
                <View className="flex-row gap-1 mb-1 items-end">
                  <View
                    style={{ height: incomeHeight }}
                    className="w-1.5 bg-green-500 rounded-full"
                  />
                  <View
                    style={{ height: expenseHeight }}
                    className="w-1.5 bg-blue-500 rounded-full"
                  />
                </View>
                <Text className="text-xs text-gray-600 font-semibold overflow-hidden h-4">
                  {column}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Chart;
