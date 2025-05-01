import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyUser, verifyOtp } from '../utils/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const isLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      
      if (userData && isLoggedInStatus === 'true') {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        // Clear any stale data
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('isLoggedIn');
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      // On error, ensure we're logged out
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phoneNumber) => {
    try {
      // Check if user exists in database
      const user = await verifyUser(phoneNumber);
      if (user) {
        // In a real app, this would make an API call to send OTP
        // For demo, we'll just simulate a successful OTP send
        return true;
      } else {
        console.log('User not found:', phoneNumber);
        return false;
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const verifyOtpCode = async (phoneNumber, otp) => {
    try {
      // Verify OTP from database
      const user = await verifyOtp(phoneNumber, otp);
      if (user) {
        const userData = {
          id: user.id,
          phoneNumber: user.mobile_number,
          name: user.name,
          region: 'Default Region',
        };
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setUser(userData);
        setIsLoggedIn(true);
        return true;
      } else {
        console.log('Invalid OTP for user:', phoneNumber);
        return false;
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isLoggedIn');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    verifyOtp: verifyOtpCode,
    logout,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 