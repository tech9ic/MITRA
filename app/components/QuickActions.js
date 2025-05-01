import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * QuickActions Component
 * Displays a horizontal scrollable list of quick action buttons.
 * Each action is represented by an icon and label.
 */
const QuickActions = ({ selectedCrop }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 1,
      name: 'Weather Forecast',
      icon: 'partly-sunny-outline',
      color: '#2196F3',
      tips: {
        rice: 'Monitor rainfall for proper water management',
        wheat: 'Check temperature for optimal growth conditions',
        maize: 'Watch for extreme weather events',
        default: 'Stay updated with local weather conditions',
      },
    },
    {
      id: 2,
      name: 'Crop Health',
      icon: 'medkit-outline',
      color: '#4CAF50',
      tips: {
        rice: 'Regular monitoring for diseases and pests',
        wheat: 'Check for rust and other fungal infections',
        maize: 'Monitor for common pests and diseases',
        default: 'Regular crop health monitoring is essential',
      },
    },
    {
      id: 3,
      name: 'Market Prices',
      icon: 'trending-up-outline',
      color: '#FF9800',
      tips: {
        rice: 'Current market price: ₹1800-2000 per quintal',
        wheat: 'Current market price: ₹2100-2300 per quintal',
        maize: 'Current market price: ₹1700-1900 per quintal',
        default: 'Check daily market prices for better planning',
      },
    },
    {
      id: 4,
      name: 'Expert Advice',
      icon: 'people-outline',
      color: '#9C27B0',
      tips: {
        rice: 'Connect with rice cultivation experts',
        wheat: 'Get advice from wheat specialists',
        maize: 'Consult maize farming experts',
        default: 'Get expert advice for your crops',
      },
    },
  ];

  const handleFeaturePress = (feature) => {
    setSelectedFeature(feature);
  };

  const getTip = (feature) => {
    if (!selectedCrop) return feature.tips.default;
    return feature.tips[selectedCrop.toLowerCase()] || feature.tips.default;
  };

  /**
   * Handle action button press
   * @param {string} action - The action to perform
   */
  const handleActionPress = (action) => {
    // TODO: Implement action handling
    console.log(`Action pressed: ${action}`);
  };

  // Define quick actions based on selected crop
  const getQuickActions = () => {
    const commonActions = [
      {
        id: 'weather',
        label: 'Weather',
        icon: 'partly-sunny',
        action: 'checkWeather',
      },
      {
        id: 'soil',
        label: 'Soil',
        icon: 'leaf',
        action: 'checkSoil',
      },
      {
        id: 'market',
        label: 'Market',
        icon: 'trending-up',
        action: 'checkMarket',
      },
    ];

    const cropSpecificActions = selectedCrop ? [
      {
        id: 'irrigation',
        label: 'Irrigation',
        icon: 'water',
        action: 'scheduleIrrigation',
      },
      {
        id: 'pesticide',
        label: 'Pesticide',
        icon: 'bug',
        action: 'schedulePesticide',
      },
      {
        id: 'harvest',
        label: 'Harvest',
        icon: 'cut',
        action: 'scheduleHarvest',
      },
    ] : [];

    return [...commonActions, ...cropSpecificActions];
  };

  const actions = getQuickActions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.actionCard}
            onPress={() => handleFeaturePress(feature)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
              <Ionicons name={feature.icon} size={24} color={feature.color} />
            </View>
            <Text style={styles.actionTitle}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedFeature}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedFeature(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedFeature?.name}</Text>
              <TouchableOpacity onPress={() => setSelectedFeature(null)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.tipText}>
                {selectedFeature?.tips[selectedCrop?.toLowerCase()] || selectedFeature?.tips.default}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  actionCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 15,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default QuickActions; 