import { AuthContext } from '@/context/auth_context'
import React, { useContext, useEffect } from 'react'
import { Text } from 'react-native'
import { Link, Redirect, router } from 'expo-router'
import Loading from '@/components/custom/Loading'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { auth, isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (!auth) return

    if (auth.user?.role?.role === "driver") {
      router.replace('/driver')
    }

    if (auth.user?.role?.role === "store_owner") {
      router.replace('/stores')
    }
  }, [auth])

  if (isLoading) {
    return <Loading />
  }

  if (!auth) {
    return <Redirect href="/auth/login" />
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-black">
        {auth?.user?.role.role}
      </Text>

      <Link href="/account">Account</Link>
    </SafeAreaView>
  )
}
