import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MarketPriceScreen() {
  const marketData = {
    crops: [
      { name: 'Wheat', price: '₹2,500/quintal', trend: 'up', change: '+5%' },
      { name: 'Rice', price: '₹3,200/quintal', trend: 'down', change: '-2%' },
      { name: 'Cotton', price: '₹6,500/quintal', trend: 'up', change: '+8%' },
      { name: 'Sugarcane', price: '₹350/quintal', trend: 'stable', change: '0%' },
    ],
    marketNews: [
      'Wheat prices expected to rise due to increased demand',
      'New government policies affecting rice market',
      'Cotton exports showing positive growth',
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="attach-money" size={40} color="#4CAF50" />
          <Text style={styles.title}>Market Prices</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.sectionTitle}>Current Prices</Text>
          {marketData.crops.map((crop, index) => (
            <View key={index} style={styles.priceCard}>
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>{crop.name}</Text>
                <Text style={styles.cropPrice}>{crop.price}</Text>
              </View>
              <View style={[
                styles.trendIndicator,
                { backgroundColor: crop.trend === 'up' ? '#E8F5E9' : crop.trend === 'down' ? '#FFEBEE' : '#F5F5F5' }
              ]}>
                <MaterialIcons 
                  name={crop.trend === 'up' ? 'trending-up' : crop.trend === 'down' ? 'trending-down' : 'trending-flat'} 
                  size={24} 
                  color={crop.trend === 'up' ? '#4CAF50' : crop.trend === 'down' ? '#F44336' : '#757575'} 
                />
                <Text style={[
                  styles.trendText,
                  { color: crop.trend === 'up' ? '#4CAF50' : crop.trend === 'down' ? '#F44336' : '#757575' }
                ]}>
                  {crop.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.newsContainer}>
          <Text style={styles.sectionTitle}>Market News</Text>
          {marketData.marketNews.map((news, index) => (
            <View key={index} style={styles.newsCard}>
              <MaterialIcons name="newspaper" size={24} color="#4CAF50" />
              <Text style={styles.newsText}>{news}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Trading Tips</Text>
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={24} color="#FFA000" />
            <Text style={styles.tipText}>
              Consider selling wheat now as prices are at a peak
            </Text>
          </View>
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={24} color="#FFA000" />
            <Text style={styles.tipText}>
              Hold cotton for a few more days as prices are expected to rise
            </Text>
          </View>
        </View>
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
  priceContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  cropPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  trendText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  newsContainer: {
    marginBottom: 24,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  newsText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
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