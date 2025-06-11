import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      if (!currentPassword) {
        setError("Current password is required.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email ? user.email : "a@a.in",
        currentPassword
      );

      // 🔐 Re-authenticate user before password change
      await reauthenticateWithCredential(user, credential);

      // 🔁 Update Firebase Auth password
      await updatePassword(user, newPassword);

      // ⚠️ OPTIONAL: Update Firestore password field (not recommended in plaintext)
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        password: newPassword, // ❗ Insecure: Do NOT store raw passwords in Firestore in real-world apps
      });

      setError("");
      Alert.alert("Success", "Password changed successfully!");
      router.back();
    } catch (err) {
      console.error(err);
      if ((err as Error).message === "auth/wrong-password") {
        setError("Current password is incorrect.");
      } else {
        setError("Try with Correct Password");
      }
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView className="flex-1 bg-col_bg absolute bottom-0 w-full lg:w-[50vw] h-[90%] lg:h-[95%] rounded-t-[60px] pt-20 lg:pt-12 lg:ml-[25vw] px-6 z-0">
          <View className="items-center mb-6">
            <Text className="text-lg lg:text-[1.5em] font-bold text-heading-secondary lg:pt-3 lg:pb-8">
              Change Password
            </Text>
          </View>

          {/* Current Password */}
          <View className="mb-6 lg:w-[30vw] lg:ml-[8vw]">
            <Text className="text-base text-heading-secondary font-medium mb-2">
              Current Password :
            </Text>
            <View className="flex-row items-center bg-col_bg-dark rounded-full px-4">
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor="#888"
                secureTextEntry={!showCurrentPassword}
                className="flex-1 text-Txt lg:py-3"
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View className="mb-6 lg:w-[30vw] lg:ml-[8vw]">
            <Text className="text-base text-heading-secondary font-medium mb-2">
              New Password :
            </Text>
            <View className="flex-row items-center bg-col_bg-dark rounded-full px-4">
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#888"
                secureTextEntry={!showNewPassword}
                className="flex-1 text-Txt lg:py-3"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-6 lg:w-[30vw] lg:ml-[8vw]">
            <Text className="text-base text-heading-secondary font-medium mb-2">
              Confirm Password :
            </Text>
            <View className="flex-row items-center bg-col_bg-dark rounded-full px-4">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter new password"
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
                className="flex-1 text-Txt lg:py-3"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {error !== "" && (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            className="bg-primary rounded-3xl py-3 items-center mb-8 lg:w-[30vw] lg:ml-[8vw] lg:mt-5"
          >
            <Text className="text-white text-base font-semibold">
              Change Password
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
