import React from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function NoTrips() {
    const { t } = useTranslation()
    return (
        <View className="flex-1 justify-center items-center mt-20">
            <AntDesign name="car" size={30} color="gray" />
            <Text className="text-gray-400">{t('driver.noTrips')}</Text>
        </View>
    )
}
