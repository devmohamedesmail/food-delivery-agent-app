import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@/context/theme-provider';
import Colors from '@/constants/Colors';


export default function AccountSettingButton({ onPress, title, icon }: { title: string, onPress: () => void, icon: React.ReactNode }) {
    const { theme } = useTheme();
    const activeColors = Colors[theme];

    return (
        <TouchableOpacity
            className='py-7 border-b rounded-xl px-4 mb-1 flex-row justify-center items-center'
            style={{
                backgroundColor: activeColors.background,
                borderColor: theme === 'dark' ? '#333' : '#e5e7eb'
            }}
            onPress={onPress}>
            <View>
                <Entypo name="chevron-left" size={24} color={theme === 'dark' ? '#9ca3af' : 'gray'} />
            </View>
            <View className='flex-1 flex flex-row items-center justify-end mx-3'>
                <Text style={{ color: activeColors.text, fontFamily: 'Cairo_600SemiBold' }}>{title}</Text>
            </View>
            <View className='bg-primary/20 rounded-full p-2 flex items-center justify-center w-10 h-10'>
                {icon}
            </View>
        </TouchableOpacity>
    )
}
