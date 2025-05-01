import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

/**
 * Settings Component
 * Displays user settings and preferences.
 * Includes notification settings, language preferences, and account management.
 */
export default function Settings() {
  // Get user data and logout function from auth context
  const { user, logout } = useAuth();

  // State for various settings
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Handle logout
   * Calls the logout function from auth context
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        {/* User Info */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Phone Number</Text>
            <Text style={styles.settingValue}>{user?.phone || '+91 9876543210'}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Name</Text>
            <Text style={styles.settingValue}>{user?.name || 'Farmer'}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingDescription}>Receive alerts and updates</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        {/* Language Selection */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingDescription}>{language}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        {/* Help & Support */}
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#FF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles for the Settings component
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Section styles
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  // Setting item styles
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  // Logout button styles
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4444',
    marginLeft: 10,
  },
}); 