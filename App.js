import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/routes/StackNavigator'
import { GlobalProvider } from './src/contexts/GlobalContext'

export default function App () {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GlobalProvider>
  )
}
