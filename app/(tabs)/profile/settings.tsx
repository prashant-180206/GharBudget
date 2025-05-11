import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";

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
      className="flex-row items-center px-5 py-4 mb-4 bg-white rounded-xl"
    >
      <View className="bg-primary p-2 rounded-full mr-4">
        <IconComponent name={iconName as any} size={18} color="#fff" />
      </View>
      <Text className="text-base text-black flex-1">{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 bg-col_bg rounded-t-[60px] pt-20 px-6">
        <View className="p-1">
          <SettingItem
            iconName="notifications-outline"
            iconType="Ionicons"
            label="Notification Settings"
            onPress={() => router.push('/(tabs)/profile/notificationSettings')} // Using router.push
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
