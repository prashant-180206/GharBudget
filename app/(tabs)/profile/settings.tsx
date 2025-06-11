import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Colors } from "@/assets/colors";

type SettingItemProps = {
  iconName: string;
  iconType?: 'Ionicons' | 'FontAwesome5' | 'Entypo';
  label: string;
  onPress: () => void;
};

const SettingItem = ({ iconName, iconType = 'Ionicons', label, onPress }: SettingItemProps) => {
  const IconComponent =
    iconType === 'FontAwesome5'
      ? FontAwesome5
      : iconType === 'Entypo'
      ? Entypo
      : Ionicons;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-col_bg rounded-xl px-4 py-3 mb-4"
    >
      <View className="p-2 bg-button-light rounded-2xl">
        <IconComponent name={iconName as any} size={40} color={Colors.col_bg.DEFAULT} />
      </View>
      <Text className="text font-medium text-[#222] ml-4">{label}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 bg-col_bg rounded-t-[60px] pt-20 lg:pt-[10vw] lg:ml-[25vw] lg:pl-[15vw] lg:w-[50vw] px-6">
        <View className="p-1">
          <SettingItem
            iconName="notifications-outline"
            iconType="Ionicons"
            label="Notification Settings"
            onPress={() => router.push('/(tabs)/profile/notificationSettings')}
          />
          <SettingItem
            iconName="key"
            iconType="FontAwesome5"
            label="Password Settings"
            onPress={() => router.push("/(tabs)/profile/ChangePassword")}
          />
          <SettingItem
            iconName="user"
            iconType="FontAwesome5"
            label="Delete Account"
            onPress={() => router.push('/(tabs)/profile/deleteAccount')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
