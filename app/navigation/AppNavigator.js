import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../index';
import WeatherScreen from '../../screens/WeatherScreen';
import CropPlannerScreen from '../../screens/CropPlannerScreen';
import MarketScreen from '../../screens/MarketPriceScreen';
import HelpScreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
          } else if (route.name === 'Planner') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingVertical: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Weather" 
        component={WeatherScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Planner" 
        component={CropPlannerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Market" 
        component={MarketScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
} 