import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';
import { GardenProvider } from '../src/context/GardenContext';
import { theme } from '../src/global/themes';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.dark}
        translucent
      />
      <AuthProvider>
        <GardenProvider>
          <Slot />
        </GardenProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
