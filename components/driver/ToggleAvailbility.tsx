import React from 'react'
import { View, TouchableOpacity ,Text} from 'react-native'
import axios from 'axios'
import { Toast } from 'toastify-react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from "@expo/vector-icons";

export default function ToggleAvailbility({ profileData, refetchProfile }: { profileData: any, refetchProfile: any }) {

    const { t } = useTranslation()
    const toggle_availablity = async () => {
        try {
            const res = await axios.patch(`/drivers/${profileData?.data?.driver?.id}/toggle-availability`);
            await refetchProfile();

        } catch (error) {
            console.log("Error toggling availability:", error);
            Toast.show({
                type: 'error',
                text1: t('common.error_happened'),
            })
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={toggle_availablity}>
                <View className={`mx-4 mt-6 p-4 rounded-2xl items-center ${profileData?.data?.driver?.is_available ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Text className={`text-lg font-semibold ${profileData?.data?.driver?.is_available ? 'text-green-800' : 'text-red-800'}`}>
                        {profileData?.data?.driver?.is_available ? t('driver.available') : t('driver.unavailable')}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
