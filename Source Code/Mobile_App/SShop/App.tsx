import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './src/components/apps/AppNavigation'
import { AppContextProvider, AppContext } from './src/components/apps/AppContext';
const NavigationApp = () => {
  return (
    <NavigationContainer independent={true}>
      <AppNavigation />
    </NavigationContainer>
  )
}
const App = () => {
  return (
    <View style={{ flex: 1 }}>
        <AppContextProvider>
          <NavigationApp />
        </AppContextProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})