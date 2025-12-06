import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { config } from "@/constants/config";
import Button from "../ui/Button";
import Entypo from '@expo/vector-icons/Entypo';

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function ProductItem({
  product,
  categoriesData,
  handleDelete,
}: any) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      key={product.id}
      className="bg-white rounded-xl  mb-3 shadow-sm w-[45%] mx-2"
    >
      {/* product Image */}
      <View className="relative">
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            className="w-full h-44 rounded-lg mr-3"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-44 rounded-lg bg-gray-100 items-center justify-center mr-3">
            <Ionicons name="image-outline" size={32} color="#9CA3AF" />
          </View>
        )}



        <View className="absolute top-2 right-2">
          <TouchableOpacity
            onPress={() => handleDelete(product.id)}

            className=" bg-red-600 w-10 h-10 top-3 right-3 flex flex-row items-center justify-center rounded-full">
            <Ionicons name="trash-outline" size={18} color="white" />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/stores/products/update",
                params: { data: JSON.stringify(product) },
              })
            }

            className=" bg-green-600 mt-3 w-10 h-10 top-3 right-3 flex flex-row items-center justify-center rounded-full">
            <Entypo name="edit" size={18} color="white" />
          </TouchableOpacity>

        </View>
      </View>

      {/*  product info  */}
      <View className="py-3 px-2">
        <Text className="font-bold text-lg text-center text-black">
          {product?.name}
        </Text>

        <Text className="font-bold text-lg text-center text-black">
          {product?.category?.title}
        </Text>

        <View>
          {product?.attributes?.length === 0 ? (
            <Text>
              {product.price} {config.CURRENCY}{" "}
            </Text>
          ) : null}

          {product?.attributes && product?.attributes?.length > 0 && (
            <View className="mt-2">
              {product.attributes.map((attr: any) => (
                <View key={attr.id} className="mb-1">
                  {/* <Text className="text-black font-bold mb-2">{attr.name}</Text> */}

                  {attr.values && attr.values.length > 0 ? (
                    <View className="flex flex-row flex-wrap">
                      {attr.values.map((val: any, index: number) => (
                        <Text
                          key={index}
                          className="  mb-1 bg-primary text-xs px-2 mx-1 py-1 rounded-full text-white"
                        >
                          {val.value} - {val.price}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

    
    </View>
  );
}
