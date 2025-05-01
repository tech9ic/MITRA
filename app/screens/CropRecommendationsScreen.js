import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DistrictsSoilType from '../crop-planner/DistrictsSoilType';
import DistrictCropSuitability from '../crop-planner/DistrictCropSuitabilty';

const CropRecommendationsScreen = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const districts = Object.keys(DistrictsSoilType);

  const generateRecommendations = (district) => {
    if (!district) return null;

    const districtData = DistrictsSoilType[district];
    const suitableCrops = DistrictCropSuitability[district] || [];

    return {
      district: district,
      soilInfo: {
        region: districtData.region,
        soilTypes: districtData.soilTypes
      },
      crops: suitableCrops.map(crop => ({
        name: crop,
        season: getCropSeason(crop),
        duration: getCropDuration(crop),
        water: getWaterRequirement(crop),
        soil: getSoilRequirement(crop),
        description: getCropDescription(crop)
      }))
    };
  };

  useEffect(() => {
    if (selectedDistrict) {
      const newRecommendations = generateRecommendations(selectedDistrict);
      setRecommendations(newRecommendations);
    }
  }, [selectedDistrict]);

  const getCropSeason = (crop) => {
    const seasons = {
      'Rice': 'Kharif/Rabi',
      'Wheat': 'Rabi',
      'Cotton': 'Kharif',
      'Maize': 'Kharif',
      'Pulses': 'Rabi',
      'Groundnut': 'Kharif',
      'Vegetables': 'All Year',
      'Millets': 'Kharif',
      'Oilseeds': 'Rabi',
      'Sugarcane': 'All Year',
      'Green gram': 'Rabi',
      'Jute': 'Kharif',
      'Turmeric': 'Kharif',
      'Ginger': 'Kharif',
    };
    return seasons[crop] || 'Varies';
  };

  const getCropDuration = (crop) => {
    const durations = {
      'Rice': '120-150 days',
      'Wheat': '120-150 days',
      'Cotton': '150-180 days',
      'Maize': '90-120 days',
      'Pulses': '90-120 days',
      'Groundnut': '120-140 days',
      'Vegetables': '60-90 days',
      'Millets': '90-120 days',
      'Oilseeds': '100-130 days',
      'Sugarcane': '300-360 days',
      'Green gram': '60-70 days',
      'Jute': '120-150 days',
      'Turmeric': '240-300 days',
      'Ginger': '240-300 days',
    };
    return durations[crop] || 'Varies';
  };

  const getWaterRequirement = (crop) => {
    const requirements = {
      'Rice': 'High',
      'Wheat': 'Moderate',
      'Cotton': 'Moderate',
      'Maize': 'Moderate',
      'Pulses': 'Low',
      'Groundnut': 'Moderate',
      'Vegetables': 'Moderate',
      'Millets': 'Low',
      'Oilseeds': 'Moderate',
      'Sugarcane': 'High',
      'Green gram': 'Low',
      'Jute': 'High',
      'Turmeric': 'Moderate',
      'Ginger': 'Moderate',
    };
    return requirements[crop] || 'Varies';
  };

  const getSoilRequirement = (crop) => {
    const requirements = {
      'Rice': 'Clay loam',
      'Wheat': 'Loam to clay loam',
      'Cotton': 'Black soil, alluvial',
      'Maize': 'Well-drained loam',
      'Pulses': 'Well-drained loam',
      'Groundnut': 'Sandy loam',
      'Vegetables': 'Rich loamy soil',
      'Millets': 'Sandy to loamy',
      'Oilseeds': 'Well-drained loam',
      'Sugarcane': 'Deep rich loam',
      'Green gram': 'Well-drained loam',
      'Jute': 'Alluvial soil',
      'Turmeric': 'Well-drained loam',
      'Ginger': 'Sandy loam',
    };
    return requirements[crop] || 'Varies';
  };

  const getCropDescription = (crop) => {
    const descriptions = {
      'Rice': 'Staple food crop requiring good water management',
      'Wheat': 'Important cereal crop for food security',
      'Cotton': 'Major commercial fiber crop',
      'Maize': 'Versatile crop for food and feed',
      'Pulses': 'Protein-rich crops that improve soil fertility',
      'Groundnut': 'Important oilseed and food crop',
      'Vegetables': 'Short-duration crops with good market value',
      'Millets': 'Drought-resistant nutritious grains',
      'Oilseeds': 'Important for edible oil production',
      'Sugarcane': 'Long-duration commercial crop',
      'Green gram': 'Short-duration pulse crop',
      'Jute': 'Important fiber crop',
      'Turmeric': 'High-value spice crop',
      'Ginger': 'Important spice and medicinal crop',
    };
    return descriptions[crop] || 'No specific description available';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="local-florist" size={40} color="#4CAF50" />
        <Text style={styles.title}>Crop Recommendations</Text>
      </View>

      <View style={styles.selectionContainer}>
        <Text style={styles.label}>Select District</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDistrictModal(true)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedDistrict || 'Choose a district'}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDistrictModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDistrictModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select District</Text>
              <TouchableOpacity
                onPress={() => setShowDistrictModal(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={districts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.districtItem}
                  onPress={() => {
                    setSelectedDistrict(item);
                    setShowDistrictModal(false);
                  }}
                >
                  <Text style={styles.districtItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </Modal>

      {recommendations && (
        <View style={styles.recommendationsContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>District Information</Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <Text style={styles.infoText}>Region: {recommendations.soilInfo.region}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="terrain" size={20} color="#666" />
              <Text style={styles.infoText}>Soil Types: {recommendations.soilInfo.soilTypes.join(', ')}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Recommended Crops</Text>
          {recommendations.crops.map((crop, index) => (
            <View key={index} style={styles.cropCard}>
              <View style={styles.cropHeader}>
                <Text style={styles.cropName}>{crop.name}</Text>
              </View>
              <View style={styles.cropDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="event" size={20} color="#666" />
                  <Text style={styles.detailText}>Season: {crop.season}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="schedule" size={20} color="#666" />
                  <Text style={styles.detailText}>Duration: {crop.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="water-drop" size={20} color="#666" />
                  <Text style={styles.detailText}>Water Requirement: {crop.water}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="terrain" size={20} color="#666" />
                  <Text style={styles.detailText}>Soil Type: {crop.soil}</Text>
                </View>
                <Text style={styles.description}>{crop.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  selectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  districtItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  districtItemText: {
    fontSize: 16,
    color: '#333',
  },
  recommendationsContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cropCard: {
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
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cropDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
}); 

export default CropRecommendationsScreen; 