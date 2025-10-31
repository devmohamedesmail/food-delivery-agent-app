import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import CustomInput from './custom/custominput'
import CustomButton from './custom/custombutton'
import { Toast } from 'toastify-react-native'
import axios from 'axios'
import { config } from '@/constants/config'
import { AuthContext } from '@/context/auth_context'
import Modal from 'react-native-modal';

interface RestaurantFormValues {
  name: string
  address: string
  phone: string
  description: string
  opening_hours: string
  delivery_time: string
  image: string
}

export default function Resturant_Register() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { auth } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('restaurantNameRequired'))
      .min(2, t('restaurantNameRequired')),
   
    address: Yup.string()
      .required(t('addressRequired'))
      .min(10, t('addressRequired')),
    phone: Yup.string()
      .required(t('phone_required'))
      .matches(/^[0-9+\-\s]+$/, t('phone_invalid')),

    description: Yup.string()
      .required(t('descriptionRequired'))
      .min(10, t('descriptionRequired')),
   
    opening_hours: Yup.string()
      .required(t('openingHoursRequired')),
    delivery_time: Yup.number()
      .required(t('deliveryTimeRequired'))
      .positive(t('deliveryTimeInvalid'))
      .integer(t('deliveryTimeInvalid'))
      .typeError(t('deliveryTimeInvalid')),
    image: Yup.string()
      .required(t('imageRequired'))
  })

  const pickImage = async (setFieldValue: (field: string, value: string) => void) => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!')
        return
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setSelectedImage(imageUri)
        setFieldValue('image', imageUri)
      }
    } catch (error) {
      console.error('Error picking image:', error)
      Alert.alert('Error', 'Failed to pick image')
    }
  }






  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      description: '',
      opening_hours: '',
      delivery_time: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        // For now, send as JSON without file upload to test
        const response = await axios.post(
          `https://uber-express-project.onrender.com/api/resturants`,
          {
            userId: auth.user.id,
            name: values.name,
            address: values.address,
            phone: values.phone,
            description: values.description,
            opening_hours: values.opening_hours,
            delivery_time: values.delivery_time,
            image: selectedImage || '' // Send image URL as string for now
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        console.log('Response:', response.data)
        Toast.success(t('restaurantRegistered'))
        router.back()
      } catch (error: any) {
        console.error('Full error:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        Toast.error(error.response?.data?.message || t('registrationFailed'))
      } finally {
        setIsSubmitting(false)
      }
    },
  });



  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header with Back Button */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0 top-0 z-10 p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text
            className="text-3xl font-bold arabic-font text-gray-800 text-center"

          >
            {t('restaurantRegistration')}
          </Text>
          <Text
            className="text-gray-600 text-center mt-2"
            style={{ fontFamily: 'Cairo_400Regular' }}
          >
            {t('joinOurPlatform')}
          </Text>
        </View>

        <View className="space-y-4">
          {/* Restaurant Name */}
          <CustomInput
            label={t('restaurantName')}
            placeholder={t('enterRestaurantName')}
            value={formik.values.name}
            onChangeText={(formik.handleChange('name'))}
            type="text"
            error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
          />






          {/* Address */}
          <CustomInput
            label={t('address')}
            placeholder={t('enterAddress')}
            value={formik.values.address}
            onChangeText={(formik.handleChange('address'))}
            type="text"
            error={formik.touched.address && formik.errors.address ? formik.errors.address : undefined}
          />

          {/* Phone Number */}
          <CustomInput
            label={t('phone')}
            placeholder={t('enterPhone')}
            value={formik.values.phone}
            onChangeText={(formik.handleChange('phone'))}
            type="phone"
            keyboardType="phone-pad"
            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
          />

          {/* Email */}
          

          {/* Restaurant Image Picker */}
          <View className="mb-4">
            <Text
              className="text-gray-700 text-base font-medium mb-2"
              style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
              {t('restaurantImage')}
            </Text>

            <TouchableOpacity
              onPress={() => pickImage(formik.setFieldValue)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center min-h-[120px]"
            >
              {selectedImage ? (
                <View className="items-center">
                  <Image
                    source={{ uri: selectedImage }}
                    className="w-20 h-20 rounded-lg mb-2"
                    resizeMode="cover"
                  />
                  <Text
                    className="text-blue-600 text-sm"
                    style={{ fontFamily: 'Cairo_400Regular' }}
                  >
                    {t('tapToChangeImage')}
                  </Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons name="camera" size={32} color="#9CA3AF" />
                  <Text
                    className="text-gray-500 mt-2 text-center"
                    style={{ fontFamily: 'Cairo_400Regular' }}
                  >
                    {t('tapToSelectImage')}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {formik.touched.image && formik.errors.image && (
              <Text
                className="text-red-500 mt-1 text-sm"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {formik.errors.image}
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text
              className="text-gray-700 text-base font-medium mb-2"
              style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
              {t('description')}
            </Text>
            <CustomInput
              placeholder={t('enterDescription')}
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
              type="text"
              error={formik.touched.description && formik.errors.description ? formik.errors.description : undefined}
            />
          </View>

          {/* Cuisine Type */}


          {/* Opening Hours */}
          <CustomInput
            label={t('openingHours')}
            placeholder={t('enterOpeningHours')}
            value={formik.values.opening_hours}
            onChangeText={formik.handleChange('opening_hours')}
            type="text"
            error={formik.touched.opening_hours && formik.errors.opening_hours ? formik.errors.opening_hours : undefined}
          />

          {/* Delivery Fee */}







          {/* Delivery Time */}
          <CustomInput
            label={t('deliveryTime')}
            placeholder={t('enterDeliveryTime')}
            value={formik.values.delivery_time}
            onChangeText={formik.handleChange('delivery_time')}
            type="text"
            keyboardType="numeric"
            error={formik.touched.delivery_time && formik.errors.delivery_time ? formik.errors.delivery_time : undefined}
          />

          {/* Submit Button */}
          <View className="mt-8">
            <CustomButton
              title={isSubmitting ? t('registering') : t('registerRestaurant')}
              onPress={formik.handleSubmit}
              disabled={isSubmitting || !formik.isValid || !formik.dirty}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
