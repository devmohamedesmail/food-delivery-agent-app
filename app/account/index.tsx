import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, StatusBar, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { AuthContext } from '@/context/auth_context'
import { SafeAreaView } from 'react-native-safe-area-context'
import AccountButton from '@/components/common/AccountButton'
import i18n from '@/lib/i18n'
import AccountActionsButtons from '@/components/account/AccountActionsButtons'
import Header from '@/components/ui/Header'



export default function Account() {
  const { t } = useTranslation()
  const { auth } = useContext(AuthContext)



  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />


      <Header title={t('account.account')} />

      {/* Settings Content */}
      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm">
          <View className="p-6 items-center border-b border-gray-100">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-3">
              <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                {auth?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text
              className="text-lg font-bold text-gray-800"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {auth?.user?.name || t('user')}
            </Text>
            <Text
              className="text-gray-500 mt-1"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              {auth?.user?.identifier || 'user@example.com'}
            </Text>
            <View className="mt-2 bg-primary/10 px-3 py-1 rounded-full">
              <Text
                className="text-primary text-sm font-medium"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {/* {auth?.user?.role?.role || t('user')} */}
                {auth?.user?.role?.role === "store_owner" ? t('account.store_owner') : ''}
                {auth?.user?.role?.role === "driver" ? t('account.driver') : ''}
              </Text>
            </View>
          </View>


        </View>



        {/* Settings Sections */}
        {/* {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mx-4 mt-6">
            <Text
              className={`text-sm font-semibold text-black mb-2 px-2 uppercase tracking-wide ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}

            >
              {section.title}
            </Text>

            <View className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  <AccountButton item={item} />
                </View>
              ))}
            </View>
          </View>
        ))} */}

        <AccountActionsButtons />

        {/* App Version */}
        <View className="items-center py-8">
          <Text
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'Cairo_400Regular' }}
          >
            {t('account.app_version')} 1.0.0
          </Text>
        </View>
      </ScrollView>


    </SafeAreaView>
  )
}
