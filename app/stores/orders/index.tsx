import useFetch from "@/hooks/useFetch";
import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { AuthContext } from "@/context/auth_context";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import OrderItem from "@/components/order/OrderItem";
import Loading from "@/components/ui/Loading";
import { useRouter } from "expo-router";
import NoOrdersFound from "@/components/order/NoOrdersFound";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "@/components/ui/Layout";
import Header from "@/components/ui/Header";
import { useStore } from "@/hooks/useStore";
import FilterSection from "@/components/order/FilterSection";
import OrderSkeleton from "@/components/order/OrderSkeleton";

type OrderStatus =
  | "all"
  | "pending"
  | "accepted"
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "cancelled";
interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
}

interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  order: string;
  status: string;
  total_price: string;
  delivery_address: string;
  placed_at: string;
  delivered_at: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  restaurant: Restaurant;
}
export default function Orders() {
  const { t } = useTranslation();
  const { store } = useStore();
  const {
    data,
    loading: orderLoading,
    refetch: refetchOrders,
  } = useFetch(`/orders/store/${store?.id}`);
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");
  const orders = data?.data || [];

  const tabs: { key: OrderStatus; label: string; count?: number }[] = [
    { key: "all", label: t("orders.all") },
    { key: "pending", label: t("orders.pending") },
    { key: "accepted", label: t("orders.accepted") },
    { key: "preparing", label: t("orders.preparing") },
    { key: "on_the_way", label: t("orders.onTheWay") },
    { key: "delivered", label: t("orders.delivered") },
    { key: "cancelled", label: t("orders.cancelled") },
  ];

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    if (activeTab === "all") return orders;
    return orders.filter((order: Order) => order.status === activeTab);
  }, [orders, activeTab]);


  return (
    <Layout>
      <Header title={t("orders.title")} />
      {orderLoading ? (
        <OrderSkeleton />
      ) : (
        <>
          <FilterSection
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <View>
            {filteredOrders.length === 0 ? (
              <NoOrdersFound />
            ) : (
              <FlatList
                data={Array.isArray(filteredOrders) ? filteredOrders : []}
                renderItem={({ item }) =>
                  item && (
                    <OrderItem item={item} refetchOrders={refetchOrders} />
                  )
                }
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<NoOrdersFound />}
              />
            )}
          </View>
        </>
      )}
    </Layout>
  );
}
