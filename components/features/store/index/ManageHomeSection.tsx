import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-provider";
import Colors from "@/constants/Colors";

interface ManagementCard {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  bgColor: string;
}

export default function ManageHomeSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme();
  const activeColors = Colors[theme];

  const managementCards: ManagementCard[] = [
    {
      title: t("store.categories"),
      subtitle: t("store.manage_product_categories"),
      icon: "grid-outline",
      route: "/stores/categories",
      color: "#3B82F6",
      bgColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : "#EFF6FF",
    },
    {
      title: t("store.products"),
      subtitle: t("store.manage_your_products"),
      icon: "cube-outline",
      route: "/stores/products",
      color: "#10B981",
      bgColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : "#ECFDF5",
    },
    {
      title: t("store.orders"),
      subtitle: t("store.view_manage_orders"),
      icon: "receipt-outline",
      route: "/stores/orders",
      color: "#F59E0B",
      bgColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : "#FFFBEB",
    },
    {
      title: t("account.account"),
      subtitle: t("account.description"),
      icon: "person-outline",
      route: "/account",
      color: "#EF4444",
      bgColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : "#FEF2F2",
    },
  ];
  return (
    <View className="mb-4">
      <Text
        className="text-xl py-5 rounded-sm font-bold text-center border-b-2 border-b-primary mb-3 px-2"
        style={{ color: activeColors.text, backgroundColor: activeColors.background }}
      >
        {t("store.store_management")}
      </Text>

      <View className="space-y-3">
        {managementCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(card.route as any)}
            className="mb-2 rounded-xl p-5 shadow-sm active:opacity-70"
            activeOpacity={0.7}
            style={{
              backgroundColor: activeColors.background,
              borderWidth: theme === 'dark' ? 1 : 0,
              borderColor: theme === 'dark' ? '#333' : 'transparent'
            }}
          >
            <View className="flex-row-reverse items-center">
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{ backgroundColor: card.bgColor }}
              >
                <Ionicons name={card.icon} size={28} color={card.color} />
              </View>

              <View className="flex-1 justify-center items-end mx-2">
                <Text
                  className="text-lg font-bold"
                  style={{ color: activeColors.text }}
                >
                  {card.title}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  {card.subtitle}
                </Text>
              </View>

              <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
