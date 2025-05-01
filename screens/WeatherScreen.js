import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { saveWeatherData, getWeatherData } from '../database';

const API_KEY = 'a3b7c1d888660fdd6ec307c9865feeff'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_DURATION = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      // Get location name using reverse geocoding
      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
      );
      const locationData = await locationResponse.json();
      const location = locationData[0];
      const locationName = `${location.name}, ${location.state || location.country}`;
      setLocationName(locationName);

      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      // Calculate sunrise and sunset times
      const sunrise = new Date(currentData.sys.sunrise * 1000);
      const sunset = new Date(currentData.sys.sunset * 1000);

      // Process forecast data to get daily forecasts
      const dailyForecasts = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        // Skip today's forecast
        if (date.getDate() === today.getDate()) return;
        
        if (!dailyForecasts[dateKey]) {
          dailyForecasts[dateKey] = {
            date: dateKey,
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 3.6),
            pop: Math.round(item.pop * 100),
            rain: item.rain ? item.rain['3h'] || 0 : 0,
          };
        }
      });

  const weatherData = {
        locationName,
        latitude,
        longitude,
    current: {
          temperature: `${Math.round(currentData.main.temp)}°C`,
          condition: currentData.weather[0].main,
          humidity: `${currentData.main.humidity}%`,
          windSpeed: `${Math.round(currentData.wind.speed * 3.6)} km/h`,
          feelsLike: `${Math.round(currentData.main.feels_like)}°C`,
          icon: currentData.weather[0].icon,
          sunrise: sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sunset: sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          pressure: currentData.main.pressure,
          visibility: currentData.visibility / 1000,
          rain: currentData.rain ? currentData.rain['1h'] || 0 : 0,
        },
        forecast: Object.values(dailyForecasts).slice(0, 5),
      };

      setWeatherData(weatherData);
      await saveWeatherData(weatherData);
      setIsOffline(false);
      setError(null);
    } catch (err) {
      console.error('Weather API Error:', err);
      // Try to load from database if API fails
      const cachedData = await getWeatherData();
      if (cachedData) {
        setWeatherData(cachedData);
        setLocationName(cachedData.locationName);
        setIsOffline(true);
        setError('Using cached data - No internet connection');
      } else {
        setError('Failed to fetch weather data');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      console.error('Location Error:', err);
      // Try to load from database if location fails
      const cachedData = await getWeatherData();
      if (cachedData) {
        setWeatherData(cachedData);
        setLocationName(cachedData.locationName);
        setIsOffline(true);
        setError('Using cached data - Location access denied');
      } else {
        setError('Failed to get location');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    if (location) {
      await fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } else {
      await getLocation();
    }
  };

  const getWorkRecommendation = (temp, humidity, windSpeed) => {
    if (temp > 35) return 'Extreme heat - Work in early morning or late evening';
    if (temp > 30) return 'High temperature - Take frequent breaks and stay hydrated';
    if (temp < 5) return 'Cold conditions - Protect sensitive crops and wear warm clothing';
    if (windSpeed > 30) return 'Strong winds - Secure equipment and avoid spraying';
    if (humidity > 80) return 'High humidity - Monitor for disease development';
    if (humidity < 30) return 'Low humidity - Consider irrigation if needed';
    return 'Good working conditions - Regular activities recommended';
  };

  const getSoilRecommendation = (temp, humidity) => {
    if (temp > 30 && humidity < 40) return 'Consider irrigation to prevent soil drying';
    if (temp < 10 && humidity > 80) return 'Avoid irrigation to prevent waterlogging';
    if (temp > 25 && humidity > 70) return 'Monitor for fungal growth';
    return 'Soil conditions are optimal for most crops';
  };

  const getWeatherAlert = (weatherData) => {
    const alerts = [];
    
    if (weatherData.current.temperature > 35) {
      alerts.push('High temperature warning: Consider early morning or late evening work');
    }
    if (weatherData.current.temperature < 5) {
      alerts.push('Low temperature warning: Protect sensitive crops');
    }
    if (weatherData.current.windSpeed > 30) {
      alerts.push('Strong winds: Secure equipment and structures');
    }
    if (weatherData.current.humidity > 80) {
      alerts.push('High humidity: Monitor for disease development');
    }
    
    return alerts.length > 0 ? alerts : ['Normal weather conditions. Regular activities recommended.'];
  };

  const toggleDayDetails = (date) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'wb-sunny';
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'rainy';
      case 'snow':
        return 'ac-unit';
      case 'thunderstorm':
        return 'flash-on';
      case 'drizzle':
        return 'grain';
      case 'mist':
      case 'fog':
        return 'foggy';
      default:
        return 'wb-sunny';
    }
  };

  const getWeatherGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return ['#87CEEB', '#1E90FF'];
      case 'clouds':
        return ['#B0C4DE', '#778899'];
      case 'rain':
        return ['#4682B4', '#1E3A8A'];
      case 'snow':
        return ['#E0FFFF', '#B0E0E6'];
      case 'thunderstorm':
        return ['#4B0082', '#000080'];
      case 'drizzle':
        return ['#6495ED', '#4169E1'];
      case 'mist':
      case 'fog':
        return ['#D3D3D3', '#A9A9A9'];
      default:
        return ['#87CEEB', '#1E90FF'];
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={40} color="#FF5722" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={getLocation}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isOffline && (
          <View style={styles.offlineBanner}>
            <MaterialIcons name="wifi-off" size={20} color="white" />
            <Text style={styles.offlineText}>Offline Mode - Using cached data</Text>
          </View>
        )}
        <View style={styles.header}>
          <MaterialIcons name="wb-sunny" size={40} color="#4CAF50" />
          <Text style={styles.title}>Weather Updates</Text>
        </View>

        <View style={styles.currentWeather}>
          <View style={styles.locationHeader}>
            <MaterialIcons name="location-on" size={20} color="#4CAF50" />
            <Text style={styles.locationText}>{locationName || 'Loading location...'}</Text>
          </View>
          <LinearGradient
            colors={getWeatherGradient(weatherData?.current?.condition)}
            style={styles.weatherCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.weatherMain}>
              <Text style={styles.temperature}>{weatherData?.current?.temperature}</Text>
              <MaterialIcons 
                name={getWeatherIcon(weatherData?.current?.condition)} 
                size={40} 
                color="white" 
              />
              <Text style={styles.feelsLike}>Feels like {weatherData?.current?.feelsLike}</Text>
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                <MaterialIcons name="water-drop" size={24} color="#4CAF50" />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{weatherData?.current?.humidity}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                <MaterialIcons name="air" size={24} color="#4CAF50" />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailValue}>{weatherData?.current?.windSpeed} km/h</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <MaterialIcons name="water" size={24} color="#4CAF50" />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Rain</Text>
                  <Text style={styles.detailValue}>
                    {weatherData?.current?.rain > 0 ? `${weatherData?.current?.rain} mm` : 'No rain'}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.moreDetailsButton}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text style={styles.moreDetailsText}>
                {showDetails ? 'Hide Details' : 'Show More Details'}
              </Text>
            </TouchableOpacity>
            {showDetails && (
              <View style={styles.additionalDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="work" size={24} color="#4CAF50" />
                  <Text style={styles.detailText}>
                    {getWorkRecommendation(
                      parseFloat(weatherData?.current?.temperature),
                      parseFloat(weatherData?.current?.humidity),
                      parseFloat(weatherData?.current?.windSpeed)
                    )}
                  </Text>
                </View>
                <View style={styles.sunTimes}>
                  <View style={styles.sunTimeItem}>
                    <MaterialIcons name="wb-sunny" size={24} color="#FFA000" />
                    <Text style={styles.sunTimeText}>Sunrise: {weatherData?.current?.sunrise}</Text>
                  </View>
                  <View style={styles.sunTimeItem}>
                    <MaterialIcons name="nightlight-round" size={24} color="#FFA000" />
                    <Text style={styles.sunTimeText}>Sunset: {weatherData?.current?.sunset}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="terrain" size={24} color="#4CAF50" />
                  <Text style={styles.detailText}>
                    {getSoilRecommendation(
                      parseFloat(weatherData?.current?.temperature),
                      parseFloat(weatherData?.current?.humidity)
                    )}
                  </Text>
            </View>
          </View>
            )}
          </LinearGradient>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          {weatherData.forecast.map((day, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.forecastItem}
              onPress={() => toggleDayDetails(day.date)}
            >
              <View style={styles.forecastHeader}>
                <Text style={styles.forecastDay}>{day.date}</Text>
                <Text style={styles.forecastTemp}>{day.temp}°C</Text>
                <MaterialIcons 
                  name={getWeatherIcon(day.condition)} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.forecastIcons}>
                  <View style={styles.forecastIconItem}>
                    <MaterialIcons name="water-drop" size={16} color="#4CAF50" />
                    <Text style={styles.forecastIconText}>{day.humidity}%</Text>
                  </View>
                  <View style={styles.forecastIconItem}>
                    <MaterialIcons name="air" size={16} color="#4CAF50" />
                    <Text style={styles.forecastIconText}>{day.windSpeed}</Text>
                  </View>
                  <View style={styles.forecastIconItem}>
                    <MaterialIcons name="water" size={16} color="#4CAF50" />
                    <Text style={styles.forecastIconText}>{day.pop}%</Text>
                  </View>
                </View>
              </View>
              {expandedDay === day.date && (
                <View style={styles.expandedDetails}>
                  <View style={styles.workRecommendation}>
                    <MaterialIcons name="work" size={20} color="#4CAF50" />
                    <Text style={styles.recommendationText}>
                      {getWorkRecommendation(
                        day.temp,
                        day.humidity,
                        day.windSpeed
                      )}
                    </Text>
                  </View>
            </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.alertContainer}>
          <Text style={styles.sectionTitle}>Weather Alerts</Text>
          {getWeatherAlert(weatherData).map((alert, index) => (
            <View key={index} style={styles.alertCard}>
            <MaterialIcons name="warning" size={24} color="#FFA000" />
              <Text style={styles.alertText}>{alert}</Text>
          </View>
          ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF5722',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
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
  currentWeather: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  weatherCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherMain: {
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  feelsLike: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  detailTextContainer: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  forecastContainer: {
    marginBottom: 24,
  },
  forecastItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: 100,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: 60,
    textAlign: 'center',
  },
  forecastIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  forecastIconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  forecastIconText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  workRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  alertContainer: {
    marginBottom: 24,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
  },
  alertText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  moreDetailsButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
  },
  moreDetailsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  additionalDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sunTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  sunTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  sunTimeText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
  },
  detailText: {
    color: 'white',
    marginLeft: 12,
    fontSize: 14,
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  offlineBanner: {
    backgroundColor: '#FF5722',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  offlineText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
  },
}); 