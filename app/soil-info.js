import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SoilInfo() {
  const soilTypes = [
    { name: 'Clay Soil', description: 'Heavy soil with high water retention', suitability: 'Rice, Wheat' },
    { name: 'Sandy Soil', description: 'Light soil with good drainage', suitability: 'Groundnut, Potato' },
    { name: 'Loamy Soil', description: 'Balanced soil with good fertility', suitability: 'Most crops' },
    { name: 'Red Soil', description: 'Rich in iron, slightly acidic', suitability: 'Cotton, Tobacco' },
    { name: 'Black Soil', description: 'Rich in minerals, good for cotton', suitability: 'Cotton, Sugarcane' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={40} color="#4CAF50" />
        <Text style={styles.title}>Soil Information</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="location" size={24} color="#4CAF50" />
          <Text style={styles.searchButtonText}>Enter Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.soilTypesContainer}>
        <Text style={styles.sectionTitle}>Common Soil Types</Text>
        {soilTypes.map((soil, index) => (
          <View key={index} style={styles.soilCard}>
            <View style={styles.soilHeader}>
              <Text style={styles.soilName}>{soil.name}</Text>
              <Ionicons name="information-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.soilDescription}>{soil.description}</Text>
            <View style={styles.suitabilityContainer}>
              <Text style={styles.suitabilityLabel}>Suitable for:</Text>
              <Text style={styles.suitabilityText}>{soil.suitability}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Soil Care Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#4CAF50" style={styles.tipIcon} />
          <Text style={styles.tipText}>Regular soil testing helps maintain optimal pH levels</Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#4CAF50" style={styles.tipIcon} />
          <Text style={styles.tipText}>Organic matter improves soil structure and fertility</Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#4CAF50" style={styles.tipIcon} />
          <Text style={styles.tipText}>Proper irrigation prevents soil erosion</Text>
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
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  searchContainer: {
    padding: 15,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  soilTypesContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  soilCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  soilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  soilName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  soilDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  suitabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suitabilityLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  suitabilityText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  tipsContainer: {
    padding: 15,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
}); 