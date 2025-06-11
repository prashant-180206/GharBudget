import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useRouter } from "expo-router";

const DeleteAccountScreen = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleDeleteAccount = async () => {
    if (!currentUser) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let found = false;

      for (let docSnap of querySnapshot.docs) {
        const data = docSnap.data();

        // Match current user's email and entered password
        if (data.email === currentUser.email && data.password === password) {
          await deleteDoc(doc(db, "users", docSnap.id));

          // Optionally, sign out user
          await auth.signOut();

          // Show success alert and route to login
          Alert.alert(
            "Success",
            "Your account has been deleted.",
            [
              {
                text: "OK",
                onPress: () => {
                  // Navigate to the login screen after the alert is dismissed
                  router.replace("/(auth)/login");
                },
              },
            ],
            { cancelable: false }
          );
          found = true;
          break;
        }
      }

      if (!found) {
        Alert.alert("Error", "Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  const handleCancel = () => {
    Alert.alert("Cancelled", "Account deletion was cancelled.");
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* White Layer */}
        <View className="bg-col_bg-light rounded-t-[40px] pt-6 lg:pt-10 px-6 pb-2 mt-20 min-h-[100vh] lg:w-[50vw] lg:ml-[25vw] lg:mt-1">
          {/* Header Row */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="w-6" />
            <Text className="text-heading font-bold text-base">
              Delete Account
            </Text>
            <Ionicons name="person" size={24} color="#031314" />
          </View>

          {/* Confirmation Prompt */}
          <Text className="text-heading font-bold text-center text-sm mb-6 lg:mb-2">
            Are You Sure You Want To Delete Your Account?
          </Text>

          {/* Info Box */}
          <View className="bg-[#d9f5e4] rounded-2xl px-5 py-6 mb-6">
            <Text className="text-heading text-sm mb-4">
              This action will permanently delete all of your data, and you will
              not be able to recover it. Please keep the following in mind
              before proceeding:
            </Text>
            <Text className="text-heading text-sm leading-relaxed">
              • All your expenses, income, and associated transactions will be
              eliminated.{"\n\n"}• You will not be able to access your account
              or any related information.{"\n\n"}• This action cannot be undone.
            </Text>
          </View>

          {/* Password Prompt */}
          <Text className="text-heading text-center font-bold text-sm mb-4">
            Please Enter Your Password To Confirm Deletion Of Your Account.
          </Text>

          {/* Password Input */}
          <View className="flex-row items-center bg-col_bg-dark rounded-full px-4 mb-4 lg:w-[25vw] lg:ml-[10vw] lg:py-2">
            <TextInput
              className="flex-1 text-heading text-base"
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#031314"
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons name="eye-outline" size={20} color="#031314" />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="bg-primary rounded-full py-4 mb-4 lg:w-[25vw] lg:ml-[10vw]"
          >
            <Text className="text-heading text-center font-bold text-sm">
              Yes, Delete Account
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={handleCancel}
            className="bg-[#d9f5e4] rounded-full py-4 lg:w-[15vw] lg:ml-[15vw]"
          >
            <Text className="text-heading text-center font-bold text-sm">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccountScreen;
