import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig"; // Make sure Firebase is set up properly
import { Colors } from "../../assets/colors"; // Assuming you have a Colors file for styling
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let formErrors = { ...errors }; // Copy existing errors to modify

    // Full name validation
    if (!fullName.trim()) {
      formErrors.fullName = "Full Name is required.";
    } else {
      formErrors.fullName = "";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formErrors.email = "Please enter a valid email.";
    } else {
      formErrors.email = "";
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(mobile)) {
      formErrors.mobile = "Mobile number should be 10 digits.";
    } else {
      formErrors.mobile = "";
    }

    // Password validation
    if (password.length < 6) {
      formErrors.password = "Password should be at least 6 characters long.";
    } else {
      formErrors.password = "";
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    } else {
      formErrors.confirmPassword = "";
    }

    setErrors(formErrors);
    return Object.values(formErrors).every((error) => error === "");
  };

  const signUp = async () => {
    if (!validateForm()) return;
    try{
      const userCredential =createUserWithEmailAndPassword(auth,email,password)
      const user = (await userCredential).user

      await setDoc(doc(db,'users',user.uid),{
        fullName,
        mobile,
        email,
        password,
        Created_at :new Date(),
      })

      router.push('/(auth)')
    }catch{
      console.log('error occured gvtvv')
    }
    router.push('/(auth)')
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary">
        <View className="w-full h-1/6 flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">
            Create Account
          </Text>
        </View>

        <View className="w-full h-5/6 bg-col_bg absolute bottom-0 rounded-t-[80px] flex-col items-center justify-start py-10">
          <View className="w-5/6 mb-4">
            <Text className="p-2 font-semibold">Full Name</Text>
            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-2"
              placeholder="Enter Full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setErrors((prev) => ({ ...prev, fullName: "" })); // Clear error on input change
              }}
            />
            {errors.fullName ? (
              <Text className="text-red-500 text-sm">{errors.fullName}</Text>
            ) : null}
          </View>

          <View className="w-5/6 mb-4">
            <Text className="p-2 font-semibold">Email</Text>
            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-2"
              placeholder="Enter Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: "" })); // Clear error on input change
              }}
              keyboardType="email-address"
            />
            {errors.email ? (
              <Text className="text-red-500 text-sm">{errors.email}</Text>
            ) : null}
          </View>

          <View className="w-5/6 mb-4">
            <Text className="p-2 font-semibold">Mobile Number</Text>
            <TextInput
              className="bg-col_bg-dark w-full rounded-full px-6 py-2"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                setErrors((prev) => ({ ...prev, mobile: "" })); // Clear error on input change
              }}
              keyboardType="numeric"
              maxLength={10}
            />
            {errors.mobile ? (
              <Text className="text-red-500 text-sm">{errors.mobile}</Text>
            ) : null}
          </View>

          <View className="w-5/6 mb-4">
            <Text className="p-2 font-semibold">Password</Text>
            <View className="bg-col_bg-dark rounded-full flex-row justify-between items-center">
              <TextInput
                className="px-6 w-full"
                placeholder="Enter Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "" })); // Clear error on input change
                }}
                secureTextEntry={!seePassword}
              />
              <TouchableOpacity onPress={() => setSeePassword((prev) => !prev)}>
                <Ionicons
                  name={seePassword ? "eye" : "eye-off"}
                  color={Colors.Txt.secondary}
                  size={28}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text className="text-red-500 text-sm">{errors.password}</Text>
            ) : null}
          </View>

          <View className="w-5/6 mb-4">
            <Text className="p-2 font-semibold">Confirm Password</Text>
            <View className="bg-col_bg-dark rounded-full flex-row justify-between items-center">
              <TextInput
                className="px-6 w-full"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" })); // Clear error on input change
                }}
                secureTextEntry={!seePassword}
              />
              <TouchableOpacity onPress={() => setSeePassword((prev) => !prev)}>
                <Ionicons
                  name={seePassword ? "eye" : "eye-off"}
                  color={Colors.Txt.secondary}
                  size={28}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text className="text-red-500 text-sm">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          <Text className="text-sm">By Continuing You Agree to</Text>
          <Text className="text-sm font-semibold">
            Terms and Conditions To Use
          </Text>

          <TouchableOpacity
            className="bg-primary rounded-full p-2 mt-4 w-3/6"
            onPress={signUp}
          >
            <Text className="text-center text-xl font-semibold">Sign Up</Text>
          </TouchableOpacity>

          <Link href="/(auth)" className="m-2 text-sm font-semibold">
            <Text>
              Already have an Account?{" "}
              <Text className="text-blue-400">Log In</Text>
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Signup;
