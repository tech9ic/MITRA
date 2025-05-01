import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DistrictsSoilType from '../app/crop-planner/DistrictsSoilType';
import DistrictCropSuitability from '../app/crop-planner/DistrictCropSuitabilty';

export default function CropRecommendationsScreen() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  const districts = Object.keys(DistrictsSoilType);

  useEffect(() => {
    if (selectedDistrict) {
      generateRecommendations(selectedDistrict);
    }
  }, [selectedDistrict]);

  const generateRecommendations = (district) => {
    const districtData = DistrictsSoilType[district];
    const suitableCrops = DistrictCropSuitability[district] || [];

    const recommendations = {
      factors: [
        {
          title: 'Soil Type',
          description: districtData.soilTypes.join(', '),
          icon: 'terrain',
        },
        {
          title: 'Region',
          description: districtData.region,
          icon: 'location-on',
        },
        {
          title: 'Market Demand',
          description: 'Based on local market trends',
          icon: 'trending-up',
        },
        {
          title: 'Water Availability',
          description: 'Varies by season',
          icon: 'water-drop',
        },
      ],
      bestCrops: suitableCrops.map(crop => ({
        name: crop,
        season: getCropSeason(crop),
        duration: getCropDuration(crop),
        suitability: 'High',
        reasons: [
          'Suitable soil type',
          'Good market demand',
          'Favorable weather conditions',
        ],
      })),
      tips: [
        'Consider crop rotation for better soil health',
        'Monitor weather forecasts for optimal planting',
        'Follow recommended farming practices',
        'Use quality seeds for better yield',
      ],
    };

    setRecommendations(recommendations);
  };

  const getCropSeason = (crop) => {
    const kharifCrops = ['Rice', 'Cotton', 'Maize', 'Groundnut'];
    const rabiCrops = ['Wheat', 'Pulses', 'Oilseeds'];
    return kharifCrops.includes(crop) ? 'Kharif' : 'Rabi';
  };

  const getCropDuration = (crop) => {
    const durations = {
      'Rice': '120-150 days',
      'Wheat': '120-150 days',
      'Cotton': '150-180 days',
      'Maize': '90-120 days',
      'Pulses': '90-120 days',
      'Oilseeds': '100-130 days',
      'Groundnut': '120-140 days',
    };
    return durations[crop] || '120-150 days';
  };

  const renderDistrictItem = ({ item }) => (
    <TouchableOpacity
      style={styles.districtItem}
      onPress={() => {
        setSelectedDistrict(item);
        setShowDistrictModal(false);
      }}
    >
      <Text style={styles.districtItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="local-florist" size={40} color="#4CAF50" />
          <Text style={styles.title}>Crop Recommendations</Text>
        </View>

        <View style={styles.districtSelector}>
          <Text style={styles.sectionTitle}>Select District</Text>
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
                renderItem={renderDistrictItem}
                keyExtractor={item => item}
                style={styles.districtList}
              />
            </View>
          </View>
        </Modal>

        {recommendations && (
          <>
            <View style={styles.factorsContainer}>
              <Text style={styles.sectionTitle}>Key Factors</Text>
              <View style={styles.factorsGrid}>
                {recommendations.factors.map((factor, index) => (
                  <View key={index} style={styles.factorCard}>
                    <MaterialIcons name={factor.icon} size={24} color="#4CAF50" />
                    <Text style={styles.factorTitle}>{factor.title}</Text>
                    <Text style={styles.factorDesc}>{factor.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.recommendationsContainer}>
              <Text style={styles.sectionTitle}>Recommended Crops</Text>
              {recommendations.bestCrops.map((crop, index) => (
                <View key={index} style={styles.cropCard}>
                  <View style={styles.cropHeader}>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <View style={[styles.suitabilityBadge, { backgroundColor: '#E8F5E9' }]}>
                      <Text style={[styles.suitabilityText, { color: '#4CAF50' }]}>
                        High Suitability
                      </Text>
                    </View>
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
                  </View>
                  <View style={styles.reasonsContainer}>
                    <Text style={styles.reasonsTitle}>Why this crop?</Text>
                    {crop.reasons.map((reason, idx) => (
                      <View key={idx} style={styles.reasonItem}>
                        <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.reasonText}>{reason}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tipsContainer}>
              <Text style={styles.sectionTitle}>Important Tips</Text>
              {recommendations.tips.map((tip, index) => (
                <View key={index} style={styles.tipCard}>
                  <MaterialIcons name="lightbulb" size={24} color="#FFA000" />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </>
        )}
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
  districtSelector: {
    marginBottom: 24,
  },
  dropdownButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  districtList: {
    maxHeight: '80%',
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
  factorsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  factorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  factorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  factorTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  factorDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recommendationsContainer: {
    marginBottom: 24,
  },
  cropCard: {
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
  suitabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  suitabilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cropDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  reasonsContainer: {
    marginTop: 12,
  },
  reasonsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reasonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
}); 