import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useStore } from "@/hooks/useStore";

export default function StoreHeader() {
  const { t } = useTranslation();
  const { store } = useStore();
  return (
    <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
      <View className="flex-row-reverse items-center mb-4">
        <View className="bg-primary/10 w-16 h-16 rounded-full items-center justify-center mr-4">
          <Image
            source={{ uri: store?.logo }}
            style={{ width: 32, height: 32, borderRadius: 16 }}
          />
        </View>
        <View className="flex-1 items-end justify-end mx-2">
          <Text className="text-2xl font-bold text-black-800">
            {store?.name}
          </Text>
          <Text className="text-black mt-1">{t("store.store_management")}</Text>
        </View>
      </View>
    </View>
  );
}
