import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { initDatabase } from './utils/database';

// This component will handle the authentication flow
function AuthGuard({ children }) {
  const { isLoggedIn, loading, checkLoginStatus } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [dbInitialized, setDbInitialized] = useState(false);

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

  useEffect(() => {
    if (!dbInitialized || loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to login if not logged in and not in auth group
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to home if logged in and in auth group
      router.replace('/');
    }
  }, [isLoggedIn, segments, dbInitialized, loading]);

  if (!dbInitialized || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
      <AuthGuard>
        <Slot />
      </AuthGuard>
      </LanguageProvider>
    </AuthProvider>
  );
} 