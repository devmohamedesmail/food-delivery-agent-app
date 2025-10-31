import React from 'react'
import { useContext, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { AuthContext } from '@/context/auth_context'
export default function DriverHomeScreen() {
    const { t, i18n } = useTranslation()
    const { auth } = useContext(AuthContext)
    const [isOnline, setIsOnline] = useState(false)

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text 
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {t('welcomeDriver')}
            </Text>
            <Text 
              className="text-gray-600"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              {auth.user?.name || t('driver')}
            </Text>
          </View>
          <LanguageSwitcher />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Online Status Toggle */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View>
              <Text 
                className="text-lg font-semibold text-gray-800 mb-1"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('driverStatus')}
              </Text>
              <Text 
                className="text-gray-600"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {isOnline ? t('youAreOnline') : t('youAreOffline')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsOnline(!isOnline)}
              className={`w-16 h-8 rounded-full justify-center ${
                isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <View
                className={`w-6 h-6 bg-white rounded-full shadow-sm ${
                  isOnline ? 'ml-8' : 'ml-1'
                }`}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Stats */}
        <View className="mb-4">
          <Text 
            className="text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Cairo_600SemiBold' }}
          >
            {t('todaysStats')}
          </Text>
          <View className="flex-row justify-between">
            <View className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm">
              <View className="flex-row items-center mb-2">
                <Ionicons name="car" size={20} color="#3B82F6" />
                <Text 
                  className="ml-2 text-gray-600"
                  style={{ fontFamily: 'Cairo_400Regular' }}
                >
                  {t('deliveries')}
                </Text>
              </View>
              <Text 
                className="text-2xl font-bold text-blue-600"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                12
              </Text>
            </View>
            <View className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm">
              <View className="flex-row items-center mb-2">
                <Ionicons name="cash" size={20} color="#10B981" />
                <Text 
                  className="ml-2 text-gray-600"
                  style={{ fontFamily: 'Cairo_400Regular' }}
                >
                  {t('earnings')}
                </Text>
              </View>
              <Text 
                className="text-2xl font-bold text-green-600"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                $245
              </Text>
            </View>
          </View>
        </View>

        {/* Current Orders */}
        <View className="mb-4">
          <Text 
            className="text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Cairo_600SemiBold' }}
          >
            {t('currentOrders')}
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text 
                className="font-semibold text-gray-800"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('orderNumber')} #1234
              </Text>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text 
                  className="text-orange-600 text-sm"
                  style={{ fontFamily: 'Cairo_400Regular' }}
                >
                  {t('inProgress')}
                </Text>
              </View>
            </View>
            <Text 
              className="text-gray-600 mb-2"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              Pizza Palace → 123 Main St
            </Text>
            <TouchableOpacity className="bg-blue-500 rounded-lg py-3 mt-2">
              <Text 
                className="text-white text-center font-semibold"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('viewDetails')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text 
            className="text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Cairo_600SemiBold' }}
          >
            {t('quickActions')}
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm items-center">
              <Ionicons name="location" size={24} color="#3B82F6" />
              <Text 
                className="text-gray-800 mt-2 text-center"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {t('myLocation')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm items-center">
              <Ionicons name="time" size={24} color="#10B981" />
              <Text 
                className="text-gray-800 mt-2 text-center"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {t('orderHistory')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm items-center">
              <Ionicons name="person" size={24} color="#8B5CF6" />
              <Text 
                className="text-gray-800 mt-2 text-center"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {t('profile')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
