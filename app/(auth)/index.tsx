import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView className=" w-full h-full p-4 flex items-center justify-center bg-col_bg-light">
      <View className="flex flex-col gap-4 p-8 max-w-[500px] m-4  rounded-xl w-full ">
        <Text className="text-3xl font-bold text-heading mb-4 text-center">
          Login
        </Text>
        <TextInput
          placeholder="Enter Username / Email "
          className="p-4 bg-col_bg-dark rounded-full  border-2 border-primary-dark text-Txt-secondary text-m"
        />
        <TextInput
          placeholder="Enter Password"
          className="p-4 bg-col_bg-dark rounded-full text-Txt-secondary border-2 border-primary-dark"
          secureTextEntry={true}
        />
        <TouchableOpacity
          className="bg-button-dark rounded-full p-4 text-center text-xl text-Txt-light"
          onPress={() => {
            router.push("/(tabs)/home");
          }}
        >
          <Text className="text-xl text-Txt-light text-center">Login</Text>
        </TouchableOpacity>
        <Link href={"/(auth)/forgot_password"} className="text-center">
          <Text className="text-Txt-secondary text-center">
            Forgot Password
          </Text>
        </Link>
        <Link href={"/(auth)/signup"} className="text-center">
          <Text className="text-Txt-secondary text-center">
            Create New Account
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index;
