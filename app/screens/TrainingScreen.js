import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingScreen() {
  const [selectedCategory, setSelectedCategory] = useState('beginner');

  const trainingCategories = [
    {
      id: 'beginner',
      title: 'Beginner Level',
      icon: 'school',
      color: '#4CAF50',
    },
    {
      id: 'intermediate',
      title: 'Intermediate Level',
      icon: 'book',
      color: '#2196F3',
    },
    {
      id: 'advanced',
      title: 'Advanced Level',
      icon: 'rocket',
      color: '#FF9800',
    },
  ];

  const trainingContent = {
    beginner: [
      {
        id: 1,
        title: 'Soil Preparation Basics',
        type: 'video',
        duration: '15 min',
        icon: 'videocam',
      },
      {
        id: 2,
        title: 'Seed Selection Guide',
        type: 'article',
        duration: '10 min',
        icon: 'document-text',
      },
      {
        id: 3,
        title: 'Basic Planting Techniques',
        type: 'video',
        duration: '20 min',
        icon: 'videocam',
      },
      {
        id: 4,
        title: 'Essential Nutrients',
        type: 'article',
        duration: '15 min',
        icon: 'document-text',
      },
    ],
    intermediate: [
      {
        id: 1,
        title: 'Crop Rotation Planning',
        type: 'article',
        duration: '20 min',
        icon: 'document-text',
      },
      {
        id: 2,
        title: 'Integrated Pest Management',
        type: 'video',
        duration: '25 min',
        icon: 'videocam',
      },
      {
        id: 3,
        title: 'Soil Health Improvement',
        type: 'article',
        duration: '15 min',
        icon: 'document-text',
      },
      {
        id: 4,
        title: 'Market Basics',
        type: 'video',
        duration: '20 min',
        icon: 'videocam',
      },
    ],
    advanced: [
      {
        id: 1,
        title: 'Precision Farming',
        type: 'video',
        duration: '30 min',
        icon: 'videocam',
      },
      {
        id: 2,
        title: 'Climate Adaptation',
        type: 'article',
        duration: '25 min',
        icon: 'document-text',
      },
      {
        id: 3,
        title: 'Financial Planning',
        type: 'article',
        duration: '20 min',
        icon: 'document-text',
      },
      {
        id: 4,
        title: 'Value Addition',
        type: 'video',
        duration: '25 min',
        icon: 'videocam',
      },
    ],
  };

  const cropSpecificTraining = [
    {
      id: 1,
      title: 'Rice Cultivation',
      icon: 'leaf',
      color: '#8BC34A',
    },
    {
      id: 2,
      title: 'Wheat Farming',
      icon: 'leaf',
      color: '#FFC107',
    },
    {
      id: 3,
      title: 'Vegetable Farming',
      icon: 'leaf',
      color: '#E91E63',
    },
  ];

  const farmingActivities = [
    {
      id: 1,
      title: 'Soil Health Management',
      icon: 'leaf',
      color: '#795548',
    },
    {
      id: 2,
      title: 'Water Management',
      icon: 'water',
      color: '#2196F3',
    },
    {
      id: 3,
      title: 'Pest & Disease Management',
      icon: 'bug',
      color: '#F44336',
    },
    {
      id: 4,
      title: 'Post-Harvest Handling',
      icon: 'archive',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Programs</Text>
        <Text style={styles.subtitle}>Enhance your farming knowledge</Text>
      </View>

      {/* Skill Level Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Your Skill Level</Text>
        <View style={styles.categoryContainer}>
          {trainingCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory,
                { backgroundColor: category.color },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons name={category.icon} size={24} color="white" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Training Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Training</Text>
        {trainingContent[selectedCategory].map((item) => (
          <TouchableOpacity key={item.id} style={styles.trainingItem}>
            <View style={styles.trainingIcon}>
              <Ionicons name={item.icon} size={24} color="#4CAF50" />
            </View>
            <View style={styles.trainingInfo}>
              <Text style={styles.trainingTitle}>{item.title}</Text>
              <Text style={styles.trainingDuration}>{item.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Crop-Specific Training */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crop-Specific Training</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cropSpecificTraining.map((crop) => (
            <TouchableOpacity key={crop.id} style={[styles.cropCard, { backgroundColor: crop.color }]}>
              <Ionicons name={crop.icon} size={30} color="white" />
              <Text style={styles.cropTitle}>{crop.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Farming Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farming Activities</Text>
        <View style={styles.activitiesGrid}>
          {farmingActivities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: activity.color }]}
            >
              <Ionicons name={activity.icon} size={30} color="white" />
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: 'white',
  },
  categoryTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  trainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  trainingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trainingInfo: {
    flex: 1,
  },
  trainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trainingDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cropCard: {
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
}); 