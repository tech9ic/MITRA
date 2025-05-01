import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RuralLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Ionicons name="arrow-back" size={24} color="#333" style={{ marginLeft: 10 }} />
        ),
      }}>
      <Stack.Screen
        name="kissan-helpline"
        options={{
          title: 'Kissan Helpline',
        }}
      />
      <Stack.Screen
        name="soil-analysis"
        options={{
          title: 'Soil Analysis',
        }}
      />
      <Stack.Screen
        name="farmer-groups"
        options={{
          title: 'Farmer Groups',
        }}
      />
      <Stack.Screen
        name="training"
        options={{
          title: 'Training Programs',
        }}
      />
    </Stack>
  );
} 