import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import Btn from "@/components/Btn";

const home = () => {
  const router =useRouter()
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[30%] flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">Home</Text>
        </View>
        <View
          className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] 
        "
        >
          <TouchableOpacity 
          onPress={()=>{
            router.push()
          }}
          
          />

        </View>
      </SafeAreaView>
    </>
  );
};

export default home;
