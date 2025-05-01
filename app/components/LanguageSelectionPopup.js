import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const languages = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { id: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export default function LanguageSelectionPopup({ isVisible, onLanguageSelect }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleConfirm = () => {
    onLanguageSelect(selectedLanguage);
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.id && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageSelect(item.id)}
    >
      <Text style={[
        styles.languageName,
        selectedLanguage === item.id && styles.selectedLanguageName
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.nativeName,
        selectedLanguage === item.id && styles.selectedNativeName
      ]}>
        {item.nativeName}
      </Text>
      {selectedLanguage === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
    >
      <Animated.View 
        style={[
          styles.modalContainer,
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.popupContainer}>
          <Text style={styles.title}>Select Your Language</Text>
          <Text style={styles.subtitle}>अपनी भाषा चुनें / ଆପଣଙ୍କର ଭାଷା ଚୟନ କରନ୍ତୁ</Text>
          
          <FlatList
            data={languages}
            renderItem={renderLanguageItem}
            keyExtractor={item => item.id}
            style={styles.languageList}
          />
          
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageList: {
    width: '100%',
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedLanguageItem: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  selectedLanguageName: {
    color: '#4CAF50',
  },
  nativeName: {
    fontSize: 16,
    color: '#666',
  },
  selectedNativeName: {
    color: '#4CAF50',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 