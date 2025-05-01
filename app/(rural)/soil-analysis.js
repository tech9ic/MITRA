import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SoilAnalysisScreen() {
  const [soilData, setSoilData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
  });

  const handleInputChange = (parameter, value) => {
    setSoilData(prev => ({
      ...prev,
      [parameter]: value,
    }));
  };

  const soilParameters = [
    {
      id: 'pH',
      title: 'Soil pH',
      description: 'Measure of soil acidity or alkalinity',
      icon: 'flask',
      color: '#4CAF50',
      range: '6.0 - 7.0 (Optimal)',
    },
    {
      id: 'nitrogen',
      title: 'Nitrogen (N)',
      description: 'Essential for leaf growth',
      icon: 'leaf',
      color: '#2196F3',
      range: '20-40 ppm (Optimal)',
    },
    {
      id: 'phosphorus',
      title: 'Phosphorus (P)',
      description: 'Important for root development',
      icon: 'nutrition',
      color: '#FF9800',
      range: '10-20 ppm (Optimal)',
    },
    {
      id: 'potassium',
      title: 'Potassium (K)',
      description: 'Helps in disease resistance',
      icon: 'shield',
      color: '#9C27B0',
      range: '150-250 ppm (Optimal)',
    },
    {
      id: 'organicMatter',
      title: 'Organic Matter',
      description: 'Improves soil structure',
      icon: 'leaf',
      color: '#795548',
      range: '2-5% (Optimal)',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Soil Analysis</Text>
        <Text style={styles.subtitle}>Enter your soil test results</Text>
      </View>

      <View style={styles.formContainer}>
        {soilParameters.map((param) => (
          <View key={param.id} style={styles.inputCard}>
            <View style={styles.paramHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${param.color}20` }]}>
                <Ionicons name={param.icon} size={24} color={param.color} />
              </View>
              <View style={styles.paramInfo}>
                <Text style={styles.paramTitle}>{param.title}</Text>
                <Text style={styles.paramRange}>{param.range}</Text>
              </View>
            </View>
            <Text style={styles.paramDescription}>{param.description}</Text>
            <TextInput
              style={styles.input}
              value={soilData[param.id]}
              onChangeText={(value) => handleInputChange(param.id, value)}
              placeholder={`Enter ${param.title}`}
              keyboardType="numeric"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.analyzeButton}>
          <Text style={styles.analyzeButtonText}>Analyze Soil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Soil Analysis Tips</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • Collect soil samples from multiple locations{'\n'}
            • Take samples from 6-8 inches depth{'\n'}
            • Avoid sampling after recent fertilizer application{'\n'}
            • Dry soil samples before testing{'\n'}
            • Test soil every 2-3 years
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    padding: 15,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  paramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  paramInfo: {
    flex: 1,
  },
  paramTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paramRange: {
    fontSize: 12,
    color: '#666',
  },
  paramDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
}); 