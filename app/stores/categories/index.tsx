import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { config } from "@/constants/config";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import NoCategories from "@/components/categories/NoCategories";
import Layout from "@/components/features/store/categories/Layout";
import { useStore } from "@/hooks/useStore";

export default function Categories() {
  const { t } = useTranslation();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { store } = useStore();
  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useFetch(`/categories/store/${store?.id}`);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetchCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      t("categories.delete_category"),
      t("categories.delete_category_confirmation"),
      [
        { text: t("categories.cancel"), style: "cancel" },
        {
          text: t("categories.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Deleting category with id:", id);
              await axios.delete(`${config.URL}/categories/${id}`);
              Toast.show({
                type: "success",
                text1: t("categories.category_deleted_successfully"),
              });
              refetchCategories();
            } catch (error: any) {
              console.log("Error deleting category:", error);
              Toast.show({
                type: "error",
                text1: t("categories.failed_to_delete_category"),
              });
            }
          },
        },
      ]
    );
  };

  return (
    <Layout>
      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#fd4a12"]}
          />
        }
      >
        {categoriesLoading ? (
          <Loading />
        ) : (
          <>
            {/* Stats Card */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-500 text-sm">
                    {t("categories.total_categories")}
                  </Text>
                  <Text className="text-2xl font-bold text-primary mt-1">
                    {categoriesData?.data?.length}
                  </Text>
                </View>
                <View className="bg-primary/10 w-14 h-14 rounded-full items-center justify-center">
                  <Ionicons name="grid-outline" size={28} color="#fd4a12" />
                </View>
              </View>
            </View>

            {/* Categories List */}
            {categoriesData.data.length === 0 ? (
              <NoCategories />
            ) : (
              <View className="space-y-3">
                {categoriesData &&
                  categoriesData.data.map((category: any) => (
                    <View
                      key={category.id}
                      className="bg-white rounded-xl p-4 shadow-sm"
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-1">
                          <Text
                            className="text-lg font-bold text-gray-800"
                            style={{ fontFamily: "Cairo_700Bold" }}
                          >
                            {category.name}
                          </Text>
                          <Text
                            className="text-gray-500 text-sm mt-1"
                            style={{ fontFamily: "Cairo_400Regular" }}
                          >
                            {category.description}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
                        <TouchableOpacity
                          // onPress={() => handleEdit(category)}
                          onPress={() =>
                            router.push({
                              pathname: "/stores/categories/update",
                              params: { data: JSON.stringify(category) },
                            })
                          }
                          className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center mr-2"
                        >
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color="white"
                          />
                          <Text className="text-white ml-2 font-medium">
                            {t("categories.edit")}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDelete(category.id)}
                          className="bg-red-500 px-4 py-2 rounded-lg flex-row items-center"
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color="white"
                          />
                          <Text className="text-white ml-2 font-medium">
                            {t("categories.delete")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
}
