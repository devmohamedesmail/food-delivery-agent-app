import React, { useEffect, useState } from "react";
import { TouchableOpacity, View , Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { io } from "socket.io-client";
import useFetch from "@/hooks/useFetch";

export default function NotificationIcon() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const {data}=useFetch(`/notifications/?notifiable_id=8&notifiable_type=store`)


  const socket = io("https://food-delivery-and-rides.onrender.com", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    // When disconnected
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);







  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => router.push({
          pathname: "/notification",
          params: {data: JSON.stringify(data?.data || [])},
        })}
        className="w-10 h-10 bg-white rounded-full items-center justify-center"
      >
        <Ionicons name="notifications" size={20} color="#fd4a12" />
      </TouchableOpacity>
      <View
        className={`absolute top-0 -right-1 w-5 h-5 flex flex-row items-center justify-center rounded-full ${isConnected ? "bg-green-600" : "bg-red-600"}`}
      >
        <Text className="text-center text-xs text-white">{data?.data?.length || 0}</Text>
      </View>
    </View>
  );
}
