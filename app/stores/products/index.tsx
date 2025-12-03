import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { config } from "@/constants/config";
import { AuthContext } from "@/context/auth_context";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/ui/Loading";
import Skeleton from "@/components/ui/Skeleton";
import NoProductsFound from "@/components/store/NoProductsFound";
import Header from "@/components/ui/Header";
import ProductItem from "@/components/products/ProductItem";
import { useStore } from "@/hooks/useStore";
import FloadtButton from "@/components/ui/FloadtButton";

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
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <Header title={t("products.products")} />

      {loading ? (
        <Loading />
      ) : (
        <>
          {productsLoading ? (
            <View className="mt-10 flex gap-4 px-3">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} height={100} />
              ))}
            </View>
          ) : (
            <>
              {products.length === 0 ? (
                <NoProductsFound />
              ) : (
                <>
                  <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
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
                </>
              )}
            </>
          )}
          <FloadtButton onPress={() => router.push("/stores/products/add")} />
        </>
      )}
    </SafeAreaView>
  );
}
