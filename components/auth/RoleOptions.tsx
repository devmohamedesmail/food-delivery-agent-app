import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type UserRole = 3 | 5
export default function RoleOptions({formik}: {formik: any}) {
    const { t } = useTranslation()

    const roleOptions: { value: UserRole; label: string; icon: string }[] = [
        {
            value: 3,
            label: t('auth.store_owner'),
            icon: 'storefront-outline'
        },
        {
            value: 5,
            label: t('auth.driver'),
            icon: 'car-outline'
        }
    ]
    return (
        <View className="my-6">
            <View className="space-y-3">
                {roleOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => formik.setFieldValue('role_id', option.value)}
                        className={`border rounded-xl p-4 mb-3 flex-row-reverse items-center  ${formik.values.role_id === option.value
                            ? 'border-primary bg-black-50'
                            : 'border-gray-200 bg-gray-50'
                            }`}
                    >
                        <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${formik.values.role_id === option.value
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                            }`}>
                            <Ionicons
                                name={option.icon as any}
                                size={20}
                                color={formik.values.role_id === option.value ? 'red' : '#6B7280'}
                            />
                        </View>
                        <Text className={`flex-1 text-right ${formik.values.role_id === option.value
                            ? 'text-priamry'
                            : 'text-gray-700'
                            }`}>
                            {option.label}
                        </Text>
                        {formik.values.role_id === option.value && (
                            <Ionicons name="checkmark-circle" size={24} color="#0c0c0cff" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {formik.touched.role_id && formik.errors.role_id && (
                <Text className="text-red-500 text-sm mt-2">
                    {formik.errors.role_id}
                </Text>
            )}
        </View>
    )
}
