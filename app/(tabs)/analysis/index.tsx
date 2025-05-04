import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const analysis = () => {
  const router = useRouter();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[30%] flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">Analysis</Text>
        </View>
        <View
          className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] 
        "
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/analysis/changebudget");
            }}
          >
            <Text>Change budget</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default analysis;
