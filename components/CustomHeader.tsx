// components/CustomHeader.tsx
import { View, Text, Pressable, StatusBar } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/colors";

export default function CustomHeader({ title = "" }) {
  
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={Colors.primary.DEFAULT}
      />
      <SafeAreaView className=" bg-primary px-6  h-[12vh] flex-row items-center justify-between ">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" className=" lg:scale-150 lg:pl-[2vw]" />
        </Pressable>
        <Text className="font-semibold text-2xl lg:text-3xl lg:font-bold">{title}</Text>
        <Pressable
          onPress={() => {
            router.push("/(tabs)/search");
          }}
        >
          <View className="p-2 bg-white rounded-full lg:mr-[2vw]">
            <Ionicons name="search" size={24} color="black" />
          </View>
        </Pressable>
      </SafeAreaView>
    </>
  );
}
