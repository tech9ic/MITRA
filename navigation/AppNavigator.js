import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../app/index';
import WeatherScreen from '../screens/WeatherScreen';
import CropPlannerScreen from '../screens/CropPlannerScreen';
import MarketScreen from '../screens/MarketScreen';
import TipsScreen from '../screens/TipsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
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
          } else if (route.name === 'Tips') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Planner" component={CropPlannerScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Tips" component={TipsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator; 