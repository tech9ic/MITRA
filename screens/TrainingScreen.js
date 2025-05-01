import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingScreen() {
  const trainingPrograms = [
    {
      id: 1,
      title: 'Organic Farming Workshop',
      date: '15 April 2024',
      duration: '2 days',
      location: 'Agricultural Training Center',
      description: 'Learn organic farming techniques and sustainable practices',
      icon: 'leaf',
      color: '#4CAF50',
    },
    {
      id: 2,
      title: 'Modern Irrigation Methods',
      date: '20 April 2024',
      duration: '1 day',
      location: 'Water Resource Center',
      description: 'Training on efficient water management and irrigation systems',
      icon: 'water',
      color: '#2196F3',
    },
    {
      id: 3,
      title: 'Crop Protection',
      date: '25 April 2024',
      duration: '2 days',
      location: 'Crop Research Center',
      description: 'Learn about pest management and disease control',
      icon: 'bug',
      color: '#FF9800',
    },
    {
      id: 4,
      title: 'Post-Harvest Management',
      date: '30 April 2024',
      duration: '1 day',
      location: 'Storage Facility',
      description: 'Training on proper storage and handling of agricultural produce',
      icon: 'archive',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Programs</Text>
        <Text style={styles.subtitle}>Enhance your farming skills</Text>
      </View>

      <View style={styles.programsContainer}>
        {trainingPrograms.map((program) => (
          <TouchableOpacity key={program.id} style={styles.programCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${program.color}20` }]}>
              <Ionicons name={program.icon} size={24} color={program.color} />
            </View>
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={styles.programDetails}>
                <Text style={styles.programDate}>{program.date}</Text>
                <Text style={styles.programDuration}>{program.duration}</Text>
              </View>
              <Text style={styles.programLocation}>{program.location}</Text>
              <Text style={styles.programDescription}>{program.description}</Text>
            </View>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Training Benefits</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • Learn modern farming techniques{'\n'}
            • Get hands-on practical experience{'\n'}
            • Network with other farmers{'\n'}
            • Access to expert guidance{'\n'}
            • Certificate upon completion
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
  programsContainer: {
    padding: 15,
  },
  programCard: {
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  programInfo: {
    marginBottom: 15,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  programDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  programDate: {
    fontSize: 14,
    color: '#666',
  },
  programDuration: {
    fontSize: 14,
    color: '#4CAF50',
  },
  programLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
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