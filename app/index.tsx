import { AuthContext } from '@/context/auth_context'
import React, { useContext } from 'react'
import { Text } from 'react-native'
import { Link, Redirect, router } from 'expo-router'
import Loading from '@/components/custom/Loading'
import { SafeAreaView } from 'react-native-safe-area-context'
import useFetch from '@/hooks/useFetch'



export default function Home() {
  const { auth, isLoading } = useContext(AuthContext)
  const { data:profileData,
          loading:profileLoading ,
          error:profileError,
          refetch:refetchProfile
        } =useFetch(`/users/profile/${auth?.user?.id}`)

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Loading />
    )
  }

  // If no auth, redirect to login
  if (!auth) {
    return <Redirect href="/auth/login" />
  }


  // Show appropriate home screen based on user role
  if (auth?.user?.role.role === "driver") {
    // return <DriverHomeScreen />
    router.push('/driver')
  } else if (auth?.user?.role.role === "store_owner") {
    // return <StoreHomeScreen />
    router.push('/stores')
  } else {
    // Fallback for unknown role
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-black">
          {auth?.user?.role.role}
          fsdfsfasdf
          <Link href="/auth/login">Go to Login</Link>
          <Link href="/account">account</Link>
        </Text>
      </SafeAreaView>
    )
  }
}
