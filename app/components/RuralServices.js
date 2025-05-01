import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * RuralServices Component
 * Displays a list of rural services available to farmers.
 * Includes services like soil testing, equipment rental, and expert consultation.
 */
export default function RuralServices() {
  const router = useRouter();

  /**
   * Handle service button press
   * @param {string} service - The service to access
   */
  const handleServicePress = (service) => {
    switch (service) {
      case 'soil':
        router.push('/screens/SoilAnalysisScreen');
        break;
      case 'helpline':
        router.push('/screens/KissanHelplineScreen');
        break;
      case 'groups':
        router.push('/screens/FarmerGroupsScreen');
        break;
      case 'schemes':
        router.push('/screens/GovtSchemesScreen');
        break;
      case 'training':
        router.push('/screens/TrainingScreen');
        break;
      case 'crops':
        router.push('/crop-recommendations');
        break;
      default:
        break;
    }
  };

  // Define available services
  const services = [
    {
      id: 'helpline',
      title: 'Kissan Helpline',
      description: '24/7 support for farmers',
      icon: 'phone-in-talk',
      iconType: 'MaterialCommunityIcons',
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 'soil',
      title: 'Soil Analysis',
      description: 'Get detailed soil analysis report',
      icon: 'test-tube',
      iconType: 'MaterialCommunityIcons',
      color: '#4CAF50',
      gradient: ['#4CAF50', '#81C784'],
    },
    {
      id: 'crops',
      title: 'Crop Recommendations',
      description: 'Get crop suggestions based on location',
      icon: 'sprout',
      iconType: 'MaterialCommunityIcons',
      color: '#FF5722',
      gradient: ['#FF5722', '#FF8A65'],
    },
    {
      id: 'groups',
      title: 'Farmer Groups',
      description: 'Connect with local farmer groups',
      icon: 'account-group',
      iconType: 'MaterialCommunityIcons',
      color: '#FF9800',
      gradient: ['#FF9800', '#FFB74D'],
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      description: 'Access all government schemes',
      icon: 'file-document-multiple',
      iconType: 'MaterialCommunityIcons',
      color: '#9C27B0',
      gradient: ['#9C27B0', '#BA68C8'],
    },
    {
      id: 'training',
      title: 'Training',
      description: 'Access farming training programs',
      icon: 'school',
      iconType: 'Ionicons',
      color: '#2196F3',
      gradient: ['#2196F3', '#64B5F6'],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rural Services</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceCard, { backgroundColor: service.color }]}
            onPress={() => handleServicePress(service.id)}
          >
            <View style={styles.iconContainer}>
              {service.iconType === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={service.icon} size={32} color="#fff" />
              ) : (
                <Ionicons name={service.icon} size={32} color="#fff" />
              )}
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles for the RuralServices component
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  scrollContent: {
    paddingHorizontal: 5,
  },
  serviceCard: {
    width: 160,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
}); 