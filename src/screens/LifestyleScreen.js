import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const LifestyleScreen = ({ navigation, route }) => {
  const [smokingStatus, setSmokingStatus] = useState('Never');
  const [alcoholFrequency, setAlcoholFrequency] = useState('Monthly Or-Less');
  const [physicalActivity, setPhysicalActivity] = useState('Moderate');
  const [dietQuality, setDietQuality] = useState('Good');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepError, setSleepError] = useState('');
  const [infoModal, setInfoModal] = useState({ visible: false, title: '', content: '' });

  const { basicInfo } = route.params || {};

  const showInfo = (title, content) => {
    setInfoModal({ visible: true, title, content });
  };

  const hideInfo = () => {
    setInfoModal({ visible: false, title: '', content: '' });
  };

  const validateSleepHours = (value) => {
    const hours = parseFloat(value);
    if (value === '') {
      setSleepError('');
      return;
    }
    if (isNaN(hours) || hours < 1 || hours > 24) {
      setSleepError('Please input a valid value from 1-24');
    } else {
      setSleepError('');
    }
  };

  const handleSleepHoursChange = (value) => {
    setSleepHours(value);
    validateSleepHours(value);
  };

  const handleContinue = () => {
    const lifestyleData = {
      smokingStatus,
      alcoholFrequency,
      physicalActivity,
      dietQuality,
      sleepHours
    };
    navigation.navigate('Demographics', {
      basicInfo,
      lifestyle: lifestyleData
    });
  };

  const SmokingButtons = () => (
    <View style={styles.buttonGroup}>
      {['Never', 'Former', 'Light', 'Heavy'].map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.optionButton,
            smokingStatus === status && styles.optionButtonSelected
          ]}
          onPress={() => setSmokingStatus(status)}
        >
          <Text style={[
            styles.optionButtonText,
            smokingStatus === status && styles.optionButtonTextSelected
          ]}>
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
         source={require('../../assets/cemetery-night.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="home" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Lifestyle</Text>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Smoking status</Text>
                  <TouchableOpacity onPress={() => showInfo('Smoking Status', 'Never: Have never smoked regularly\nFormer: Previously smoked but quit\nLight: Currently smoke less than 1 pack per day\nHeavy: Currently smoke 1+ packs per day')}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <SmokingButtons />
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Alcohol frequency</Text>
                  <TouchableOpacity onPress={() => showInfo('Alcohol Frequency', 'Never: Do not consume alcohol\nMonthly Or-Less: Drink alcohol once a month or less\nWeekly: Drink alcohol 1-6 times per week\nDaily: Drink alcohol every day')}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={alcoholFrequency}
                    onValueChange={(itemValue) => setAlcoholFrequency(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Monthly Or-Less" value="Monthly Or-Less" />
                    <Picker.Item label="Weekly" value="Weekly" />
                    <Picker.Item label="Daily" value="Daily" />
                    <Picker.Item label="Never" value="Never" />
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Physical Activity</Text>
                  <TouchableOpacity onPress={() => showInfo('Physical Activity', 'Low: Less than 30 minutes of moderate activity per week\nModerate: 30-150 minutes of moderate activity per week\nHigh: More than 150 minutes of moderate activity per week')}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={physicalActivity}
                    onValueChange={(itemValue) => setPhysicalActivity(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Moderate" value="Moderate" />
                    <Picker.Item label="High" value="High" />
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Diet Quality</Text>
                  <TouchableOpacity onPress={() => showInfo('Diet Quality', 'Poor: High processed foods, low fruits/vegetables\nFair: Some variety, moderate processed foods\nGood: Balanced diet with regular fruits/vegetables\nExcellent: Mediterranean-style diet, minimal processed foods')}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={dietQuality}
                    onValueChange={(itemValue) => setDietQuality(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Poor" value="Poor" />
                    <Picker.Item label="Fair" value="Fair" />
                    <Picker.Item label="Good" value="Good" />
                    <Picker.Item label="Excellent" value="Excellent" />
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Sleep Hours (per night)</Text>
                  <TouchableOpacity onPress={() => showInfo('Sleep Hours', 'Average hours of sleep per night:\n4-6 hours: Poor sleep\n6-7 hours: Fair sleep\n7-9 hours: Good sleep\n9+ hours: May indicate health issues')}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={[styles.textInput, sleepError ? styles.textInputError : null]}
                  value={sleepHours}
                  onChangeText={handleSleepHoursChange}
                  keyboardType="numeric"
                  placeholder="Enter hours (1-24)"
                />
                {sleepError ? (
                  <Text style={styles.errorText}>{sleepError}</Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>

      <Modal
        visible={infoModal.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideInfo}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{infoModal.title}</Text>
              <TouchableOpacity onPress={hideInfo} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>{infoModal.content}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  homeButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    minWidth: '22%',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#87CEEB',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  optionButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  textInputError: {
    borderColor: '#FF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LifestyleScreen;