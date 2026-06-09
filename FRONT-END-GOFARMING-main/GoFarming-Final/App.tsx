import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/routes';
import { theme } from './src/global/themes';
import { AuthProvider } from './src/context/AuthContext';
import { GardenProvider } from './src/context/GardenContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.dark}
        translucent
      />
      <NavigationContainer>
        <AuthProvider>
          <GardenProvider>
            <Routes />
          </GardenProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
