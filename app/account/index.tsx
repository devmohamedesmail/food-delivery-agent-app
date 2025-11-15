import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Switch, StatusBar  , Button} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Modal from 'react-native-modal';
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

export default function Account() {
  const { t } = useTranslation()
  const router = useRouter()
  const { auth, handle_logout } = useContext(AuthContext)
  const [isModalVisible, setModalVisible] = useState(false);

  // Modal states
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false)

  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false)

  const handleLogout = async () => {
    await handle_logout()
    setLogoutModalVisible(false)
    router.replace('/auth/login')
  }

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    setDeleteAccountModalVisible(false)
  }


 const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const settingsSections = [
    {
      title: t('app_preferences'),
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
    // {
    //   title: t('account.notifications'),
    //   items: [
    //     {
    //       id: 'push_notifications',
    //       title: t('account.push_notifications'),
    //       subtitle: t('account.push_notifications_description'),
    //       icon: 'notifications-outline',
    //       type: 'toggle' as const,
    //       value: pushNotifications,
    //       action: () => setPushNotifications(!pushNotifications)
    //     },
    //     {
    //       id: 'order_notifications',
    //       title: t('account.order_notifications'),
    //       subtitle: t('account.order_notifications_description'),
    //       icon: 'receipt-outline',
    //       type: 'toggle' as const,
    //       value: orderNotifications,
    //       action: () => setOrderNotifications(!orderNotifications)
    //     },
    //     {
    //       id: 'email_notifications',
    //       title: t('account.email_notifications'),
    //       subtitle: t('account.email_notifications_description'),
    //       icon: 'mail-outline',
    //       type: 'toggle' as const,
    //       value: emailNotifications,
    //       action: () => setEmailNotifications(!emailNotifications)
    //     }
    //   ]
    // },


    // {
    //   title: t('account.restaurant_settings'),
    //   items: [
    //     {
    //       id: 'auto_accept_orders',
    //       title: t('account.auto_accept_orders'),
    //       subtitle: t('account.auto_accept_orders_description'),
    //       icon: 'checkmark-circle-outline',
    //       type: 'toggle' as const,
    //       value: autoAcceptOrders,
    //       action: () => setAutoAcceptOrders(!autoAcceptOrders)
    //     },
    //     {
    //       id: 'restaurant_info',
    //       title: t('account.restaurant_information'),
    //       subtitle: t('account.manage_restaurant_details'),
    //       icon: 'restaurant-outline',
    //       type: 'navigation' as const,
    //       action: () => {}
    //     },
    //     {
    //       id: 'business_hours',
    //       title: t('account.business_hours'),
    //       subtitle: t('account.set_operating_hours'),
    //       icon: 'time-outline',
    //       type: 'navigation' as const,
    //       action: () => {}
    //     }
    //   ]
    // },
    {
      title: t('account.support_help'),
      items: [
        {
          id: 'help_center',
          title: t('account.help_center'),
          subtitle: t('account.get_help_support'),
          icon: 'help-circle-outline',
          type: 'navigation' as const,
          action: () => {}
        },
        {
          id: 'privacy_policy',
          title: t('account.privacy_policy'),
          subtitle: t('account.read_privacy_policy'),
          icon: 'shield-outline',
          type: 'navigation' as const,
          action: () => {}
        },
        {
          id: 'terms_service',
          title: t('account.terms_of_service'),
          subtitle: t('account.read_terms_of_service'),
          icon: 'document-text-outline',
          type: 'navigation' as const,
          action: () => {}
        }
      ]
    },
    {
      title: t('account.account'),
      items: [
        {
          id: 'logout',
          title: t('account.logout'),
          subtitle: t('account.sign_out_account'),
          icon: 'log-out-outline',
          type: 'action' as const,
          action: () => setLogoutModalVisible(true)
        },
        {
          id: 'account.delete_account',
          title: t('account.delete_account'),
          subtitle: t('account.permanently_delete_account'),
          icon: 'trash-outline',
          type: 'action' as const,
          action: () => setDeleteAccountModalVisible(true)
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
            className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
              isDestructive ? 'bg-red-50' : isLogout ? 'bg-orange-50' : 'bg-primary/10'
            }`}
          >
            <Ionicons
              name={item.icon as any}
              size={20}
              color={isDestructive ? '#EF4444' : isLogout ? '#F97316' : '#fd4a12'}
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
              trackColor={{ false: '#E5E7EB', true: '#fd4a12' }}
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
    
      <CustomHeader title={t('account.account')} />


      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

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
                {auth?.user?.role?.role || t('user')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="p-4 flex-row items-center justify-between"
            onPress={() => {}}
          >
            <View className="flex-row items-center">
              <Ionicons name="create-outline" size={20} color="#fd4a12" />
              <Text
                className="text-primary font-medium ml-3"
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

      {/* Logout Modal */}
      <Modal
        isVisible={logoutModalVisible}
        onBackdropPress={() => setLogoutModalVisible(false)}
        onBackButtonPress={() => setLogoutModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'flex-end' }}
      >
        <View className="bg-white rounded-t-3xl p-6">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="log-out-outline" size={32} color="#F97316" />
            </View>
            <Text
              className="text-xl font-bold text-gray-800 text-center"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {t('logout')}
            </Text>
            <Text
              className="text-gray-600 text-center mt-2"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              {t('logoutConfirm')}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setLogoutModalVisible(false)}
              className="flex-1 bg-gray-100 py-4 rounded-xl"
            >
              <Text
                className="text-gray-700 text-center font-semibold"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              className="flex-1 bg-orange-500 py-4 rounded-xl"
            >
              <Text
                className="text-white text-center font-semibold"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isVisible={deleteAccountModalVisible}
        onBackdropPress={() => setDeleteAccountModalVisible(false)}
        onBackButtonPress={() => setDeleteAccountModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        style={{ margin: 0, justifyContent: 'flex-end' }}
      >
        <View className="bg-white rounded-t-3xl p-6">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="trash-outline" size={32} color="#EF4444" />
            </View>
            <Text
              className="text-xl font-bold text-gray-800 text-center"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {t('delete_account')}
            </Text>
            <Text
              className="text-gray-600 text-center mt-2"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              {t('delete_account_warning')}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setDeleteAccountModalVisible(false)}
              className="flex-1 bg-gray-100 py-4 rounded-xl"
            >
              <Text
                className="text-gray-700 text-center font-semibold"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteAccount}
              className="flex-1 bg-red-500 py-4 rounded-xl"
            >
              <Text
                className="text-white text-center font-semibold"
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {t('delete')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
