import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const transactions = [
  { id: "1", title: "Course Purchase", amount: "$49.99", date: "2025-02-20" },
  { id: "2", title: "Subscription", amount: "$19.99", date: "2025-02-15" },
  { id: "3", title: "Refund", amount: "+$10.00", date: "2025-02-10" },
];

const TransactionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Back Button */}
      <View className="flex-row items-center py-3 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <AntDesign name="left" size={24} color="blue" />
        </TouchableOpacity>
        <Text className="text-xl font-['PoppinsBold'] ml-4">Your Transactions</Text>
      </View>

      {/* Transaction List */}
      <View className="mt-4">
        <Text className="text-lg font-['PoppinsSemiBold'] mb-2">Recent History</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg my-2">
              <View className="flex-1">
                <Text className="text-lg font-['Poppins']">{item.title}</Text>
                <Text className="text-sm text-gray-500 font-['PoppinsMed']">{item.date}</Text>
              </View>
              <Text className={`text-lg font-['PoppinsSemiBold'] ${item.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {item.amount}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionScreen;
