import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationItem({ item }: any) {
  return (
    <TouchableOpacity
      onPress={() => {}}
      key={item.id}
      className="border rounded-md border-gray-100 py-10 bg-white mb-2 px-4"
    >
      <View className="flex flex-row justify-end items-center">
        <View className="flex items-end">
          <Text>{item.title}</Text>
          <Text>{item.message}</Text>
        </View>

        <View
          className={` p-2 rounded-full ml-4 ${item?.is_read ? "bg-primary" : "bg-red-600"}`}
        >
          <Ionicons name="notifications" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
