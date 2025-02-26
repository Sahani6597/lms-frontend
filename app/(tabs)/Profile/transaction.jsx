import { View, Text, TouchableOpacity, FlatList, ScrollView} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const transactions = [
  { id: "1", title: "Course Purchase", amount: "$49.99", date: "2025-02-20" },
  { id: "2", title: "Subscription", amount: "$19.99", date: "2025-02-15" },
  { id: "3", title: "Refund", amount: "+$10.00", date: "2025-02-10" },
  
];

const TransactionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-2 ">
      {/* Back Button */}
      <View className="flex-row items-center py-3 border-b border-gray-300">
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={30} color="blue" />
        </TouchableOpacity>
        <Text className="text-2xl font-['PoppinsBold'] ml-4">Your Transaction</Text>
      </View>


      {/* Transaction List */}
      <View className="px-2 my-2">
      <Text className="text-lg font-['PoppinsSemiBold']">Recent History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-3 bg-gray-200 my-2 rounded-lg">
            <Text className="text-lg font-['Poppins']">{item.title}</Text>
            <Text className={`text-lg font-['PoppinsSemiBold'] ${item.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {item.amount}
            </Text>
            <Text className="text-sm text-gray-700 font-['PoppinsMed']">{item.date}</Text>
          </View>
        )}
      />
      </View>
    </SafeAreaView>
  );
};

export default TransactionScreen;
