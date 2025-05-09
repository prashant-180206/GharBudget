import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Dashboard from "@/components/tabs/Dashboard";
import { useAppData } from "@/context/AppContext";
import CombinedList from "@/components/tabs/ExpenseView";

// import Btn from "@/components/Btn";

const home = () => {
  const router = useRouter();

  const { userData } = useAppData();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[30%] flex flex-col items-center justify-start">
          <View className="w-5/6 flex flex-row items-center justify-between m-3">
            <View>
              <Text className="text-heading font-bold text-2xl ">
                Hello !, {userData?.fullName.split(" ")[0]} 
              </Text>
              <Text className="text-heading-secondary font-semibold">
                Welcome Back
              </Text>
            </View>

            <Pressable onPress={() => {}}>
              <View className="p-2 bg-white rounded-full">
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </View>
            </Pressable>
          </View>

          <TouchableOpacity
            className="w-full flex-grow flex flex-col justify-center items-center "
            onPress={() => {
              router.push("/(tabs)/Account_Details");
            }}
          >
            <Dashboard />
          </TouchableOpacity>
        </View>

        <View className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] flex flex-col items-center justify-start gap-0  ">
          <View className="h-full w-full pt-12 pb-32 overflow-hidden px-6">
            <CombinedList />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default home;
