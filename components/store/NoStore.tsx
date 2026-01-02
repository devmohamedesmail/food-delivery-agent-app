import React from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from '../ui/button'

export default function NoStore() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleCreateStore = () => {
    router.push('/stores/create')
  }

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      {/* Icon Container */}
      <View className="mb-8">
        <View className="w-32 h-32 bg-primary/10 rounded-full justify-center items-center">
          <Ionicons name="storefront-outline" size={64} color="#fd4a12" />
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-text text-center mb-4">
        {t('store.noStoreTitle')}
      </Text>

      {/* Message */}
      <Text className="text-base text-gray-600 text-center mb-8 px-4 leading-6">
        {t('store.noStoreMessage')}
      </Text>





      <View className='flex flex-row justify-between  space-x-4 p-2 w-full gap-5'>

        <Button
          icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
          title={t('store.createStoreButton')}
          onPress={handleCreateStore}
        />

        <Button
          icon={<FontAwesome name="user-o" size={24} color="white" />}
          title={t('account.account')}
          onPress={() => router.push('/account')}
        />
      </View>



    </View>
  )
}