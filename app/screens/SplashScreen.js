import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen({ navigation }) {
  const { checkLoginStatus } = useAuth();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Check login status after a delay
    const timer = setTimeout(async () => {
      const isLoggedIn = await checkLoginStatus();
      navigation.replace(isLoggedIn ? 'Home' : 'Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Mitra</Text>
        <Text style={styles.appTagline}>Farmer's Friend</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 16,
  },
  appTagline: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
}); 