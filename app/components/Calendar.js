import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function CustomCalendar({ onDayPress, markedDates = {} }) {
  const today = new Date().toISOString().split('T')[0];

  const renderCustomDay = ({ date, state, marking }) => {
    const isToday = date.dateString === today;
    const isDisabled = state === 'disabled';
    const isSelected = marking?.selected;
    const dots = marking?.dots || [];

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          marking?.customStyles?.container,
          isToday && styles.todayContainer,
          isDisabled && styles.disabledDay,
          isSelected && styles.selectedDay
        ]}
        onPress={() => !isDisabled && onDayPress(date)}
        disabled={isDisabled}
      >
        <View style={styles.dayContent}>
          <Text style={[
            styles.dateNumber,
            isToday && styles.todayText,
            isDisabled && styles.disabledText,
            isSelected && styles.selectedText
          ]}>
            {date.day}
          </Text>
          {dots.length > 0 && (
            <View style={styles.dotsContainer}>
              {dots.map((dot, index) => (
                <View
                  key={dot.key || index}
                  style={[styles.dot, { backgroundColor: dot.color }]}
                />
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="custom"
        dayComponent={renderCustomDay}
        hideExtraDays={true}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
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
          'stylesheet.calendar.main': {
            week: {
              marginTop: 0,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 12,
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 2,
  },
  dayContent: {
    alignItems: 'center',
    width: '100%',
  },
  dateNumber: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  todayContainer: {
    backgroundColor: '#E8F5E9',
  },
  todayText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledText: {
    color: '#d9d9d9',
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
}); 