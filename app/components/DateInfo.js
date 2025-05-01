import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/CalendarStyles';

/**
 * DateInfo Component
 * Displays detailed information about a selected date.
 * Shows weather conditions and farming activities for the selected date.
 */
export default function DateInfo({ selectedDayInfo, months, onClose }) {
  if (!selectedDayInfo || !selectedDayInfo.date) return null;

  const { date, weather, farmingActivity } = selectedDayInfo;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  /**
   * Format date to display
   * @param {Date} date - The date to format
   * @returns {string} - Formatted date string
   */
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.selectedDayInfo}>
      <View style={styles.selectedDayHeader}>
        <Text style={styles.selectedDayTitle}>
          {formatDate(date)}
        </Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      {selectedDayInfo.hasWeather && (
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons name="thermometer" size={20} color="#4CAF50" />
            <Text style={styles.infoCardTitle}>Weather</Text>
          </View>
          <Text style={styles.infoText}>Temperature: {weather.temperature}°C</Text>
          <Text style={styles.infoText}>Condition: {weather.condition}</Text>
          <Text style={styles.infoText}>Humidity: {weather.humidity}%</Text>
        </View>
      )}
      
      {selectedDayInfo.hasFarming && (
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons name="leaf" size={20} color="#4CAF50" />
            <Text style={styles.infoCardTitle}>Farming Activity</Text>
          </View>
          <Text style={styles.infoText}>Activity: {farmingActivity.activity}</Text>
          <Text style={styles.infoText}>Crop: {farmingActivity.crop}</Text>
          <Text style={styles.infoText}>Status: {farmingActivity.status}</Text>
        </View>
      )}
    </View>
  );
} 