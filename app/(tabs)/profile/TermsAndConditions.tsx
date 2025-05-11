import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      // Proceed to next step or go back
      alert("Terms accepted.");
    } else {
      alert("Please accept the terms and conditions first.");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-[#E5F7F0] px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-center text-[#052224]">
            Terms And Conditions
          </Text>
        </View>

        {/* Content */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow">
          <Text className="text-base text-[#052224] mb-2">
            Est fugiat assumenda aut reprehenderit
          </Text>
          <Text className="text-sm text-gray-600 mb-4 leading-7">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


          </Text>
          
        </View>

        {/* Checkbox and Accept */}
        <View className="flex-row items-center justify-between bg-white px-4 py-3 rounded-full shadow">
          <TouchableOpacity
            className="flex-row items-center space-x-2"
            onPress={() => setAccepted(!accepted)}
          >
            <Ionicons
              name={
                accepted
                  ? "checkbox-outline"
                  : "square-outline"
              }
              size={24}
              color="#052224"
            />
            <Text className="text-sm text-[#052224]">
              I accept all the terms and conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAccept}
            disabled={!accepted}
            className={`px-6 py-2 rounded-full ${
              accepted ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <Text className="text-white font-semibold">Accept</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
