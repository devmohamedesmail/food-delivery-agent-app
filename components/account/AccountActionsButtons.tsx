import React, { useContext, useState } from 'react'
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next'
import { AuthContext } from '@/context/auth-provider';
import { useRouter } from 'expo-router';
import CustomModal from '../ui/custom-modal';
import Button from '../ui/button';
import { Toast } from 'toastify-react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';

import { useTheme } from '@/context/theme-provider';

export default function AccountActionsButtons() {
    const { t } = useTranslation()
    const { logout } = useContext(AuthContext)
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const router = useRouter()
    const [loadding, setLoading] = useState(false)
    const { theme } = useTheme();
    const activeColors = Colors[theme];




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
                setLogoutModalVisible(false)
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
        <View className='px-5 mt-10'>
            <TouchableOpacity
                className='py-7 border-b rounded-xl px-4 mb-4 flex-row justify-center items-center'
                style={{
                    backgroundColor: activeColors.background,
                    borderColor: theme === 'dark' ? '#333' : '#e5e7eb'
                }}
                onPress={() => setLogoutModalVisible(true)}>
                <View>
                    <Entypo name="chevron-left" size={24} color={theme === 'dark' ? '#9ca3af' : 'gray'} />
                </View>
                <View className='flex-1 flex flex-row items-center justify-end mx-3'>
                    <Text style={{ color: activeColors.text, fontFamily: 'Cairo_600SemiBold' }}>{t('account.logout')}</Text>
                </View>
                <View className='bg-primary/20 rounded-full p-2 flex items-center justify-center w-10 h-10'>
                    <SimpleLineIcons name="logout" size={16} color={activeColors.tabIconSelected} />
                </View>
            </TouchableOpacity>







            <CustomModal visible={logoutModalVisible} onClose={() => setLogoutModalVisible(false)} >
                <Text
                    className='text-center mb-4 text-lg'
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
                        onPress={() => setLogoutModalVisible(false)}
                        className='px-4 py-3 w-44'
                        textClassName={theme === 'dark' ? 'text-white' : 'text-gray-800'}
                        style={{ backgroundColor: theme === 'dark' ? '#333' : '#e5e7eb' }}

                    />
                </View>
            </CustomModal>
        </View>
    )
}
