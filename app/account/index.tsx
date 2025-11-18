import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Switch, StatusBar, Button, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useRouter } from 'expo-router'
import { AuthContext } from '@/context/auth_context'

import { SafeAreaView } from 'react-native-safe-area-context'
import AccountButton from '@/components/common/AccountButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import i18n from '@/lib/i18n'
import AccountActionsButtons from '@/components/account/AccountActionsButtons'



export default function Account() {
  const { t } = useTranslation()
  const router = useRouter()
  const { auth, handle_logout } = useContext(AuthContext)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(true)
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)




  const logout = async () => {
    Alert.alert(t('account.logout'),
      t('account.logout_confirmation'),
      [
        {
          text: t('auth.cancel'),
          style: 'cancel'
        },
        {
          text: t('auth.confirm'),
          onPress: async () => {
            await handle_logout()
            router.replace('/auth/login')
          },
          style: 'destructive'
        }
      ]
    );
  }



  const settingsSections = [
    {
      title: t('account.app_preferences'),
      items: [
        {
          id: 'language',
          title: t('account.language'),
          subtitle: t('account.change_app_language'),
          icon: 'language-outline',
          type: 'language' as const
        },
        {
          id: 'dark_mode',
          title: t('account.dark_mode'),
          subtitle: t('account.dark_mode_description'),
          icon: 'moon-outline',
          type: 'toggle' as const,
          value: darkMode,
          action: () => setDarkMode(!darkMode)
        },
        {
          id: 'sound_effects',
          title: t('account.sound_effects'),
          subtitle: t('account.sound_effects_description'),
          icon: 'volume-high-outline',
          type: 'toggle' as const,
          value: soundEffects,
          action: () => setSoundEffects(!soundEffects)
        }
      ]
    },
    {
      title: t('account.support_help'),
      items: [
        {
          id: 'help_center',
          title: t('account.help_center'),
          subtitle: t('account.get_help_support'),
          icon: 'help-circle-outline',
          type: 'navigation' as const,
          action: () => { }
        },
        {
          id: 'privacy_policy',
          title: t('account.privacy_policy'),
          subtitle: t('account.read_privacy_policy'),
          icon: 'shield-outline',
          type: 'navigation' as const,
          action: () => { }
        },
        {
          id: 'terms_service',
          title: t('account.terms_of_service'),
          subtitle: t('account.read_terms_of_service'),
          icon: 'document-text-outline',
          type: 'navigation' as const,
          action: () => { }
        }
      ]
    },
    
  ]

 

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
  
      <View className='bg-black/90 pt-24 pb-5 px-4 py-4 flex-row items-center justify-between'>
       
        <TouchableOpacity
        className='bg-black/60 rounded-full p-2'
        onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold" >{t('account.account')}</Text>

      </View>


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
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mx-4 mt-6">
            <Text
              className={`text-sm font-semibold text-black mb-2 px-2 uppercase tracking-wide ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}

            >
              {section.title}
            </Text>

            <View className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {/* {renderSettingItem(item)} */}
                  <AccountButton item={item} />
                </View>
              ))}
            </View>
          </View>
        ))}

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
