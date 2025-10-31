import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface CustomLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  size?: 'small' | 'medium' | 'large'
  color?: string
  text?: string
  overlay?: boolean
}

export default function CustomLoading({ 
  variant = 'spinner', 
  size = 'medium', 
  color = '#3B82F6',
  text,
  overlay = false
}: CustomLoadingProps) {
  const animatedValue = useRef(new Animated.Value(0)).current
  const pulseValue = useRef(new Animated.Value(1)).current
  const dotValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current

  // Size configurations
  const sizeConfig = {
    small: { container: 40, icon: 20, text: 12 },
    medium: { container: 60, icon: 30, text: 14 },
    large: { container: 80, icon: 40, text: 16 }
  }

  const currentSize = sizeConfig[size]

  useEffect(() => {
    if (variant === 'spinner') {
      const spinAnimation = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      )
      spinAnimation.start()
      return () => spinAnimation.stop()
    }

    if (variant === 'pulse') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.3,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      )
      pulseAnimation.start()
      return () => pulseAnimation.stop()
    }

    if (variant === 'dots') {
      const createDotAnimation = (value: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(value, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        )
      }

      const dotAnimations = dotValues.map((value, index) => 
        createDotAnimation(value, index * 200)
      )
      
      dotAnimations.forEach(animation => animation.start())
      return () => dotAnimations.forEach(animation => animation.stop())
    }

    if (variant === 'bars') {
      const createBarAnimation = (value: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(value, {
              toValue: 1,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0.3,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        )
      }

      const barAnimations = dotValues.map((value, index) => 
        createBarAnimation(value, index * 100)
      )
      
      barAnimations.forEach(animation => animation.start())
      return () => barAnimations.forEach(animation => animation.stop())
    }
  }, [variant])

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const renderSpinner = () => (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
        width: currentSize.container,
        height: currentSize.container,
      }}
    >
      <View className="w-full h-full rounded-full border-2 border-gray-200">
        <View 
          className="absolute w-full h-full rounded-full border-2 border-transparent"
          style={{ 
            borderTopColor: color,
            borderRightColor: color,
          }}
        />
      </View>
    </Animated.View>
  )

  const renderDots = () => (
    <View className="flex-row space-x-1">
      {dotValues.map((value, index) => (
        <Animated.View
          key={index}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            opacity: value,
            transform: [{ scale: value }],
          }}
        />
      ))}
    </View>
  )

  const renderPulse = () => (
    <Animated.View
      className="rounded-full"
      style={{
        width: currentSize.container,
        height: currentSize.container,
        backgroundColor: color,
        opacity: 0.6,
        transform: [{ scale: pulseValue }],
      }}
    />
  )

  const renderBars = () => (
    <View className="flex-row items-end space-x-1">
      {dotValues.map((value, index) => (
        <Animated.View
          key={index}
          className="w-1 rounded-full"
          style={{
            height: 20,
            backgroundColor: color,
            transform: [{ scaleY: value }],
          }}
        />
      ))}
    </View>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner()
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'bars':
        return renderBars()
      default:
        return renderSpinner()
    }
  }

  const LoadingContent = () => (
    <View className="items-center justify-center">
      {renderLoader()}
      {text && (
        <Text
          className="mt-3 text-gray-600 text-center"
          style={{ 
            fontFamily: 'Cairo_400Regular',
            fontSize: currentSize.text,
          }}
        >
          {text}
        </Text>
      )}
    </View>
  )

  if (overlay) {
    return (
      <View className="absolute inset-0 bg-black/20 items-center justify-center z-50">
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <LoadingContent />
        </View>
      </View>
    )
  }

  return <LoadingContent />
}
