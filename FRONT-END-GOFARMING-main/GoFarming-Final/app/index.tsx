import React from 'react';
import { View } from 'react-native';
import Routes from '../src/navigation/routes'; 

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
}