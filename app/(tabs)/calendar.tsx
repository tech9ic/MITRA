import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';

export default function CalendarScreen() {
    const handleDateSelect = (date) => {
        console.log('Selected date:', date);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Calendar</Text>
            </View>
            <Calendar onDateSelect={handleDateSelect} />
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
}); 