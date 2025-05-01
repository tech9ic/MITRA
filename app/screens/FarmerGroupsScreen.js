import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FarmerGroupsScreen = () => {
  const groups = [
    {
      name: 'Odisha Farmers Group (ଓଡ଼ିଶା କୃଷକ ଗୋଷ୍ଠୀ)',
      description: 'General discussion for Odisha farmers',
      members: '500+',
      language: 'Odia',
    },
    {
      name: 'Organic Farming Odisha (ଜୈବିକ କୃଷି)',
      description: 'Organic farming practices and techniques',
      members: '300+',
      language: 'Odia',
    },
    {
      name: 'Odisha Horticulture (ଓଡ଼ିଶା ଉଦ୍ୟାନ)',
      description: 'Fruit and vegetable cultivation tips',
      members: '400+',
      language: 'Odia',
    },
    {
      name: 'Odisha Govt Farmers (ସରକାରୀ କୃଷକ)',
      description: 'Government schemes and updates',
      members: '1000+',
      language: 'Odia',
    },
    {
      name: 'Odisha Rice Farmers (ଓଡ଼ିଶା ଚାଉଳ କୃଷକ)',
      description: 'Rice cultivation and market information',
      members: '600+',
      language: 'Odia',
    },
    {
      name: 'Odisha Farmers Market (କୃଷକ ବଜାର)',
      description: 'Market prices and trading information',
      members: '800+',
      language: 'Odia',
    },
    {
      name: 'Odisha Agriculture Experts',
      description: 'Expert advice and guidance',
      members: '200+',
      language: 'English',
    },
    {
      name: 'Odisha Govt Agriculture Updates',
      description: 'Official government updates and notifications',
      members: '1500+',
      language: 'English',
    },
  ];

  const handleJoinGroup = (groupName) => {
    // This would typically open WhatsApp with the group invite link
    // For now, we'll just show an alert
    alert(`Joining group: ${groupName}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="groups" size={40} color="#4CAF50" />
        <Text style={styles.title}>Farmer Groups</Text>
      </View>

      {groups.map((group, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="group" size={24} color="#4CAF50" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <View style={styles.groupInfo}>
                <Text style={styles.members}>{group.members} members</Text>
                <Text style={styles.language}>{group.language}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinGroup(group.name)}
          >
            <MaterialIcons name="group-add" size={24} color="white" />
            <Text style={styles.joinButtonText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  groupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  members: {
    fontSize: 12,
    color: '#4CAF50',
  },
  language: {
    fontSize: 12,
    color: '#666',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default FarmerGroupsScreen; 