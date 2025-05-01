import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Animated, 
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

// Language translations
const translations = {
  English: {
    profile: 'Profile',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    language: 'Language',
    terms: 'Terms and Conditions',
    logout: 'Logout',
    selectLanguage: 'Select Language',
    welcome: 'Welcome to Mitra',
    termsContent: `Welcome to Mitra, your farming companion. By using this app, you agree to the following terms:
    1. The weather information provided is for general guidance only.
    2. Farming tips and recommendations are based on general agricultural practices.
    3. Market prices are collected from various sources and may vary.
    4. Soil analysis recommendations should be verified with local experts.
    5. We respect your privacy and handle your data according to our policy.
    6. The app is provided "as is" and we are not liable for farming decisions.
    7. You are responsible for maintaining account security.
    8. We may update these terms from time to time.`
  },
  Hindi: {
    profile: 'प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    saveChanges: 'परिवर्तन सहेजें',
    language: 'भाषा',
    terms: 'नियम और शर्तें',
    logout: 'लॉग आउट',
    selectLanguage: 'भाषा चुनें',
    welcome: 'मित्र में आपका स्वागत है',
    termsContent: `मित्र में आपका स्वागत है, आपका कृषि साथी। इस ऐप का उपयोग करके, आप निम्नलिखित नियमों से सहमत होते हैं:
    1. प्रदान की गई मौसम जानकारी केवल सामान्य मार्गदर्शन के लिए है।
    2. कृषि सुझाव सामान्य कृषि प्रथाओं पर आधारित हैं।
    3. बाजार मूल्य विभिन्न स्रोतों से एकत्र किए जाते हैं और भिन्न हो सकते हैं।
    4. मिट्टी विश्लेषण सिफारिशों की स्थानीय विशेषज्ञों से पुष्टि करनी चाहिए।
    5. हम आपकी गोपनीयता का सम्मान करते हैं।
    6. ऐप "जैसा है" प्रदान किया जाता है।
    7. आप खाता सुरक्षा बनाए रखने के लिए जिम्मेदार हैं।
    8. हम समय-समय पर इन नियमों को अपडेट कर सकते हैं।`
  },
  Odia: {
    profile: 'ପ୍ରୋଫାଇଲ୍',
    editProfile: 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ କରନ୍ତୁ',
    saveChanges: 'ପରିବର୍ତ୍ତନ ସେଭ୍ କରନ୍ତୁ',
    language: 'ଭାଷା',
    terms: 'ନିୟମ ଏବଂ ଶର୍ତ୍ତଗୁଡିକ',
    logout: 'ଲଗ୍ ଆଉଟ୍',
    selectLanguage: 'ଭାଷା ଚୟନ କରନ୍ତୁ',
    welcome: 'ମିତ୍ରରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ',
    termsContent: `ମିତ୍ରରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ, ଆପଣଙ୍କର କୃଷି ସାଥୀ। ଏହି ଆପ୍ ବ୍ୟବହାର କରି, ଆପଣ ନିମ୍ନଲିଖିତ ନିୟମଗୁଡିକ ସହ ସହମତ ହୁଅନ୍ତି:
    1. ପ୍ରଦାନ କରାଯାଇଥିବା ପାଣିପାଗ ସୂଚନା କେବଳ ସାଧାରଣ ମାର୍ଗଦର୍ଶନ ପାଇଁ।
    2. କୃଷି ସୁପାରିଶଗୁଡିକ ସାଧାରଣ କୃଷି ପ୍ରଥା ଉପରେ ଆଧାରିତ।
    3. ବଜାର ମୂଲ୍ୟ ବିଭିନ୍ନ ଉତ୍ସରୁ ସଂଗ୍ରହ କରାଯାଏ।
    4. ମୃତ୍ତିକା ବିଶ୍ଳେଷଣ ସୁପାରିଶଗୁଡିକ ସ୍ଥାନୀୟ ବିଶେଷଜ୍ଞଙ୍କଦ୍ୱାରା ଯାଞ୍ଚ କରାଯିବା ଉଚିତ୍।
    5. ଆମେ ଆପଣଙ୍କର ଗୋପନୀୟତାକୁ ସମ୍ମାନ କରୁ।
    6. ଆପ୍ "ଯେପରି ଅଛି" ପ୍ରଦାନ କରାଯାଏ।
    7. ଆପଣ ଖାତା ସୁରକ୍ଷା ବଜାୟ ରଖିବା ପାଇଁ ଦାୟୀ।
    8. ଆମେ ସମୟ ସମୟରେ ଏହି ନିୟମଗୁଡିକୁ ଅପଡେଟ୍ କରିପାରିବା।`
  }
};

/**
 * ProfileSidebar Component
 * Displays user profile information and settings in a sliding sidebar.
 * Includes user details, navigation options, and logout functionality.
 */
export default function ProfileSidebar({ isVisible, onClose, userData, onLogout }) {
  const { language, changeLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(userData?.profileImage || null);
  const [name, setName] = useState(userData?.name || '');
  const [currentCity, setCurrentCity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get city name from coordinates
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=a3b7c1d888660fdd6ec307c9865feeff`
      );
      const data = await response.json();
      if (data && data[0]) {
        // Extract just the city name without "Municipal Corporation" or similar suffixes
        const cityName = data[0].name.split(' ')[0];
        setCurrentCity(cityName);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Here you would typically save the updated profile to your backend
    setIsEditing(false);
  };

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Odia', code: 'or' }
  ];

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.languageOption}
              onPress={() => {
                changeLanguage(lang.name);
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageText}>{lang.name}</Text>
              {language === lang.name && (
                <Ionicons name="checkmark" size={24} color="#4CAF50" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowLanguageModal(false)}
          >
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderProfileContent = () => (
    <View style={styles.content}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={isEditing ? pickImage : null}>
        <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
          <Ionicons name="person-circle" size={80} color="#4CAF50" />
            )}
        </View>
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        ) : (
          <Text style={styles.userName}>{name || 'Farmer'}</Text>
        )}
        <Text style={styles.userPhone}>{userData?.phoneNumber || 'Not available'}</Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={24} color="#666" />
          <Text style={styles.infoText}>{currentCity || 'Fetching location...'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={24} color="#666" />
          <Text style={styles.infoText}>Member since {new Date().getFullYear()}</Text>
        </View>
      </View>
      <View style={styles.editButtons}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={20} color="#4CAF50" />
            <Text style={styles.editButtonText}>{t('editProfile')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderLanguageContent = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>{t('selectLanguage')}</Text>
      <TouchableOpacity 
        style={styles.languageOption}
        onPress={() => changeLanguage('English')}
      >
        <Text style={styles.languageText}>English</Text>
        {language === 'English' && (
        <Ionicons name="checkmark" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.languageOption}
        onPress={() => changeLanguage('Hindi')}
      >
        <Text style={styles.languageText}>हिंदी</Text>
        {language === 'Hindi' && (
          <Ionicons name="checkmark" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.languageOption}
        onPress={() => changeLanguage('Odia')}
      >
        <Text style={styles.languageText}>ଓଡ଼ିଆ</Text>
        {language === 'Odia' && (
          <Ionicons name="checkmark" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    </View>
  );

  const renderTermsContent = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>{t('terms')}</Text>
      <Text style={styles.termsText}>{t('termsContent')}</Text>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'language':
        return renderLanguageContent();
      case 'terms':
        return renderTermsContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.sidebar,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{t('profile')}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
              onPress={() => setActiveTab('profile')}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={activeTab === 'profile' ? '#4CAF50' : '#666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'profile' && styles.activeTabText,
                ]}
              >
                {t('profile')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'language' && styles.activeTab]}
              onPress={() => setActiveTab('language')}
            >
              <Ionicons
                name="language-outline"
                size={24}
                color={activeTab === 'language' ? '#4CAF50' : '#666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'language' && styles.activeTabText,
                ]}
              >
                {t('language')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'terms' && styles.activeTab]}
              onPress={() => setActiveTab('terms')}
            >
              <Ionicons
                name="document-text-outline"
                size={24}
                color={activeTab === 'terms' ? '#4CAF50' : '#666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'terms' && styles.activeTabText,
                ]}
              >
                {t('terms')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
            >
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                {activeTab === 'profile' && renderProfileContent()}
                {activeTab === 'language' && renderLanguageContent()}
                {activeTab === 'terms' && renderTermsContent()}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#FF5252" />
              <Text style={styles.logoutText}>{t('logout')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {renderLanguageModal()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 300,
    height: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    zIndex: 1000,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    width: '80%',
  },
  editButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#4CAF50',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 