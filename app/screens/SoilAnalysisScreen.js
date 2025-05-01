import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import DistrictsSoilType from '../crop-planner/DistrictsSoilType';

const SoilAnalysisScreen = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [soilInfo, setSoilInfo] = useState(null);

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    if (district && DistrictsSoilType[district]) {
      setSoilInfo(DistrictsSoilType[district]);
    } else {
      setSoilInfo(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="grass" size={40} color="#4CAF50" />
        <Text style={styles.title}>Soil Analysis</Text>
      </View>

      <View style={styles.selectionContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>State</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue="Odisha"
              style={styles.pickerStyle}
              enabled={false}
            >
              <Picker.Item label="Odisha" value="Odisha" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>District</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedDistrict}
              style={styles.pickerStyle}
              onValueChange={handleDistrictChange}
            >
              <Picker.Item label="Select District" value="" />
              {Object.keys(DistrictsSoilType).map((district) => (
                <Picker.Item 
                  key={district} 
                  label={district} 
                  value={district} 
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {soilInfo && (
        <View style={styles.soilInfoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Region</Text>
            <Text style={styles.cardValue}>{soilInfo.region}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Soil Types</Text>
            <Text style={styles.cardValue}>{soilInfo.soilTypes.join(', ')}</Text>
          </View>
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
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerStyle: {
    height: 50,
  },
  soilInfoContainer: {
    padding: 16,
  },
  infoCard: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SoilAnalysisScreen; 