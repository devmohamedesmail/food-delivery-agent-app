import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-provider";
import Colors from "@/constants/Colors";

export default function StoreHeader() {
  const { t } = useTranslation();
  const { store } = useStore();
  const router = useRouter();
  const { theme } = useTheme();
  const activeColors = Colors[theme];

  return (
    <View
      className="rounded-xl p-6 mb-6 shadow-sm"
      style={{
        backgroundColor: activeColors.background,
        borderWidth: theme === 'dark' ? 1 : 0,
        borderColor: theme === 'dark' ? '#333' : 'transparent'
      }}
    >
      <View>
        <TouchableOpacity className="" onPress={() =>
          router.push({
            pathname: "/stores/update",
            params: { data: JSON.stringify(store) },
          })
        }>
          <Text style={{ color: activeColors.tint }}>{t("store.update_store")}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row-reverse items-center mb-4">
        <View className="bg-primary/10 w-16 h-16 rounded-full items-center justify-center mr-4">
          <Image
            source={{ uri: store?.logo }}
            style={{ width: 32, height: 32, borderRadius: 16 }}
          />
        </View>
        <View className="flex-1 items-end justify-end mx-2">
          <Text
            className="text-2xl font-bold"
            style={{ color: activeColors.text }}
          >
            {store?.name}
          </Text>
          <Text
            className="mt-1"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#000' }}
          >
            {t("store.store_management")}
          </Text>
        </View>
      </View>
    </View>
  );
}
