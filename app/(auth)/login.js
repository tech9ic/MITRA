import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { login, verifyOtp } = useAuth();
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      Alert.alert('Error', t('invalidPhone'));
      return;
    }

    setLoading(true);
    try {
      const success = await login(phoneNumber);
      if (success) {
        setShowOtpInput(true);
      } else {
        Alert.alert('Error', t('phoneNotFound'));
      }
    } catch (error) {
      Alert.alert('Error', t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', t('invalidOtp'));
      return;
    }

    setLoading(true);
    try {
      const success = await verifyOtp(phoneNumber, otp);
      if (success) {
        router.replace('/');
      } else {
        Alert.alert('Error', t('invalidOtp'));
      }
    } catch (error) {
      Alert.alert('Error', t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              changeLanguage('English');
              setShowLanguageModal(false);
            }}
          >
            <Text style={styles.languageText}>English</Text>
            {language === 'English' && (
              <Ionicons name="checkmark" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              changeLanguage('Hindi');
              setShowLanguageModal(false);
            }}
          >
            <Text style={styles.languageText}>हिंदी</Text>
            {language === 'Hindi' && (
              <Ionicons name="checkmark" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              changeLanguage('Odia');
              setShowLanguageModal(false);
            }}
          >
            <Text style={styles.languageText}>ଓଡ଼ିଆ</Text>
            {language === 'Odia' && (
              <Ionicons name="checkmark" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>MITRA</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </View>

      <View style={styles.formContainer}>
        {!showOtpInput ? (
          <>
            <Text style={styles.title}>{t('login')}</Text>
            <Text style={styles.subtitle}>{t('enterPhone')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder={t('phoneNumber')}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>
            
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSendOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? t('sending') : t('sendOtp')}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>{t('verifyOtp')}</Text>
            <Text style={styles.subtitle}>
              {t('otpSent')} +91 {phoneNumber}
            </Text>
            
            <TextInput
              style={styles.otpInput}
              placeholder={t('enterOtp')}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />
            
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? t('verifying') : t('verifyOtp')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => setShowOtpInput(false)}
            >
              <Text style={styles.resendText}>{t('changePhone')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowLanguageModal(true)}
      >
        <Ionicons name="language-outline" size={24} color="#4CAF50" />
        <Text style={styles.languageButtonText}>{language}</Text>
      </TouchableOpacity>

      {renderLanguageModal()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  prefix: {
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 20,
  },
  languageButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  languageText: {
    fontSize: 16,
  },
}); 