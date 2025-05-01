import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * SoilFeature Component
 * Provides soil analysis and crop recommendations based on soil parameters.
 * Allows users to input soil data and get personalized recommendations.
 */
export default function SoilFeature({ onCropSelect }) {
  // State for soil parameters
  const [soilData, setSoilData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
  });

  // State for selected crop
  const [selectedCrop, setSelectedCrop] = useState(null);

  const soilTypes = [
    { id: 1, name: 'Clay Soil', description: 'Heavy soil with good water retention', icon: 'water' },
    { id: 2, name: 'Sandy Soil', description: 'Light soil with good drainage', icon: 'sunny' },
    { id: 3, name: 'Loamy Soil', description: 'Balanced soil with good fertility', icon: 'leaf' },
    { id: 4, name: 'Silt Soil', description: 'Fine soil with good moisture retention', icon: 'rainy' },
  ];

  const cropSuggestions = {
    1: [
      { name: 'Rice', season: 'Kharif', tips: 'Requires good water management' },
      { name: 'Wheat', season: 'Rabi', tips: 'Suitable for winter cultivation' },
    ],
    2: [
      { name: 'Groundnut', season: 'Kharif', tips: 'Good for sandy soil' },
      { name: 'Carrot', season: 'Rabi', tips: 'Root development is better' },
    ],
    3: [
      { name: 'Maize', season: 'Kharif', tips: 'Ideal for loamy soil' },
      { name: 'Vegetables', season: 'All', tips: 'Good for mixed cropping' },
    ],
    4: [
      { name: 'Sugarcane', season: 'All', tips: 'Requires regular irrigation' },
      { name: 'Cotton', season: 'Kharif', tips: 'Good for commercial farming' },
    ],
  };

  /**
   * Handle soil parameter input change
   * @param {string} parameter - The soil parameter being changed
   * @param {string} value - The new value
   */
  const handleInputChange = (parameter, value) => {
    setSoilData(prev => ({
      ...prev,
      [parameter]: value,
    }));
  };

  /**
   * Analyze soil data and get recommendations
   * @returns {Object} - Object containing soil analysis and recommendations
   */
  const analyzeSoil = () => {
    // TODO: Implement actual soil analysis logic
    return {
      status: 'Good',
      recommendations: [
        'Soil pH is optimal for most crops',
        'Add nitrogen-rich fertilizers',
        'Consider crop rotation',
      ],
      suitableCrops: [
        { name: 'Rice', score: 85 },
        { name: 'Wheat', score: 75 },
        { name: 'Maize', score: 70 },
      ],
    };
  };

  /**
   * Handle crop selection
   * @param {Object} crop - The selected crop
   */
  const handleCropSelection = (crop) => {
    setSelectedCrop(crop);
    if (onCropSelect) {
      onCropSelect(crop);
    }
  };

  const analysis = analyzeSoil();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Soil Analysis</Text>
      
      <View style={styles.soilGrid}>
        {soilTypes.map((soil) => (
          <TouchableOpacity
            key={soil.id}
            style={[
              styles.soilCard,
              selectedCrop?.id === soil.id && styles.selectedCard,
            ]}
            onPress={() => handleCropSelection(soil)}
          >
            <Ionicons
              name={soil.icon}
              size={24}
              color={selectedCrop?.id === soil.id ? '#4CAF50' : '#666'}
            />
            <Text style={styles.soilName}>{soil.name}</Text>
            <Text style={styles.soilDescription}>{soil.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCrop && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Recommended Crops</Text>
          <View style={styles.cropGrid}>
            {cropSuggestions[selectedCrop.id].map((crop, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cropCard,
                  selectedCrop?.name === crop.name && styles.selectedCard,
                ]}
                onPress={() => handleCropSelection(crop)}
              >
                <Text style={styles.cropName}>{crop.name}</Text>
                <Text style={styles.cropSeason}>Season: {crop.season}</Text>
                {selectedCrop?.name === crop.name && (
                  <Text style={styles.cropTips}>{crop.tips}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Soil Parameters Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soil Parameters</Text>
        
        {/* pH Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>pH Level</Text>
          <TextInput
            style={styles.input}
            value={soilData.pH}
            onChangeText={(value) => handleInputChange('pH', value)}
            placeholder="Enter pH (0-14)"
            keyboardType="numeric"
          />
        </View>

        {/* Nitrogen Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nitrogen (N)</Text>
          <TextInput
            style={styles.input}
            value={soilData.nitrogen}
            onChangeText={(value) => handleInputChange('nitrogen', value)}
            placeholder="Enter N value (kg/ha)"
            keyboardType="numeric"
          />
        </View>

        {/* Phosphorus Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phosphorus (P)</Text>
          <TextInput
            style={styles.input}
            value={soilData.phosphorus}
            onChangeText={(value) => handleInputChange('phosphorus', value)}
            placeholder="Enter P value (kg/ha)"
            keyboardType="numeric"
          />
        </View>

        {/* Potassium Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Potassium (K)</Text>
          <TextInput
            style={styles.input}
            value={soilData.potassium}
            onChangeText={(value) => handleInputChange('potassium', value)}
            placeholder="Enter K value (kg/ha)"
            keyboardType="numeric"
          />
        </View>

        {/* Organic Matter Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Organic Matter (%)</Text>
          <TextInput
            style={styles.input}
            value={soilData.organicMatter}
            onChangeText={(value) => handleInputChange('organicMatter', value)}
            placeholder="Enter organic matter %"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Analysis Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soil Analysis</Text>
        <View style={styles.analysisCard}>
          <Text style={styles.analysisStatus}>Status: {analysis.status}</Text>
          <View style={styles.recommendations}>
            <Text style={styles.recommendationsTitle}>Recommendations:</Text>
            {analysis.recommendations.map((rec, index) => (
              <Text key={index} style={styles.recommendationText}>• {rec}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Suitable Crops */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suitable Crops</Text>
        <View style={styles.cropsContainer}>
          {analysis.suitableCrops.map((crop, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cropCard,
                selectedCrop?.name === crop.name && styles.selectedCropCard
              ]}
              onPress={() => handleCropSelection(crop)}
            >
              <Text style={styles.cropName}>{crop.name}</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{crop.score}%</Text>
                <View style={styles.scoreBar}>
                  <View 
                    style={[
                      styles.scoreFill,
                      { width: `${crop.score}%` }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  soilGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  soilCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  soilName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  soilDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cropCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cropSeason: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cropTips: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  analysisCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
  },
  analysisStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  recommendations: {
    marginTop: 10,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cropsContainer: {
    marginTop: 10,
  },
  selectedCropCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
}); 