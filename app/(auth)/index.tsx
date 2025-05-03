import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";

const index = () => {
  const router = useRouter();

  const [Seepassword, setSeepassword] = useState(false);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-1/6 flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">Welcome</Text>
        </View>
        <View className="w-full h-5/6 bg-col_bg absolute bottom-0 rounded-t-[80px] flex-col items-center justify-start py-20 ">
          <View className="w-5/6 mt-14">
            <Text className="p-2 font-semibold">Username or Email</Text>

            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-"
              placeholder="Enter Email"
            ></TextInput>
          </View>
          <View className="w-5/6 mt-4">
            <Text className="p-2 font-semibold">Password</Text>
            <View className="bg-col_bg-dark  rounded-full flex-row justify-between items-center">
              <TextInput
                className=" px-6 flex-row justify-between "
                placeholder="Enter Password"
                secureTextEntry={!Seepassword}
              ></TextInput>
              <TouchableOpacity
                onPress={() => {
                  if (Seepassword) {
                    setSeepassword(false);
                  } else {
                    setSeepassword(true);
                  }
                }}
              >
                <Ionicons
                  name={Seepassword ? "eye" : "eye-off"}
                  color={Colors.Txt.secondary}
                  size={28}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="bg-primary rounded-full p-2 mt-20 w-3/6"
            onPress={() => {
              router.push("/(tabs)/home");
            }}
          >
            <Text className="text-center text-xl font-semibold">Log In</Text>
          </TouchableOpacity>
          <Link
            href={"/(auth)/forgot_password"}
            className="m-2 text-sm font-semibold"
          >
            <Text>Forgot Password ?</Text>
          </Link>
          <TouchableOpacity
            className="bg-col_bg-dark rounded-full p-2 my-2 w-3/6"
            onPress={() => {
              router.push("/(auth)/signup");
            }}
          >
            <Text className="text-center text-xl font-semibold">Sign Up</Text>
          </TouchableOpacity>

          <Text className="text-sm font-semibold">
            Don't Have an Account ? Sign Up
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;
