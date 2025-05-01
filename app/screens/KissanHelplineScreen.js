import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const KissanHelplineScreen = () => {
  const helplines = [
    {
      name: 'Kisan Call Center',
      number: '1800-180-1551',
      description: '24/7 support for farmers in multiple languages',
    },
    {
      name: 'PM-KISAN Helpline',
      number: '155261',
      description: 'For queries related to PM-KISAN scheme',
    },
    {
      name: 'Soil Health Card',
      number: '1800-180-1551',
      description: 'Information about soil health and fertility',
    },
    {
      name: 'eNAM Helpline',
      number: '1800-270-0224',
      description: 'National Agriculture Market platform support',
    },
    {
      name: 'Fertilizer Helpline',
      number: '1800-180-1551',
      description: 'Information about fertilizers and availability',
    },
    {
      name: 'Crop Insurance',
      number: '1800-180-1551',
      description: 'Support for crop insurance schemes',
    },
    {
      name: 'Odisha Agriculture Department',
      number: '0674-2391838',
      description: 'State agriculture department support',
    },
    {
      name: 'Odisha Horticulture Department',
      number: '0674-2391839',
      description: 'State horticulture department support',
    },
    {
      name: 'Kisan Suvidha',
      number: '1800-180-1551',
      description: 'General farming information and support',
    },
    {
      name: 'Pusa Krishi',
      number: '1800-180-1551',
      description: 'Agricultural research and development support',
    },
    {
      name: 'IFFCO Kisan',
      number: '1800-180-1551',
      description: 'Fertilizer and agricultural input support',
    },
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number.replace(/-/g, '')}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="support-agent" size={40} color="#4CAF50" />
        <Text style={styles.title}>Kissan Helpline</Text>
      </View>

      {helplines.map((helpline, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="phone" size={24} color="#4CAF50" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.helplineName}>{helpline.name}</Text>
              <Text style={styles.helplineNumber}>{helpline.number}</Text>
              <Text style={styles.helplineDescription}>{helpline.description}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => handleCall(helpline.number)}
          >
            <MaterialIcons name="call" size={24} color="white" />
            <Text style={styles.callButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  helplineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  helplineNumber: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  helplineDescription: {
    fontSize: 12,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default KissanHelplineScreen;

// add a button to call the helpline number
// and add all of the below information according to kissan helpine page

// For Indian farmers seeking assistance, there are several helplines and resources available that provide support and information on agricultural practices, government schemes, and more. Here are some key helplines and resources:
// Kisan Call Center (KCC):
// Toll-Free Number: 1800-180-1551
// Available in multiple languages, this helpline provides information on agriculture, horticulture, animal husbandry, and fisheries.
// Agriculture Department Helpline:
// Each state in India has its own agriculture department helpline. Farmers can contact their respective state helpline for localized support and information.
// PM-KISAN Helpline:
// Toll-Free Number: 155261
// For queries related to the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme.
// Soil Health Card Helpline:
// Toll-Free Number: 1800-180-1551
// Provides information on soil health and fertility management.
// eNAM Helpline:
// Toll-Free Number: 1800-270-0224
// For assistance with the National Agriculture Market (eNAM) platform.
// Fertilizer Helpline:
// Toll-Free Number: 1800-180-1551
// For information on fertilizer availability and usage.
// Crop Insurance Helpline:
// Toll-Free Number: 1800-180-1551
// For queries related to crop insurance schemes.
// Krishi Vigyan Kendra (KVK):
// KVKs are agricultural extension centers that provide training and support to farmers. Each district typically has a KVK.
// Mobile Apps:
// There are several mobile apps available for farmers, such as Kisan Suvidha, Pusa Krishi, and IFFCO Kisan, which provide information on weather, market prices, and best practices.
// These resources are designed to help farmers with a wide range of agricultural issues and provide access to government schemes and support services.