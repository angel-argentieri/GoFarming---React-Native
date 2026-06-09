// src/components/CustomTabBar/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { theme } from '../../global/themes';

const { width } = Dimensions.get('window');

const TAB_BAR_HEIGHT = 80;

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const getIcon = (name: string, isFocused: boolean) => {
    const color = isFocused ? theme.colors.secondary : theme.colors.inactiveGrey;
    const size = 26;

    switch (name) {
      case 'Home':
        return <MaterialCommunityIcons name="home" size={size} color={color} />;
      case 'Config':
        return <Feather name="settings" size={size} color={color} />;
      case 'Perfil':
        return <Feather name="user" size={size} color={color} />;
      default:
        return <Feather name="box" size={size} color={color} />;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      
      <View style={styles.mainBar}>
        {state.routes
          .filter((route: any) => ['Home', 'Config', 'Perfil'].includes(route.name))
          .map((route: any) => {
          const isFocused = route.name === state.routes[state.index]?.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                {getIcon(route.name, isFocused)}
              </View>
              <Text style={[styles.tabLabel, { color: isFocused ? theme.colors.secondary : theme.colors.inactiveGrey }]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: TAB_BAR_HEIGHT,
    backgroundColor: theme.colors.dark,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainBar: {
    flexDirection: 'row',
    width: '100%',
    height: TAB_BAR_HEIGHT,
    backgroundColor: theme.colors.dark,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
