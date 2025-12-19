import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';


export default function AccountSettingButton({ onPress, title, icon }: { title: string, onPress: () => void, icon: React.ReactNode }) {
    return (
        <TouchableOpacity
            className='bg-white py-7  border-b border-b-gray-200 rounded-xl px-4 mb-1 flex-row justify-center items-center'
            onPress={onPress}>
            <View>
                <Entypo name="chevron-left" size={24} color="gray" />
            </View>
            <View className='flex-1 flex flex-row items-center justify-end mx-3'>
                <Text>{title}</Text>
            </View>
            <View className='bg-primary/20 rounded-full p-2 flex items-center justify-center w-10 h-10'>
                {/* <SimpleLineIcons name="logout" size={16} color={Colors.light.tabIconSelected} /> */}
                {icon}
            </View>
        </TouchableOpacity>
    )
}
