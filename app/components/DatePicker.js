import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function DatePicker({ onDateSelect, selectedDate }) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDateSelect}
        minDate={today} // Disable dates before today
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#4CAF50',
            customStyles: {
              container: {
                backgroundColor: '#4CAF50',
                borderRadius: 18,
              },
              text: {
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
          },
        }}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#333',
          selectedDayBackgroundColor: '#4CAF50',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#4CAF50',
          dayTextColor: '#333',
          textDisabledColor: '#d9d9d9',
          dotColor: '#4CAF50',
          selectedDotColor: '#ffffff',
          arrowColor: '#4CAF50',
          monthTextColor: '#333',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 