import React from 'react'
import { View, Modal } from 'react-native'
import { useTheme } from '@/context/theme-provider';
import Colors from '@/constants/Colors';

export default function CustomModal(
    {
        visible,
        onClose,
        children,
        animation = "slide",
        overlayOpacity = 0.4,
    }: any
) {
    const { theme } = useTheme();
    const activeColors = Colors[theme];

    return (
        <Modal
            animationType={animation}
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: `rgba(0,0,0,${overlayOpacity})`, justifyContent: 'flex-end' }}>

                {/* BOTTOM SHEET */}
                <View style={{
                    backgroundColor: activeColors.background,
                    width: '100%',
                    padding: 20,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    minHeight: 300,
                    borderColor: theme === 'dark' ? '#333' : 'transparent',
                    borderWidth: theme === 'dark' ? 1 : 0
                }}>
                    <View className={`w-12 h-1.5 rounded-full self-center mb-4 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />

                    {children}


                </View>
            </View>
        </Modal>
    )
}
