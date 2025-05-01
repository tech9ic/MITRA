import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Crops() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Crop Management</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Crops</Text>
          <View style={styles.cropItem}>
            <Text style={styles.cropName}>Rice</Text>
            <Text style={styles.cropDetails}>Planted: 15 March 2024</Text>
          </View>
          <View style={styles.cropItem}>
            <Text style={styles.cropName}>Wheat</Text>
            <Text style={styles.cropDetails}>Planned for next season</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    paddingTop: 60,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  cropItem: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cropDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
}); 