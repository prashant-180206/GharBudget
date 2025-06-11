import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
  ScrollView,
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
        <View className="bg-white rounded-3xl p-6 mb-6 shadow h-4/6 lg:w-[75vw] lg:ml-[11vw] lg:scrollbar-none">
          <View className="flex-1">
            <ScrollView className="flex-1 bg-white p-6">
              <Text className="text-2xl font-bold mb-4 text-center">
                Terms and Conditions
              </Text>

              <Text className="text-base text-gray-700 mb-2">
                Welcome to our Expense Manager App designed especially for
                homemakers. By using our application, you agree to the following
                terms and conditions. Please read them carefully.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                1. Use of the App
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                This app is intended to help you manage household expenses by
                tracking your budget, spending, and savings. It is a personal
                tool and should not be used for commercial purposes.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                2. Data Privacy
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                Your data is stored securely using cloud services and will not
                be shared with third parties. We may collect anonymous usage
                data to improve app performance and features.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                3. User Accounts
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                You are responsible for maintaining the confidentiality of your
                account information. Please do not share your login credentials
                with others.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                4. Limitations
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                We strive to maintain accurate financial tracking, but the app
                may not always reflect real-time or error-free data. It is
                recommended to double-check records for accuracy.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                5. Modifications
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                We reserve the right to update these terms and conditions at any
                time. Continued use of the app after changes implies your
                acceptance of the new terms.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                6. Termination
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                We may suspend or terminate access to the app if there is a
                breach of these terms or for any misuse of the service.
              </Text>

              <Text className="text-lg font-semibold mt-4 mb-1">
                7. Contact Us
              </Text>
              <Text className="text-base text-gray-700 mb-2">
                For any questions or feedback, feel free to contact us at
                support@gharbudget.app.
              </Text>

              <Text className="text-sm text-gray-500 mt-6 text-center">
                Last updated: June 8, 2025
              </Text>
            </ScrollView>
          </View>
        </View>

        {/* Checkbox and Accept */}
        <View className="flex-row items-center justify-between bg-white px-4 py-3 rounded-full shadow">
          <TouchableOpacity
            className="flex-row items-center space-x-2"
            onPress={() => setAccepted(!accepted)}
          >
            <Ionicons
              name={accepted ? "checkbox-outline" : "square-outline"}
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
