import React, { useContext } from 'react'
import { View, Text, ScrollView, Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '@/context/auth-provider'
import AccountActionsButtons from '@/components/account/AccountActionsButtons'
import Header from '@/components/ui/header'
import AccountSettingButton from '@/components/account/AccountSettingButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors'
import Layout from '@/components/ui/layout'
import { useTheme } from '@/context/theme-provider'


export default function Account() {
  const { t } = useTranslation()
  const { auth } = useContext(AuthContext)
  const { theme, setTheme } = useTheme();
  const activeColors = Colors[theme];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Layout>
      <Header title={t('account.account')} />

      {/* Settings Content */}
      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View
          className="mx-4 mt-4 rounded-xl shadow-sm"
          style={{ backgroundColor: activeColors.background }}
        >
          <View
            className="p-6 items-center border-b"
            style={{ borderColor: theme === 'dark' ? '#333' : '#f3f4f6' }}
          >
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-3">
              <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                {auth?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text
              className="text-lg font-bold"
              style={{ fontFamily: 'Cairo_700Bold', color: activeColors.text }}
            >
              {auth?.user?.name || t('user')}
            </Text>
            <Text
              className="mt-1"
              style={{ fontFamily: 'Cairo_400Regular', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
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



        <View className='px-5'>
          <AccountSettingButton
            title={t('account.theme')}
            onPress={toggleTheme}
            icon={<Ionicons name={theme === 'dark' ? "moon" : "sunny"} size={20} color={activeColors.tabIconSelected} />}
          />
          <AccountSettingButton
            title={t('account.whatsup_support')}
            onPress={() => Linking.openURL('https://wa.me/+971589107126')}
            icon={<AntDesign name="whats-app" size={20} color={activeColors.tabIconSelected} />}
          />
          <AccountSettingButton
            title={t('account.phone_support')}
            onPress={() => Linking.openURL('tel:+971589107126')}
            icon={<AntDesign name="phone" size={20} color={activeColors.tabIconSelected} />}
          />
        </View>

        <AccountActionsButtons />

        {/* App Version */}
        <View className="items-center py-8">
          <Text
            className="text-sm"
            style={{ fontFamily: 'Cairo_400Regular', color: theme === 'dark' ? '#6b7280' : '#9ca3af' }}
          >
            {t('account.app_version')} 1.0.0
          </Text>
        </View>
      </ScrollView>
    </Layout>
  )
}
