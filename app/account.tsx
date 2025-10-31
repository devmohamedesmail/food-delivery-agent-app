import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { AuthContext } from '@/context/auth_context'
import CustomHeader from '@/components/custom/customheader'

interface SettingItem {
  id: string
  title: string
  subtitle?: string
  icon: string
  type: 'toggle' | 'navigation' | 'action' | 'language'
  value?: boolean
  action?: () => void
}

export default function Setting() {
  const { t } = useTranslation()
  const router = useRouter()
  const { auth } = useContext(AuthContext)

  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false)

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logout_confirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            router.replace('/auth/login')
          }
        }
      ]
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      t('delete_account'),
      t('delete_account_warning'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            // Handle account deletion logic here
            Alert.alert(t('account_deleted'), t('account_deleted_message'))
          }
        }
      ]
    )
  }

  const settingsSections = [
    {
      title: t('app_preferences'),
      items: [
        {
          id: 'language',
          title: t('language'),
          subtitle: t('change_app_language'),
          icon: 'language-outline',
          type: 'language' as const
        },
        {
          id: 'dark_mode',
          title: t('dark_mode'),
          subtitle: t('dark_mode_description'),
          icon: 'moon-outline',
          type: 'toggle' as const,
          value: darkMode,
          action: () => setDarkMode(!darkMode)
        },
        {
          id: 'sound_effects',
          title: t('sound_effects'),
          subtitle: t('sound_effects_description'),
          icon: 'volume-high-outline',
          type: 'toggle' as const,
          value: soundEffects,
          action: () => setSoundEffects(!soundEffects)
        }
      ]
    },
    {
      title: t('notifications'),
      items: [
        {
          id: 'push_notifications',
          title: t('push_notifications'),
          subtitle: t('push_notifications_description'),
          icon: 'notifications-outline',
          type: 'toggle' as const,
          value: pushNotifications,
          action: () => setPushNotifications(!pushNotifications)
        },
        {
          id: 'order_notifications',
          title: t('order_notifications'),
          subtitle: t('order_notifications_description'),
          icon: 'receipt-outline',
          type: 'toggle' as const,
          value: orderNotifications,
          action: () => setOrderNotifications(!orderNotifications)
        },
        {
          id: 'email_notifications',
          title: t('email_notifications'),
          subtitle: t('email_notifications_description'),
          icon: 'mail-outline',
          type: 'toggle' as const,
          value: emailNotifications,
          action: () => setEmailNotifications(!emailNotifications)
        }
      ]
    },
    {
      title: t('restaurant_settings'),
      items: [
        {
          id: 'auto_accept_orders',
          title: t('auto_accept_orders'),
          subtitle: t('auto_accept_orders_description'),
          icon: 'checkmark-circle-outline',
          type: 'toggle' as const,
          value: autoAcceptOrders,
          action: () => setAutoAcceptOrders(!autoAcceptOrders)
        },
        {
          id: 'restaurant_info',
          title: t('restaurant_information'),
          subtitle: t('manage_restaurant_details'),
          icon: 'restaurant-outline',
          type: 'navigation' as const,
          action: () => Alert.alert(t('coming_soon'), t('feature_coming_soon'))
        },
        {
          id: 'business_hours',
          title: t('business_hours'),
          subtitle: t('set_operating_hours'),
          icon: 'time-outline',
          type: 'navigation' as const,
          action: () => Alert.alert(t('coming_soon'), t('feature_coming_soon'))
        }
      ]
    },
    {
      title: t('support_help'),
      items: [
        {
          id: 'help_center',
          title: t('help_center'),
          subtitle: t('get_help_support'),
          icon: 'help-circle-outline',
          type: 'navigation' as const,
          action: () => Alert.alert(t('help_center'), t('contact_support_message'))
        },
        {
          id: 'privacy_policy',
          title: t('privacy_policy'),
          subtitle: t('read_privacy_policy'),
          icon: 'shield-outline',
          type: 'navigation' as const,
          action: () => Alert.alert(t('privacy_policy'), t('privacy_policy_message'))
        },
        {
          id: 'terms_service',
          title: t('terms_of_service'),
          subtitle: t('read_terms_service'),
          icon: 'document-text-outline',
          type: 'navigation' as const,
          action: () => Alert.alert(t('terms_of_service'), t('terms_service_message'))
        }
      ]
    },
    {
      title: t('account'),
      items: [
        {
          id: 'logout',
          title: t('logout'),
          subtitle: t('sign_out_account'),
          icon: 'log-out-outline',
          type: 'action' as const,
          action: handleLogout
        },
        {
          id: 'delete_account',
          title: t('delete_account'),
          subtitle: t('permanently_delete_account'),
          icon: 'trash-outline',
          type: 'action' as const,
          action: handleDeleteAccount
        }
      ]
    }
  ]

  const renderSettingItem = (item: SettingItem) => {
    const isDestructive = item.id === 'delete_account'
    const isLogout = item.id === 'logout'

    return (
      <TouchableOpacity
        key={item.id}
        onPress={item.type !== 'toggle' ? item.action : undefined}
        className="bg-white px-4 py-4 flex-row items-center justify-between border-b border-gray-100"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <View
            className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isDestructive ? 'bg-red-50' : isLogout ? 'bg-orange-50' : 'bg-blue-50'
              }`}
          >
            <Ionicons
              name={item.icon as any}
              size={20}
              color={isDestructive ? '#EF4444' : isLogout ? '#F97316' : '#3B82F6'}
            />
          </View>

          <View className="flex-1">
            <Text
              className={`font-semibold ${isDestructive ? 'text-red-600' : isLogout ? 'text-orange-600' : 'text-gray-800'
                }`}
              style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
              {item.title}
            </Text>
            {item.subtitle && (
              <Text
                className="text-gray-500 text-sm mt-1"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {item.subtitle}
              </Text>
            )}
          </View>
        </View>

        <View className="ml-3">
          {item.type === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={item.action}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          )}

          {item.type === 'language' && (
            <LanguageSwitcher />
          )}

          {(item.type === 'navigation' || item.type === 'action') && (
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
    
      <CustomHeader title={t('settings')} />

      {/* Settings Content */}
      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm">
          <View className="p-6 items-center border-b border-gray-100">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-3">
              <Ionicons name="person" size={32} color="white" />
            </View>
            <Text
              className="text-lg font-bold text-gray-800"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {t('restaurant_owner')}
            </Text>
            <Text
              className="text-gray-500 mt-1"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              owner@restaurant.com
            </Text>
          </View>

          <TouchableOpacity
            className="p-4 flex-row items-center justify-between"
            onPress={() => Alert.alert(t('coming_soon'), t('feature_coming_soon'))}
          >
            <View className="flex-row items-center">
              <Ionicons name="create-outline" size={20} color="#3B82F6" />
              <Text
                className="text-blue-600 font-medium ml-3"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('edit_profile')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mx-4 mt-6">
            <Text
              className="text-sm font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wide"
              style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
              {section.title}
            </Text>

            <View className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View className="items-center py-8">
          <Text
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'Cairo_400Regular' }}
          >
            {t('app_version')} 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
