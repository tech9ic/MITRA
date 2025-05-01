import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function KissanHelplineScreen() {
  const helplineNumbers = [
    {
      id: 1,
      title: 'National Helpline',
      number: '1800-180-1551',
      description: '24/7 support for all farming queries',
      icon: 'call',
      color: '#4CAF50',
    },
    {
      id: 2,
      title: 'Crop Protection',
      number: '1800-425-1556',
      description: 'Expert advice on crop diseases and pests',
      icon: 'bug',
      color: '#F44336',
    },
    {
      id: 3,
      title: 'Weather Advisory',
      number: '1800-180-1552',
      description: 'Weather updates and alerts',
      icon: 'partly-sunny',
      color: '#2196F3',
    },
    {
      id: 4,
      title: 'Market Information',
      number: '1800-180-1553',
      description: 'Market prices and trends',
      icon: 'trending-up',
      color: '#FF9800',
    },
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kissan Helpline</Text>
        <Text style={styles.subtitle}>24/7 Support for Farmers</Text>
      </View>

      <View style={styles.helplineGrid}>
        {helplineNumbers.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.helplineCard}
            onPress={() => handleCall(item.number)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.helplineTitle}>{item.title}</Text>
            <Text style={styles.helplineNumber}>{item.number}</Text>
            <Text style={styles.helplineDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Important Information</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • All helpline numbers are toll-free{'\n'}
            • Available in multiple languages{'\n'}
            • Expert advice from agricultural specialists{'\n'}
            • Emergency support for crop issues{'\n'}
            • Market price updates
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
  helplineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  helplineCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: '1%',
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
  helplineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  helplineNumber: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
  helplineDescription: {
    fontSize: 12,
    color: '#666',
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