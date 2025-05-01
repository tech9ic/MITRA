import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Logo({ size = 150, color = '#4CAF50' }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Ionicons name="leaf" size={size * 0.6} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 