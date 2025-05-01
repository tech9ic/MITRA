import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CropsScreen() {
    const crops = [
        { id: 1, name: 'Rice', icon: '🌾', description: 'Staple food crop' },
        { id: 2, name: 'Wheat', icon: '🌾', description: 'Cereal grain' },
        { id: 3, name: 'Maize', icon: '🌽', description: 'Corn crop' },
        { id: 4, name: 'Sugarcane', icon: '🎋', description: 'Sugar production' },
        { id: 5, name: 'Cotton', icon: '🧶', description: 'Fiber crop' },
        { id: 6, name: 'Tea', icon: '🍃', description: 'Beverage crop' },
        { id: 7, name: 'Coffee', icon: '☕', description: 'Beverage crop' },
        { id: 8, name: 'Spices', icon: '🌶️', description: 'Flavoring crops' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Crops</Text>
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.cropsGrid}>
                    {crops.map((crop) => (
                        <TouchableOpacity key={crop.id} style={styles.cropCard}>
                            <Text style={styles.cropIcon}>{crop.icon}</Text>
                            <Text style={styles.cropName}>{crop.name}</Text>
                            <Text style={styles.cropDescription}>{crop.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    cropsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cropCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    cropIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    cropName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    cropDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
}); 