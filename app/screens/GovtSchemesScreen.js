import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const GovtSchemesScreen = () => {
  const odishaSchemes = [
    {
      title: 'KALIA Scheme',
      description: 'Financial, livelihood, cultivation support, and insurance assistance to small/marginal farmers and landless agricultural laborers.',
      icon: 'account-balance',
      color: '#4CAF50',
    },
    {
      title: 'BALARAM',
      description: 'Crop loans to landless farmers/sharecroppers through Joint Liability Groups (JLGs).',
      icon: 'monetization-on',
      color: '#2196F3',
    },
    {
      title: 'MKUY',
      description: 'Subsidies for setting up commercial agri-enterprises.',
      icon: 'business',
      color: '#FF9800',
    },
    {
      title: 'Farm Mechanisation',
      description: 'Subsidies for purchasing agricultural implements and equipment.',
      icon: 'agriculture',
      color: '#9C27B0',
    },
    {
      title: 'Ama Krushi',
      description: 'Free, customized agricultural advice via phone.',
      icon: 'phone-in-talk',
      color: '#E91E63',
    },
  ];

  const centralSchemes = [
    {
      title: 'PM-KISAN',
      description: 'Income support of ₹6,000 per year to eligible landholding farmer families.',
      icon: 'account-balance-wallet',
      color: '#4CAF50',
    },
    {
      title: 'PMFBY',
      description: 'Affordable crop insurance scheme covering risks from pre-sowing to post-harvest.',
      icon: 'security',
      color: '#2196F3',
    },
    {
      title: 'PM-KMY',
      description: 'Voluntary pension scheme for Small and Marginal Farmers.',
      icon: 'account-circle',
      color: '#FF9800',
    },
    {
      title: 'PMKSY',
      description: 'Ensures access to irrigation for farmers.',
      icon: 'water',
      color: '#9C27B0',
    },
    {
      title: 'KCC Scheme',
      description: 'Affordable short-term credit with interest subvention.',
      icon: 'credit-card',
      color: '#E91E63',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-balance" size={40} color="#4CAF50" />
        <Text style={styles.title}>Government Schemes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Odisha Government Schemes</Text>
        {odishaSchemes.map((scheme, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: `${scheme.color}20` }]}>
              <MaterialIcons name={scheme.icon} size={24} color={scheme.color} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{scheme.title}</Text>
              <Text style={styles.cardDescription}>{scheme.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Central Government Schemes</Text>
        {centralSchemes.map((scheme, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: `${scheme.color}20` }]}>
              <MaterialIcons name={scheme.icon} size={24} color={scheme.color} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{scheme.title}</Text>
              <Text style={styles.cardDescription}>{scheme.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.noteContainer}>
        <MaterialIcons name="info" size={24} color="#FF9800" />
        <Text style={styles.noteText}>
          Note: Eligibility, benefits, and application processes can change. Always check official government websites or local agricultural offices for the latest details.
        </Text>
      </View>
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
  section: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default GovtSchemesScreen; 