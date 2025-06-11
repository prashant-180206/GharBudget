import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      title: "Terms And Conditions",
      icon: "document-text-outline",
      screen: "/(tabs)/profile/TermsAndConditions",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      action: () => {
        setShowLogoutModal(true);
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
      <View className="flex-1 bg-primary">
        <View className="flex-1 bg-col_bg absolute bottom-0 lg:left-[25vw] w-full lg:w-[50vw] h-[90%] rounded-t-[60px] pt-20 px-6">
          {/* Profile Image */}
          <View className="absolute -top-14 self-center">
            <Image
              source={{
                uri: "https://imgs.search.brave.com/Q1ZKwaWJjUTcBmXmtx35cQXh74LdnUuOF-TfPt1AYpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAx/Njc0NDAzNC92ZWN0/b3IvcHJvZmlsZS1w/bGFjZWhvbGRlci1p/bWFnZS1ncmF5LXNp/bGhvdWV0dGUtbm8t/cGhvdG8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVJxdGky/NlZRal9mcy1faEwx/NW1KajZiODRGRVpO/YTAwRkpnWlJhRzVQ/RDQ9",
              }}
              className="w-28 h-28 rounded-full border-4  border-white"
            />
          </View>

          {/* Username & ID */}
          <View className="items-center mb-6 lg:mb-[5px]">
            <Text className="text-lg font-bold lg:mb-0 text-heading">{username}</Text>
            <Text className="text-sm opacity-50 text-Txt">ID : {userId.slice(0, 10)}</Text>
          </View>

          {/* Menu List */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                item.action ? item.action() : router.push(item.screen as any)
              }
              className="flex-row items-center bg-col_bg p6 rounded-xl px-4 lg:pl-[5vw] py-3 lg:py-[1px] mb-4"
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
        <Modal
          visible={showLogoutModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-white p-6 rounded-xl w-4/5 items-center">
              <Text className="text-lg font-semibold mb-4">Confirm Logout</Text>
              <Text className="text-center mb-6 text-gray-600">
                Are you sure you want to log out of your account?
              </Text>
              <View className="flex-row justify-between w-full">
                <TouchableOpacity
                  onPress={() => setShowLogoutModal(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg mr-2 items-center"
                >
                  <Text className="text-gray-700 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    auth.signOut();
                    setShowLogoutModal(false);
                    router.replace("/(auth)/login");
                  }}
                  className="flex-1 bg-red-500 py-2 rounded-lg ml-2 items-center"
                >
                  <Text className="text-white font-medium">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
