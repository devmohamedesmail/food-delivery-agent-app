import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import Header from '@/components/ui/header'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation()
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-50"
        >
            <Header title={t('store.createStore')} />
            {children}
        </KeyboardAvoidingView>
    )
}
