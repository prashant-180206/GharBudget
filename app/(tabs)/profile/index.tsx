import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "@/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/colors";
import { useAppData } from "@/context/AppContext";

export default function ProfileScreen() {
  const router = useRouter();

  const { userData } = useAppData();

  const [username, setUsername] = useState("Loading...");
  const [userId, setUserId] = useState("");

  const menuItems = [
    {
      title: "Edit Profile",
      icon: "create-outline",
      screen: "/(tabs)/profile/editprofile",
    },
    {
      title: "Security",
      icon: "lock-closed-outline",
      screen: "/(tabs)/profile/security",
    },
    {
      title: "Settings",
      icon: "settings-outline",
      screen: "/(tabs)/profile/settings",
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      screen: "/(tabs)/profile/help",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      action: () => {
        auth.signOut();
        router.replace("/(auth)/login");
      },
    },
  ];
  useEffect(() => {
    setUsername(userData?.fullName as any);
    setUserId(auth.currentUser?.uid as any);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 bg-col_bg absolute bottom-0 w-full h-[90%] rounded-t-[60px] pt-20 px-6">
          {/* Profile Image */}
          <View className="absolute -top-14 self-center">
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/uyT08IJT10/f0xci0gx_expires_30_days.png",
              }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
          </View>

          {/* Username & ID */}
          <View className="items-center mb-6">
            <Text className="text-lg font-bold text-heading">{username}</Text>
            <Text className="text-sm text-Txt">ID: {userId}</Text>
          </View>

          {/* Menu List */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                item.action ? item.action() : router.push(item.screen as any)
              }
              className="flex-row items-center bg-col_bg p6 rounded-xl px-4 py-3 mb-4"
            >
              <View className="p-2 bg-button-light rounded-2xl">
                <Ionicons
                  name={item.icon as any}
                  size={40}
                  color={Colors.col_bg.DEFAULT}
                />
              </View>
              <Text className="text font-medium text-[#222] ml-4">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

// Below are basic templates for each routed screen:

export function EditProfile() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold">Edit Profile Screen</Text>
    </View>
  );
}

export function Security() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold">Security Screen</Text>
    </View>
  );
}

export function Settings() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold">Settings Screen</Text>
    </View>
  );
}

export function Help() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold">Help & Support Screen</Text>
    </View>
  );
}
