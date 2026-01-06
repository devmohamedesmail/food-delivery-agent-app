import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AuthContext, useAuth } from '@/context/auth-provider'
import Header from '@/components/ui/header'
import AccountSettingButton from '@/components/account/AccountSettingButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors'
import Layout from '@/components/ui/layout'
import { useTheme } from '@/context/theme-provider'
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomPaper from '@/components/ui/bottom-paper'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Button from '@/components/ui/button'
import { Toast } from 'toastify-react-native';
import { useRouter } from 'expo-router'


export default function Account() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme();
  const activeColors = Colors[theme];
  const [loadding, setLoading] = useState(false)
  const { auth, logout } = useAuth()
  const router = useRouter()


  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleLogout = async () => {

    try {
      setLoading(true)
      await logout()

      Toast.show({
        type: 'success',
        text1: t('account.logout_successful'),
      })
      setTimeout(() => {
        setLoading(false)
        router.replace('/auth/login')
      }, 3000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('account.logout_failed'),
      })
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
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
                {auth?.user?.email || auth?.user?.phone}
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

            <View className='mt-2'>
              <AccountSettingButton
                title={t('account.logout')}
                onPress={() => bottomSheetRef.current?.expand()}
                icon={<SimpleLineIcons name="logout" size={16} color={activeColors.tabIconSelected} />}
              />
            </View>







          </View>
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
      <BottomPaper ref={bottomSheetRef} snapPoints={['40%']}>
        <View className="p-5 mt-5">
          <Text
            className='text-center font-bold mb-4 text-xl'
            style={{ fontFamily: 'Cairo_600SemiBold', color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('account.logout_confirmation')}
          </Text>
          <View className='flex flex-row justify-center gap-4 mt-6'>
            <Button
              title={loadding ? t('account.logging_out') : t('account.logout')}
              onPress={handleLogout}
              className='bg-red-500 px-4 py-3 w-44'
              textClassName='text-white'
              style={{ backgroundColor: 'red' }}
            />
            <Button
              title={t('auth.cancel')}
              onPress={() => bottomSheetRef.current?.close()}
              className='px-4 py-3 w-44'
              textClassName={theme === 'dark' ? 'text-white' : 'text-gray-800'}
              style={{ backgroundColor: theme === 'dark' ? '#333' : Colors.light.tabIconSelected }}

            />
          </View>

        </View>
      </BottomPaper>
    </>


  )
}
