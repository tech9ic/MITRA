import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './(auth)/login';
import AppNavigator from './navigation/AppNavigator';
import LanguageSelectionPopup from './components/LanguageSelectionPopup';
import { initDatabase } from './utils/database';
import { AuthProvider, useAuth } from './context/AuthContext';

// Ignore specific warnings
LogBox.ignoreLogs([
  'SQLite.openDatabase is not a function',
  'Route "./App.js" is missing the required default export',
  'Route "./screens/LoginScreen.js" is missing the required default export',
  'Route "./styles/CalendarStyles.js" is missing the required default export',
  'Route "./utils/database.js" is missing the required default export',
]);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { isLoggedIn, user, loading: authLoading, checkLoginStatus } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        await checkLoginStatus();
        setDbInitialized(true);
      } catch (error) {
        console.error('Error during initialization:', error);
        setDbInitialized(true);
      }
    };

    initialize();
  }, []);

  const handleSplashFinish = () => {
    setIsLoading(false);
    setShowLanguageSelection(true);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!dbInitialized || authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {!isLoggedIn ? (
          <LoginScreen language={selectedLanguage} />
        ) : (
          <AppNavigator />
        )}
        <LanguageSelectionPopup 
          isVisible={showLanguageSelection}
          onLanguageSelect={handleLanguageSelect}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 