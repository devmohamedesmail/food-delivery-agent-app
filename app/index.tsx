import { AuthContext } from '@/context/auth_context'
import React, { useContext } from 'react'
import {  Text, SafeAreaView,  } from 'react-native'
import RestaurantHomeScreen from '@/components/RestaurantHomeScreen'
import DriverHomeScreen from '@/components/DriverHomeScreen'




export default function Home() {
  const { auth } = useContext(AuthContext)
  

  // Show appropriate home screen based on user role
  if (auth?.user?.role === 'driver') {
    return <DriverHomeScreen />
  } else if (auth?.user?.role === 'restaurant_owner') {
    return <RestaurantHomeScreen />
  } else {
    // Fallback or loading state
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Loading...</Text>
      </SafeAreaView>
    )
  }
}
