import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "@/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfileEditScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUsername(data.fullName || "");
            setPhone(data.mobile || "");
            setEmail(data.email || "");
            setUserId(currentUser.uid.slice(0, 10));
          }
        }
      } catch (error) {
        console.log("Error getting user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (phone.length < 10) {
      setError("Phone number must be at least 10 digits long.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
          fullName: username,
          mobile: phone,
          email: email,
        });
        setError("");
        Alert.alert("Success", "Profile Updated Successfully!");
        router.back();
      }
    } catch (error) {
      // console.log("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView className="flex-1 bg-primary">
        <View className="absolute top-0 left-0 right-0 items-center mt-10 lg:mt-3 z-10">
          <Image
            source={{
              uri: "https://imgs.search.brave.com/Q1ZKwaWJjUTcBmXmtx35cQXh74LdnUuOF-TfPt1AYpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAx/Njc0NDAzNC92ZWN0/b3IvcHJvZmlsZS1w/bGFjZWhvbGRlci1p/bWFnZS1ncmF5LXNp/bGhvdWV0dGUtbm8t/cGhvdG8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVJxdGky/NlZRal9mcy1faEwx/NW1KajZiODRGRVpO/YTAwRkpnWlJhRzVQ/RDQ9",
            }}
            className="w-28 h-28 rounded-full border-4 border-white"
          />
        </View>

        <ScrollView className="flex-1 bg-col_bg absolute bottom-0 w-full  lg:w-[50vw] h-[90%] rounded-t-[60px] pt-20 px-6 lg:px-[5vw] lg:ml-[25%] z-0">
          <View className="items-center mb-6">
            <Text className="text-lg font-bold text-heading-secondary">Edit My Profile</Text>
            <Text className="text-sm text-Txt">ID: {userId}</Text>
          </View>

          <View className="mb-6">
            <Text className="text-base text-heading-secondary font-medium mb-2">Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              className="bg-col_bg-dark rounded-full px-4 py-3 text-Txt"
            />
          </View>

          <View className="mb-6">
            <Text className="text-base text-heading-secondary font-medium mb-2">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              className="bg-col_bg-dark rounded-full px-4 py-3 text-Txt"
            />
            {error !== "" && (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-base text-heading-secondary font-medium mb-2">Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              className="bg-col_bg-dark rounded-full px-4 py-3 text-Txt"
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-primary rounded-3xl py-3 items-center mb-8"
          >
            <Text className="text-white text-base font-semibold">Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
