import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FarmerGroupsScreen() {
  const farmerGroups = [
    {
      id: 1,
      name: 'Organic Farmers Group',
      members: '150+',
      location: 'Village A',
      description: 'Focus on organic farming practices and sustainable agriculture',
      icon: 'leaf',
      color: '#4CAF50',
    },
    {
      id: 2,
      name: 'Dairy Farmers Association',
      members: '200+',
      location: 'Village B',
      description: 'Dairy farming and milk production cooperative',
      icon: 'nutrition',
      color: '#2196F3',
    },
    {
      id: 3,
      name: 'Vegetable Growers Club',
      members: '100+',
      location: 'Village C',
      description: 'Specialized in seasonal vegetable cultivation',
      icon: 'restaurant',
      color: '#FF9800',
    },
    {
      id: 4,
      name: 'Rice Farmers Collective',
      members: '300+',
      location: 'Village D',
      description: 'Rice cultivation and processing cooperative',
      icon: 'leaf',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Farmer Groups</Text>
        <Text style={styles.subtitle}>Connect with local farming communities</Text>
      </View>

      <View style={styles.groupsContainer}>
        {farmerGroups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${group.color}20` }]}>
              <Ionicons name={group.icon} size={24} color={group.color} />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.groupDetails}>
                <Text style={styles.groupLocation}>{group.location}</Text>
                <Text style={styles.groupMembers}>{group.members} members</Text>
              </View>
              <Text style={styles.groupDescription}>{group.description}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Group</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Benefits of Joining Groups</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • Share knowledge and experiences{'\n'}
            • Access to group discounts on inputs{'\n'}
            • Collective bargaining power{'\n'}
            • Learn new farming techniques{'\n'}
            • Get support during difficult times
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  groupsContainer: {
    padding: 15,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupInfo: {
    marginBottom: 15,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  groupDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  groupLocation: {
    fontSize: 14,
    color: '#666',
  },
  groupMembers: {
    fontSize: 14,
    color: '#4CAF50',
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
}); 