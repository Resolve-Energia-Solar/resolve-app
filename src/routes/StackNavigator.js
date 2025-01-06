import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/splash'
import HomeScreen from '../screens/home'
import LoginScreen from '../screens/auth/login'
import PreSaleOnboarding from '../screens/onboarding/PreSale'
import ContractScreen from '../screens/contract'
import CompletionScreen from '../screens/onboarding/Completion'
import ProfileScreen from '../screens/profile'
import NotificationsScreen from '../screens/notice'
import SupportScreen from '../screens/support'
import Accommodation from '../screens/onboarding/Accommodation'
import VideoReels from '../screens/videoReels'
import PaymentScreen from '../screens/payment'
import { ContractTrackingScreen } from '../screens/contractTracking'
import ProductScreen from '../screens/product'

const Stack = createStackNavigator()

export default function StackNavigator () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Pre-sale' component={PreSaleOnboarding} />
      <Stack.Screen name='Contract' component={ContractScreen} />
      <Stack.Screen name='Completion' component={CompletionScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='support' component={SupportScreen} />
      <Stack.Screen name='Notifications' component={NotificationsScreen} />
      <Stack.Screen name='Accommodation' component={Accommodation} />
      <Stack.Screen name='Reels' component={VideoReels} />
      <Stack.Screen name='Product' component={ProductScreen} />
      <Stack.Screen name='Payment' component={PaymentScreen} />
      <Stack.Screen
        name='ContractTracking'
        component={ContractTrackingScreen}
      />
    </Stack.Navigator>
  )
}
