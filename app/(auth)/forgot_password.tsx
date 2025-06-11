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

const forgot_password = () => {
  const router =useRouter()


  const [email, setemail] = useState("");
  const [SeeMsg, setSeeMsg] = useState(false);

  const resetlink =()=>{
    try{
      Alert.alert('Reset Mail Sent , Try to Login')

    }catch{
      setSeeMsg(true)
    }

  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-1/6 flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">
            Forgot Password
          </Text>
        </View>
        <View className="w-full h-5/6 bg-col_bg absolute bottom-0 rounded-t-[80px] flex-col items-center justify-start py-20 ">
          <Text className="text-left w-5/6 font-semibold text-xl">
            Reset Password ?
          </Text>
          <Text className="w-5/6 ">
            Enter Your Email Address to get a Link to reset Your Password{" "}
          </Text>

          {SeeMsg && <Text className="text-sm text-danger">Check Email </Text>}

          <View className="w-5/6 mt-14">
            <Text className="p-2 font-semibold">Enter Email Address </Text>

            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-"
              placeholder="Enter Email"
              value={email}
              onChangeText={(tex) => {
                setemail(tex);
                setSeeMsg(false);
              }}
            />
          </View>

          <TouchableOpacity
            className="bg-primary rounded-full p-2 mt-20 w-3/6"
            onPress={resetlink
            }
          >
            <Text className="text-center text-xl font-semibold">
              Send Reset Link
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary-light-100 rounded-full p-2 my-2 mt-20 w-3/6"
            onPress={() => {router.push('/(auth)/login')}}
          >
            <Text className="text-center text-xl font-semibold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-col_bg-dark rounded-full p-2 my-2 mt-10 w-3/6"
            onPress={() => {router.push('/(auth)/signup')}}
          >
            <Text className="text-center text-xl font-semibold">Sign Up</Text>
          </TouchableOpacity>

          <Text className="text-sm font-semibold">
            Don't Have an Account ? <Text className="text-blue-400">Sign Up</Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default forgot_password;
