import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function CustomHeader({title}: {title?: string}) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View className="bg-white px-6 py-4 shadow-sm pt-14">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text
            className="text-xl font-bold text-gray-800"
            style={{ fontFamily: 'Cairo_700Bold' }}
          >
           
            {title}
          </Text>

         
        </View>
      </View>
  )
}
