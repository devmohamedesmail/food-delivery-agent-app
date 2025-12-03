import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header title={t("categories.categories")} />

      <View className="flex flex-row justify-end items-center my-2 px-4">
        <Button
          title={t("categories.add_category")}
          onPress={() => router.push("/stores/categories/add")}
        />
      </View>
      {children}
    </SafeAreaView>
  );
}
