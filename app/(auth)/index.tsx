import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/FirebaseConfig";

const index = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-[#cddcd5] flex flex-col items-center justify-center">
        <Image
          source={require("../../assets/logo.jpg")}
          style={{ width: 400, height: 400 }}
        ></Image>
        <Text className="mb-4 text-xl font-bold">
          Finane Made Easy For Homemakers
        </Text>
        <Text className="w-5/6 text-center font-semibold">
          Get Started With Us For Managing Your Finance With Ease
        </Text>
        <TouchableOpacity
          className="bg-primary rounded-full p-2 mt-20 w-3/6"
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text className="text-center text-xl font-semibold">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-col_bg-dark rounded-full p-2 my-2 w-3/6"
          onPress={() => {
            router.push("/(auth)/signup");
          }}
        >
          <Text className="text-center text-xl font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default index;
