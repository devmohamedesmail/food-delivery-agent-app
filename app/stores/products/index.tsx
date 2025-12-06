import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Alert,
  Text,
} from "react-native";

import axios from "axios";
import { config } from "@/constants/config";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import Skeleton from "@/components/ui/Skeleton";
import NoProductsFound from "@/components/products/NoProductsFound";
import Header from "@/components/ui/Header";
import ProductItem from "@/components/products/ProductItem";
import { useStore } from "@/hooks/useStore";
import Layout from "@/components/ui/Layout";
import FloatButton from "@/components/ui/FloatButton";

interface Product {
  id: number;
  store_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  image: string | null;
  on_sale: boolean;
  is_featured: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export default function Products() {
  const { t } = useTranslation();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { store, loading } = useStore();

  const {
    data: productsData,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useFetch(store?.id ? `/products/store/${store?.id}` : "");

  // Fetch categories for dropdown
  const { data: categoriesData } = useFetch(
    store?.id ? `/categories/store/${store?.id}` : ""
  );

  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
      setRefreshing(false);
    }
  }, [productsData]);

  const handleDelete = async (productId: number) => {
      Alert.alert(
        t("products.delete_product"),
        t("products.delete_product_confirmation"),
        [
          { text: t("products.cancel"), style: "cancel" },
          {
            text: t("products.delete"),
            style: "destructive",
            onPress: async () => {
              try {
                const response = await axios.delete(
                  `${config.URL}/products/${productId}`
                );
                if (response.data.success) {
                  Toast.show({
                    type: "success",
                    text1: t("products.product_deleted_successfully"),
                  });
                  refetchProducts();
                }

              } catch (error) {
                Toast.show({
                  type: "error",
                  text1: t("products.failed_to_delete_product"),
                });
              }
            },
          },
        ]
      );
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetchProducts();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Layout>
      <Header title={t("products.products")} />

      <View className="flex flex-row justify-between items-center px-5 py-5">
        <Text className="font-bold"> {t("products.products_count")} - {productsData?.data?.length}</Text>

        <TouchableOpacity 
          onPress={() => router.push("/stores/products/add")}
          className="bg-primary rounded-full px-3 py-2">
          <Text className="text-white">{t("products.add_product")}</Text>
        </TouchableOpacity>
      </View>

      {loading ? <Loading /> : null}

      {productsLoading ? (
        <View className="mt-10 flex gap-4 px-3">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={100} />
          ))}
        </View>
      ) : null}

      {!productsLoading && products.length === 0 ? <NoProductsFound /> : null}

      <View className="mb-10 pb-20">
        <FlatList
          key={"2-columns"}
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item: product }) => (
            <ProductItem
              product={product}
              categoriesData={categoriesData}
              handleDelete={handleDelete}
            />
          )}
        />
      </View>

       <FloatButton onPress={() => router.push("/stores/products/add")} />
    </Layout>
  );
}
