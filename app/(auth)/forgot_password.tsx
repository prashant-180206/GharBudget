import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const forgot_password = () => {
  return (
    <SafeAreaView className=" w-full h-full p-4 flex items-center justify-center bg-col_bg-light">
      <View className="flex flex-col gap-4 p-8 max-w-[500px] m-4 w-full ">
        <Text className="text-3xl font-bold text-heading mb-4 text-center">
          Forgot Password
        </Text>
        <Text className="text-Txt text-center font-semibold">
          Enter Email to get Password Reset Link
        </Text>
        <TextInput
          placeholder="Enter Email "
          className="p-4 bg-col_bg-dark rounded-full  border-2 border-primary-dark text-Txt-secondary text-m"
        />
        <TouchableOpacity
          className="bg-button-dark rounded-full p-4 text-center text-xl text-Txt-light"
          onPress={() => {
            alert("Reset Link Sent");
          }}
        >
          <Text className="text-xl text-Txt-light text-center">Send Reset Link</Text>
        </TouchableOpacity>
        <Link href={"/(auth)"} className="text-center">
          <Text className="text-Txt-secondary text-center">Back to login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default forgot_password;
