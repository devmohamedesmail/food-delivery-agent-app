import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import CustomHeader from '../../components/custom/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import useFetch from '@/hooks/useFetch'
import { useAuth } from '@/context/auth_context'
import Loading from '@/components/common/Loading'
import EmptyNotification from '@/components/common/EmptyNotification'
import axios from 'axios'
import { config } from '@/constants/config'
import { Toast } from 'toastify-react-native'

interface NotificationItem {
  id: string
  type: 'order_received' | 'order_accepted' | 'order_ready' | 'order_delivered' | 'order_cancelled'
  title: string
  message: string
  time: string
  isRead: boolean
  orderId?: string
}

export default function Notification() {
  const { t } = useTranslation()
  const router = useRouter()
  const { auth } = useAuth()
  const { data: profileData} = useFetch(`/users/profile/${auth?.user?.id}`)
  const { loading: profileLoading}= useFetch(`/users/profile/${auth?.user?.id}`)
  const { refetch: refetchProfile}= useFetch(`/users/profile/${auth?.user?.id}`)
  const { error: profileError}= useFetch(`/users/profile/${auth?.user?.id}`)

  const { data: notification, loading: notificationLoading, error: notificationError, refetch: notificationRefetch } = useFetch(`/notifications/?notifiable_id=${auth?.user?.id}&notifiable_type=driver`)


  const handle_mark_as_red = async (notification_id: string) => {
    try {
      console.log('Notification ID:', notification_id);
      await axios.put(`${config.URL}/notifications/read/${notification_id}`)
      notificationRefetch()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error_happened')
      })
    }

  }


  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <CustomHeader title={t('notifications.title')} />

      <View className="flex-1">



        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >

          {notificationLoading ? (
            <View className='flex-1'><Loading /></View>
          ) : (<>

            {notification?.data.length === 0 ? (
              <EmptyNotification />
            ) : (
              // Notifications List
              <View className="px-2 py-4">
                {notification && notification?.data.map((notification: any) => (
                  <TouchableOpacity
                    onPress={() => handle_mark_as_red(notification.id)}
                    key={notification.id} className='border rounded-md border-gray-100 p-4 bg-white mb-2 py-5'>


                    <View className='flex flex-row justify-end items-center'>


                      <View className='flex items-end'>
                        <Text>{notification.title}</Text>
                        <Text>{notification.message}</Text>
                      </View>

                      <View className={` p-2 rounded-full ml-4 ${notification.is_read ? 'bg-green-500' : 'bg-red-600'}`}>
                        <Ionicons name="notifications" size={24} color="white" />
                      </View>


                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

          </>)}



        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
