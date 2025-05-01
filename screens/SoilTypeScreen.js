import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SoilTypeScreen() {
  const soilData = {
    currentSoil: {
      type: 'Clay Loam',
      pH: '6.5',
      moisture: '65%',
      nutrients: {
        nitrogen: 'Medium',
        phosphorus: 'High',
        potassium: 'Medium',
      },
    },
    recommendations: [
      'Add organic compost to improve soil structure',
      'Consider crop rotation with legumes',
      'Maintain proper irrigation schedule',
    ],
    soilTypes: [
      { name: 'Clay', description: 'Heavy soil, good water retention' },
      { name: 'Sandy', description: 'Light soil, good drainage' },
      { name: 'Loam', description: 'Balanced soil, ideal for most crops' },
      { name: 'Silt', description: 'Medium soil, good fertility' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="terrain" size={40} color="#4CAF50" />
          <Text style={styles.title}>Soil Information</Text>
        </View>

        <View style={styles.currentSoilContainer}>
          <Text style={styles.sectionTitle}>Current Soil Analysis</Text>
          <View style={styles.soilCard}>
            <View style={styles.soilHeader}>
              <Text style={styles.soilType}>{soilData.currentSoil.type}</Text>
              <Text style={styles.soilPH}>pH: {soilData.currentSoil.pH}</Text>
            </View>
            <View style={styles.soilDetails}>
              <View style={styles.detailRow}>
                <MaterialIcons name="water-drop" size={24} color="#4CAF50" />
                <Text style={styles.detailText}>Moisture: {soilData.currentSoil.moisture}</Text>
              </View>
              <View style={styles.nutrientsContainer}>
                <Text style={styles.nutrientTitle}>Nutrient Levels:</Text>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Nitrogen:</Text>
                  <Text style={styles.nutrientValue}>{soilData.currentSoil.nutrients.nitrogen}</Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Phosphorus:</Text>
                  <Text style={styles.nutrientValue}>{soilData.currentSoil.nutrients.phosphorus}</Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Potassium:</Text>
                  <Text style={styles.nutrientValue}>{soilData.currentSoil.nutrients.potassium}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Soil Recommendations</Text>
          {soilData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <MaterialIcons name="eco" size={24} color="#4CAF50" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>

        <View style={styles.soilTypesContainer}>
          <Text style={styles.sectionTitle}>Soil Types Guide</Text>
          {soilData.soilTypes.map((type, index) => (
            <View key={index} style={styles.soilTypeCard}>
              <Text style={styles.soilTypeName}>{type.name}</Text>
              <Text style={styles.soilTypeDesc}>{type.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  currentSoilContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  soilCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  soilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  soilType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  soilPH: {
    fontSize: 16,
    color: '#666',
  },
  soilDetails: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  nutrientsContainer: {
    marginTop: 16,
  },
  nutrientTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  nutrientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nutrientLabel: {
    fontSize: 14,
    color: '#666',
  },
  nutrientValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  recommendationsContainer: {
    marginBottom: 24,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendationText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  soilTypesContainer: {
    marginBottom: 24,
  },
  soilTypeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  soilTypeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  soilTypeDesc: {
    fontSize: 14,
    color: '#666',
  },
}); 