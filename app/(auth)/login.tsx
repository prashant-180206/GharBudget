import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
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

  const [Seepassword, setSeepassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [SeeMsg, SetSeeMsg] = useState(false);

  const login = async () => {
    // console.log("Trying to login with:", Email.trim(), Password.trim());

    await signInWithEmailAndPassword(auth, Email.trim(), Password.trim())
      .then((userCredential) => {
        router.push("/(tabs)/home");
      })
      .catch((err) => {
        Alert.alert("Login Error", err.message);
      });
  };

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
        <View className="w-full h-5/6 bg-col_bg absolute bottom-0 rounded-t-[80px] lg:w-[50vw] lg:ml-[25vw] flex-col items-center justify-start py-20 ">
          {SeeMsg && (
            <Text className=" text-danger text-xl">
              {" "}
              Username Or Password is Incorrect
            </Text>
          )}
          <View className="w-5/6 mt-14 ">
            <Text className="p-2 font-semibold lg:ml-[5vw]">Username or Email</Text>

            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-[1vh] lg:w-[30vw] lg:ml-[5vw]"
              placeholder="Enter Email"
              value={Email}
              onChangeText={(tex) => {
                setEmail(tex);
                SetSeeMsg(false);
              }}
            ></TextInput>
          </View>
          <View className="w-5/6 mt-4">
            <Text className="p-2 font-semibold lg:ml-[5vw]">Password</Text>
            <View className="bg-col_bg-dark  rounded-full flex-row justify-between items-center lg:w-[30vw] lg:ml-[5vw]">
              <TextInput
                className=" px-6 flex-row justify-between py-[1vh] focus:outline-none lg:w-[100%]"
                placeholder="Enter Password"
                secureTextEntry={!Seepassword}
                value={Password}
                onChangeText={(tex) => {
                  setPassword(tex);
                  SetSeeMsg(false);
                }}
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
            onPress={login}
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

          <Text className="text-sm font-semibold">
            Don't Have an Account ? Sign Up
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;
