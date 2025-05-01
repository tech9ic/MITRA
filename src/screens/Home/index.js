import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getWeatherData } from '../../database';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData();
      if (data) {
        setWeatherData({
          temperature: data.current_temperature,
          rain: data.current_rain
        });
      } else {
        setError('No weather data available');
      }
    } catch (err) {
      setError('Error loading weather data');
      console.error('Weather data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const renderWeatherCard = () => (
    <View style={styles.weatherCard}>
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherTitle}>{t('home.weather.title')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
          <Text style={styles.viewAllText}>{t('home.viewAll')}</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.weatherContent}>
          <ActivityIndicator size="small" color="#4CAF50" />
        </View>
      ) : error ? (
        <View style={styles.weatherContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadWeatherData}>
            <Text style={styles.retryText}>{t('home.retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : weatherData ? (
        <View style={styles.weatherContent}>
          <View style={styles.weatherMain}>
            <Text style={styles.temperature}>{weatherData.temperature}</Text>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Ionicons name="water-outline" size={20} color="#4CAF50" />
              <Text style={styles.weatherDetailText}>{weatherData.rain}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  return renderWeatherCard();
};

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  weatherContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDetailText: {
    marginLeft: 5,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default Home; 