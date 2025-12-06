import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { config } from "@/constants/config";
import { AuthContext } from "@/context/auth_context";
import useFetch from "@/hooks/useFetch";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import CustomTextArea from "@/components/ui/textarea";
import CustomButton from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CustomImagePicker from "@/components/ui/customimagepicker";
import Layout from "@/components/ui/Layout";
import { useStore } from "@/hooks/useStore";

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

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Add() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { data: attributesData } = useFetch('/attributes');
  const [attributeValues, setAttributeValues] = useState<Array<{ attribute_id: string; value: string; price: string }>>([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>("");
  const { store } = useStore();
  const { data: categoriesData } = useFetch(
    store?.id ? `/categories/store/${store?.id}` : ""
  );

  const categoryOptions =
    categoriesData?.data?.map((cat: Category) => ({
      label: cat.name,
      value: cat.id.toString(),
    })) || [];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      sale_price: "",
      category_id: "",
      image: "",
      attribute_value: "",
      attribute_price: "",
      has_attributes: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("products.name_required")),
      price: Yup.number().when("has_attributes", (hasAttributes, schema) => {
        return hasAttributes
          ? schema.nullable()
          : schema
            .required(t("products.price_required"))
            .positive(t("products.price_positive"));
      }),
      category_id: Yup.string().required(t("products.category_required")),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        if (!store?.id) {
          Toast.error(
            t("products.no_store_found", { defaultValue: "No store found" })
          );
          return;
        }

        // Create FormData for image upload
        const formData = new FormData();
        formData.append("store_id", store.id.toString());
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        if (values.sale_price) {
          formData.append("sale_price", values.sale_price);
        }
        formData.append("category_id", values.category_id);

        // Add attributes and values
        if (selectedAttributeId && attributeValues.length > 0) {
          // Send as array notation for FormData
          formData.append("attributes[]", selectedAttributeId);

          // Send each value as separate entries
          attributeValues.forEach((av, index) => {
            formData.append(`values[${index}][attribute_id]`, av.attribute_id);
            formData.append(`values[${index}][value]`, av.value);
            formData.append(`values[${index}][price]`, av.price);
          });
        }

        // Add image file if exists
        if (values.image) {
          const uriParts = values.image.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append("image", {
            uri: values.image,
            name: `product.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        }

        const response = await axios.post(
          `${config.URL}/products/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          Toast.show({
            type: "success",
            text1: t("products.product_added_successfully"),
          })
          resetForm();
        }
      } catch (error) {
        console.error("Error adding product:", error);
        Toast.show({

          type: "error",
          text1: t("products.failed_to_save_product"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });


  useEffect(() => {
    if (attributeValues.length > 0) {
      formik.setFieldValue("has_attributes", true);
    } else {
      formik.setFieldValue("has_attributes", false);
    }
  }, [attributeValues])

  return (
    <Layout>
      <Header title={t("products.add_product")} />

      <ScrollView className="px-4 py-10 bg-white">
        {/* Product Name */}
        <View className="pb-20">
          <View className="mb-4">
            <Input
              label={t("products.product_name")}
              placeholder={t("products.enter_product_name")}
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            />
          </View>

          {/* Product Description */}
          {/* <View className="mb-4">
            <CustomTextArea
              label={t("products.product_description")}
              placeholder={t("products.enter_product_description")}
              value={formik.values.description}
              onChangeText={formik.handleChange("description")}
              error={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "Cairo_400Regular" }}
              >
                {formik.errors.description}
              </Text>
            )}
          </View> */}

          {/* Price */}
          <View className="mb-4">
            <Input
              label={t("products.price")}
              placeholder={t("products.enter_price")}
              value={formik.values.price}
              onChangeText={formik.handleChange("price")}
              keyboardType="numeric"
              error={
                formik.touched.price && formik.errors.price
                  ? formik.errors.price
                  : ""
              }
            />
          </View>

          {/* Sale Price */}
          {/* <View className="mb-4">
            <Input
              label={t("products.sale_price")}
              placeholder={t("products.enter_sale_price", {
                defaultValue: "Enter sale price",
              })}
              value={formik.values.sale_price}
              onChangeText={formik.handleChange("sale_price")}
              keyboardType="numeric"
              error={
                formik.touched.sale_price && formik.errors.sale_price
                  ? formik.errors.sale_price
                  : ""
              }
            />
          </View> */}

          {/* Category Dropdown */}
          <View className="mb-4">
            <Select
              label={t("products.category")}
              placeholder={t("products.select_category")}
              options={categoryOptions}
              value={formik.values.category_id}
              onSelect={(value: string) =>
                formik.setFieldValue("category_id", value)
              }
            />
            {formik.touched.category_id && formik.errors.category_id && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "Cairo_400Regular" }}
              >
                {formik.errors.category_id}
              </Text>
            )}
          </View>

          {/* Product Image */}
          <View className="mb-6">
            <CustomImagePicker
              label={t("products.product_image")}
              value={formik.values.image}
              onImageSelect={(uri: string) =>
                formik.setFieldValue("image", uri)
              }
              placeholder={t("products.tap_to_select_image")}
            />
          </View>

          {/* Attribute Selection */}
          <View className="mb-4">
            <Select
              label={t("products.attribute")}
              placeholder={t("products.select_attribute")}
              options={(attributesData?.attributes || []).map((attr: any) => ({
                label: attr.name,
                value: attr.id.toString()
              }))}
              value={selectedAttributeId}
              onSelect={(value: string) => {
                setSelectedAttributeId(value);
                setAttributeValues([]);
                formik.setFieldValue("has_attributes", true);
              }}
            />
          </View>

          {/* Attribute Values Section */}
          {selectedAttributeId && (
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Cairo_400Regular" }}>
                {t("products.attribute_values")}
              </Text>

              {/* Dynamic Attribute Value Inputs */}
              {attributeValues.map((attrValue, index) => (
                <View key={index} className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-xs text-gray-600" style={{ fontFamily: "Cairo_400Regular" }}>
                      {t("products.value_item")} {index + 1}
                    </Text>
                    <CustomButton
                      title={t("products.remove")}
                      onPress={() => {
                        const newValues = attributeValues.filter((_, i) => i !== index);
                        setAttributeValues(newValues);
                      }}
                      className="bg-red-500 py-1 px-3"
                    />
                  </View>
                  <View className="mb-2">
                    <Input
                      label={t("products.value")}
                      placeholder={t("products.enter_value")}
                      value={attrValue.value}
                      onChangeText={(text) => {
                        const newValues = [...attributeValues];
                        newValues[index].value = text;
                        setAttributeValues(newValues);
                      }}
                    />
                  </View>
                  <View>
                    <Input
                      label={t("products.extra_price")}
                      placeholder={t("products.enter_extra_price")}
                      value={attrValue.price}
                      onChangeText={(text) => {
                        const newValues = [...attributeValues];
                        newValues[index].price = text;
                        setAttributeValues(newValues);
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              ))}

              {/* Add New Value Inputs */}
              <View className="mb-3 p-3 bg-gray-50 rounded-lg">
                <View className="mb-2">
                  <Input
                    label={t("products.value")}
                    placeholder={t("products.enter_value")}
                    value={formik.values.attribute_value}
                    onChangeText={formik.handleChange("attribute_value")}
                  />
                </View>
                <View className="mb-3">
                  <Input
                    label={t("products.price")}
                    placeholder={t("products.price")}
                    value={formik.values.attribute_price}
                    onChangeText={formik.handleChange("attribute_price")}
                    keyboardType="numeric"
                  />
                </View>
                <CustomButton
                  title={t("products.add_value")}
                  onPress={() => {
                    if (formik.values.attribute_value && formik.values.attribute_price) {
                      setAttributeValues([
                        ...attributeValues,
                        {
                          attribute_id: selectedAttributeId,
                          value: formik.values.attribute_value,
                          price: formik.values.attribute_price
                        }
                      ]);
                      formik.setFieldValue("attribute_value", "");
                      formik.setFieldValue("attribute_price", "");
                    } else {
                      Toast.error(t("products.fill_all_fields"));
                    }
                  }}
                  className="bg-blue-500"
                />
              </View>
            </View>
          )}

          {/* Submit Button */}
          <CustomButton
            title={
              formik.isSubmitting ? t("products.saving") : t("products.save")
            }
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}
