import React from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from '../ui/button'
import { useTheme } from '@/context/theme-provider';
import Colors from '@/constants/Colors';

export default function NoStore() {
  const { t } = useTranslation()
  const router = useRouter()
  const { theme } = useTheme();
  const activeColors = Colors[theme];

  const handleCreateStore = () => {
    router.push('/stores/create')
  }

  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: activeColors.background }}
    >
      {/* Icon Container */}
      <View className="mb-8">
        <View className="w-32 h-32 bg-primary/10 rounded-full justify-center items-center">
          <Ionicons name="storefront-outline" size={64} color="#fd4a12" />
        </View>
      </View>

      {/* Title */}
      <Text
        className="text-2xl font-bold text-center mb-4"
        style={{ color: activeColors.text }}
      >
        {t('store.noStoreTitle')}
      </Text>

      {/* Message */}
      <Text
        className="text-base text-center mb-8 px-4 leading-6"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}
      >
        {t('store.noStoreMessage')}
      </Text>





      <View className='flex flex-row justify-between  space-x-4 p-2 w-full gap-5'>

        <Button
          icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
          title={t('store.createStoreButton')}
          onPress={handleCreateStore}
        />

        <Button
          icon={<FontAwesome name="user-o" size={24} color={theme === 'dark' ? 'white' : 'white'} />}
          title={t('account.account')}
          onPress={() => router.push('/account')}
          className={theme === 'dark' ? 'bg-gray-700' : ''}
          style={theme === 'dark' ? { backgroundColor: '#333' } : {}}
        />
      </View>



    </View>
  )
}