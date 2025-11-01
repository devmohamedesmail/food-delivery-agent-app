import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { Toast } from 'toastify-react-native'
import CustomLoading from '@/components/custom/customloading'
import CustomHeader from '@/components/custom/customheader'

interface OrderItem {
  id: number
  meal_name: string
  quantity: number
  price: string
}

interface Order {
  id: number
  customer_name: string
  customer_phone: string
  total_amount: string
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  delivery_address: string
  order_date: string
  items: OrderItem[]
}

export default function Orders() {
  const { t } = useTranslation()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all')

  // Mock data for demonstration - replace with actual API call
  const mockOrders: Order[] = [
    {
      id: 1,
      customer_name: "Ahmed Ali",
      customer_phone: "+971501234567",
      total_amount: "85.50",
      status: "pending",
      delivery_address: "Downtown Dubai, Business Bay",
      order_date: "2024-01-15T10:30:00Z",
      items: [
        { id: 1, meal_name: "Chicken Shawarma", quantity: 2, price: "25.00" },
        { id: 2, meal_name: "Falafel Plate", quantity: 1, price: "18.50" },
        { id: 3, meal_name: "Hummus", quantity: 2, price: "12.00" }
      ]
    },
    {
      id: 2,
      customer_name: "Sarah Johnson",
      customer_phone: "+971507654321",
      total_amount: "42.00",
      status: "preparing",
      delivery_address: "Marina Walk, Dubai Marina",
      order_date: "2024-01-15T11:15:00Z",
      items: [
        { id: 4, meal_name: "Grilled Salmon", quantity: 1, price: "42.00" }
      ]
    },
    {
      id: 3,
      customer_name: "Mohammed Hassan",
      customer_phone: "+971509876543",
      total_amount: "67.25",
      status: "ready",
      delivery_address: "Al Barsha, Mall of Emirates",
      order_date: "2024-01-15T09:45:00Z",
      items: [
        { id: 5, meal_name: "Mixed Grill", quantity: 1, price: "55.00" },
        { id: 6, meal_name: "Arabic Coffee", quantity: 2, price: "6.25" }
      ]
    }
  ]

  const fetchOrders = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setOrders(mockOrders)
        setLoading(false)
        setRefreshing(false)
      }, 1000)
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      Toast.error(t('failed_to_load_orders'))
      setLoading(false)
      setRefreshing(false)
    }
  }

  const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
    try {
      // Simulate API call
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
      Toast.success(t('order_status_updated'))
    } catch (error) {
      console.error('Error updating order status:', error)
      Toast.error(t('failed_to_update_status'))
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'time-outline'
      case 'accepted': return 'checkmark-circle-outline'
      case 'preparing': return 'restaurant-outline'
      case 'ready': return 'bag-check-outline'
      case 'completed': return 'checkmark-done-outline'
      case 'cancelled': return 'close-circle-outline'
      default: return 'help-outline'
    }
  }

  const filteredOrders = orders.filter(order => {
    switch (activeTab) {
      case 'pending': return order.status === 'pending'
      case 'active': return ['accepted', 'preparing', 'ready'].includes(order.status)
      case 'completed': return ['completed', 'cancelled'].includes(order.status)
      default: return true
    }
  })

  const onRefresh = () => {
    setRefreshing(true)
    fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <CustomLoading 
          variant="spinner" 
          size="large" 
          text={t('loading_orders')} 
        />
    )
  }

  const renderOrderCard = (order: Order) => (
    <View key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Status Bar */}
      <View className={`h-1 ${
        order.status === 'pending' ? 'bg-yellow-400' :
        order.status === 'accepted' ? 'bg-blue-400' :
        order.status === 'preparing' ? 'bg-orange-400' :
        order.status === 'ready' ? 'bg-green-400' :
        order.status === 'completed' ? 'bg-gray-400' : 'bg-red-400'
      }`} />
      
      <View className="p-6">
        {/* Enhanced Order Header */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="receipt" size={16} color="#3B82F6" />
              </View>
              <Text
                className="text-lg font-bold text-gray-800"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('order')} #{order.id}
              </Text>
            </View>
            
            <View className="flex-row items-center ml-11">
              <Ionicons name="person" size={16} color="#6B7280" />
              <Text
                className="text-gray-600 ml-2 font-medium"
                style={{ fontFamily: 'Cairo_500Medium' }}
              >
                {order.customer_name}
              </Text>
            </View>
          </View>
          
          <View className="items-end">
            <View className={`px-4 py-2 rounded-xl ${getStatusColor(order.status)} shadow-sm`}>
              <View className="flex-row items-center">
                <Ionicons name={getStatusIcon(order.status)} size={16} color="currentColor" />
                <Text
                  className="ml-2 font-bold text-sm"
                  style={{ fontFamily: 'Cairo_700Bold' }}
                >
                  {t(order.status)}
                </Text>
              </View>
            </View>
            
            <View className="bg-green-50 px-3 py-1 rounded-lg mt-2">
              <Text
                className="text-2xl font-bold text-green-700"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                ${order.total_amount}
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Order Details */}
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="call" size={14} color="#10B981" />
              </View>
              <Text
                className="text-gray-700 font-medium"
                style={{ fontFamily: 'Cairo_500Medium' }}
              >
                {order.customer_phone}
              </Text>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center mr-3 mt-0.5">
                <Ionicons name="location" size={14} color="#3B82F6" />
              </View>
              <Text
                className="text-gray-700 flex-1 font-medium"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {order.delivery_address}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-purple-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="time" size={14} color="#8B5CF6" />
              </View>
              <Text
                className="text-gray-700 font-medium"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {new Date(order.order_date).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Order Items */}
        <View className="mb-4">
          <Text
            className="text-lg font-bold text-gray-800 mb-3"
            style={{ fontFamily: 'Cairo_700Bold' }}
          >
            {t('order_items')} ({order.items.length})
          </Text>
          
          <View className="bg-gray-50 rounded-xl p-4">
            {order.items.map((item, index) => (
              <View key={item.id} className={`flex-row justify-between items-center py-3 ${
                index < order.items.length - 1 ? 'border-b border-gray-200' : ''
              }`}>
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-3">
                    <Text
                      className="text-orange-600 font-bold text-sm"
                      style={{ fontFamily: 'Cairo_700Bold' }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                  <Text
                    className="text-gray-800 font-medium flex-1"
                    style={{ fontFamily: 'Cairo_500Medium' }}
                  >
                    {item.meal_name}
                  </Text>
                </View>
                
                <View className="bg-white px-3 py-1 rounded-lg">
                  <Text
                    className="text-gray-800 font-bold"
                    style={{ fontFamily: 'Cairo_700Bold' }}
                  >
                    ${item.price}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Enhanced Action Buttons */}
        {order.status === 'pending' && (
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => updateOrderStatus(order.id, 'cancelled')}
              className="flex-1 bg-white border-2 border-red-300 py-4 rounded-2xl shadow-sm"
              style={{ 
                shadowColor: '#EF4444',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
            >
              <View className="flex-row items-center justify-center">
                <View className="w-6 h-6 bg-red-100 rounded-full items-center justify-center mr-2">
                  <Ionicons name="close" size={14} color="#DC2626" />
                </View>
                <Text
                  className="text-red-600 font-bold text-base"
                  style={{ fontFamily: 'Cairo_700Bold' }}
                >
                  {t('reject')}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => updateOrderStatus(order.id, 'accepted')}
              className="flex-1 bg-green-500 py-4 rounded-2xl shadow-lg"
              style={{ 
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6
              }}
            >
              <View className="flex-row items-center justify-center">
                <View className="w-6 h-6 bg-white bg-opacity-20 rounded-full items-center justify-center mr-2">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
                <Text
                  className="text-white font-bold text-base"
                  style={{ fontFamily: 'Cairo_700Bold' }}
                >
                  {t('accept')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {order.status === 'accepted' && (
          <TouchableOpacity
            onPress={() => updateOrderStatus(order.id, 'preparing')}
            className="bg-orange-500 py-5 rounded-2xl shadow-lg"
            style={{ 
              shadowColor: '#F97316',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-8 h-8 bg-white bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Ionicons name="restaurant" size={18} color="white" />
              </View>
              <Text
                className="text-white font-bold text-lg"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('start_preparing')}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {order.status === 'preparing' && (
          <TouchableOpacity
            onPress={() => updateOrderStatus(order.id, 'ready')}
            className="bg-blue-500 py-5 rounded-2xl shadow-lg"
            style={{ 
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-8 h-8 bg-white bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Ionicons name="bag-check" size={18} color="white" />
              </View>
              <Text
                className="text-white font-bold text-lg"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('mark_ready')}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {order.status === 'ready' && (
          <TouchableOpacity
            onPress={() => updateOrderStatus(order.id, 'completed')}
            className="bg-emerald-500 py-5 rounded-2xl shadow-lg"
            style={{ 
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-8 h-8 bg-white bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark-done" size={18} color="white" />
              </View>
              <Text
                className="text-white font-bold text-lg"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('mark_completed')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Enhanced Header */}
      <View className="bg-white shadow-lg border-b border-gray-100" style={{ paddingTop: 50 }}>
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4">
            <Text
              className="text-xl font-bold text-gray-800 text-center"
              style={{ fontFamily: 'Cairo_700Bold' }}
            >
              {t('orders')}
            </Text>
            <Text
              className="text-sm text-gray-500 text-center mt-1"
              style={{ fontFamily: 'Cairo_400Regular' }}
            >
              Manage incoming orders
            </Text>
          </View>
          
          <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
            <Ionicons name="notifications" size={20} color="#3B82F6" />
          </View>
        </View>

        {/* Stats Bar */}
        <View className="px-6 pb-4">
          <View className="flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Cairo_700Bold' }}>
                {orders.filter(o => o.status === 'pending').length}
              </Text>
              <Text className="text-blue-600 text-xs" style={{ fontFamily: 'Cairo_400Regular' }}>
                Pending
              </Text>
            </View>
            <View className="w-px h-8 bg-blue-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Cairo_700Bold' }}>
                {orders.filter(o => ['accepted', 'preparing', 'ready'].includes(o.status)).length}
              </Text>
              <Text className="text-orange-600 text-xs" style={{ fontFamily: 'Cairo_400Regular' }}>
                Active
              </Text>
            </View>
            <View className="w-px h-8 bg-blue-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Cairo_700Bold' }}>
                {orders.filter(o => o.status === 'completed').length}
              </Text>
              <Text className="text-green-600 text-xs" style={{ fontFamily: 'Cairo_400Regular' }}>
                Completed
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Enhanced Tabs */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl ${
                  activeTab === tab 
                    ? 'bg-blue-600 shadow-lg' 
                    : 'bg-gray-100 border border-gray-200'
                }`}
              >
                <View className="flex-row items-center">
                  <Ionicons 
                    name={
                      tab === 'all' ? 'list-outline' :
                      tab === 'pending' ? 'time-outline' :
                      tab === 'active' ? 'flash-outline' :
                      'checkmark-circle-outline'
                    } 
                    size={16} 
                    color={activeTab === tab ? 'white' : '#6B7280'} 
                  />
                  <Text
                    className={`font-semibold ml-2 ${
                      activeTab === tab ? 'text-white' : 'text-gray-600'
                    }`}
                    style={{ fontFamily: 'Cairo_600SemiBold' }}
                  >
                    {t(tab)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredOrders.length === 0 ? (
          /* Enhanced Empty State */
          <View className="flex-1 justify-center items-center px-6" style={{ minHeight: 400 }}>
            <View className="bg-white rounded-3xl p-8 items-center shadow-sm w-full max-w-sm">
              <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-6">
                <Ionicons name="receipt" size={48} color="#3B82F6" />
              </View>
              
              <Text
                className="text-gray-800 text-xl font-bold mb-3 text-center"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('no_orders_found')}
              </Text>
              
              <Text
                className="text-gray-500 text-center mb-6 leading-6"
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {t('orders_will_appear_here')}
              </Text>

              <View className="bg-blue-50 rounded-2xl p-4 w-full">
                <View className="flex-row items-center justify-center">
                  <Ionicons name="information-circle" size={20} color="#3B82F6" />
                  <Text
                    className="text-blue-700 font-medium ml-2 text-center"
                    style={{ fontFamily: 'Cairo_500Medium' }}
                  >
                    Orders will show here when received
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* Enhanced Orders List */
          <View className="px-6 py-6">
            {/* List Header */}
            <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text
                    className="text-lg font-bold text-gray-800"
                    style={{ fontFamily: 'Cairo_700Bold' }}
                  >
                    {activeTab === 'all' ? 'All Orders' : 
                     activeTab === 'pending' ? 'Pending Orders' :
                     activeTab === 'active' ? 'Active Orders' : 'Completed Orders'}
                  </Text>
                  <Text
                    className="text-gray-500 mt-1"
                    style={{ fontFamily: 'Cairo_400Regular' }}
                  >
                    {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
                  </Text>
                </View>
                
                <View className="flex-row items-center bg-green-100 px-3 py-2 rounded-xl">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-2"></View>
                  <Text
                    className="text-green-700 font-medium text-sm"
                    style={{ fontFamily: 'Cairo_500Medium' }}
                  >
                    Live Updates
                  </Text>
                </View>
              </View>
            </View>

            {/* Orders Cards */}
            <View className="space-y-4">
              {filteredOrders.map(renderOrderCard)}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
