import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const HelpScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    console.log('HelpScreen mounted');
    return () => {
      console.log('HelpScreen unmounted');
    };
  }, []);

  const toggleSection = (section) => {
    console.log('Toggling section:', section);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const faqs = [
    {
      question: "How do I check weather information?",
      answer: "You can check weather information by tapping on the Weather icon in the bottom navigation. The app will show current weather conditions and a 5-day forecast for your location."
    },
    {
      question: "How do I get crop recommendations?",
      answer: "Go to Rural Services and tap on 'Crop Recommendations'. The app will show suitable crops for your district. You can also select other districts to see their recommendations."
    },
    {
      question: "How do I access government schemes?",
      answer: "Tap on 'Government Schemes' in Rural Services to view all available schemes. You can filter schemes by category and check eligibility criteria."
    },
    {
      question: "How do I connect with other farmers?",
      answer: "Use the 'Farmer Groups' feature to find and join local farmer groups. You can share experiences and get advice from other farmers."
    },
    {
      question: "How do I get soil analysis?",
      answer: "Select your district in the Soil Analysis section to get detailed information about soil types and recommendations for your area."
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Guide & Help</Text>
      </View>

      <View style={styles.videoContainer}>
        <Text style={styles.sectionTitle}>How to Use the App</Text>
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle" size={50} color="#4CAF50" />
          <Text style={styles.videoText}>Watch Tutorial Video</Text>
        </View>
      </View>

      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => toggleSection(index)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons
                name={expandedSection === index ? "chevron-up" : "chevron-down"}
                size={24}
                color="#666"
              />
            </View>
            {expandedSection === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.sectionTitle}>Need More Help?</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="call" size={24} color="#fff" />
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  videoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  faqContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  contactContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HelpScreen; 