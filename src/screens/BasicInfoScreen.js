import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const BasicInfoScreen = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('Male');
  const [selectedUnit, setSelectedUnit] = useState('Metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasCardiovascularDisease, setHasCardiovascularDisease] = useState(false);
  const [infoModal, setInfoModal] = useState({ visible: false, title: '', content: '' });

  const calculateBMI = () => {
    if (!height || !weight) {
      setBmi(null);
      setBmiCategory('');
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmi(null);
      setBmiCategory('');
      return;
    }

    let bmiValue;
    if (selectedUnit === 'Metric') {
      // BMI = weight(kg) / height(m)²
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      // BMI = (weight(lbs) / height(inches)²) * 703
      bmiValue = (w / (h * h)) * 703;
    }

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmiValue < 25) {
      setBmiCategory('Normal weight');
    } else if (bmiValue < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, selectedUnit]);

  const showInfo = (title, content) => {
    setInfoModal({ visible: true, title, content });
  };

  const hideInfo = () => {
    setInfoModal({ visible: false, title: '', content: '' });
  };

  const handleContinue = () => {
    const formData = {
      age,
      sex: selectedSex,
      height,
      weight,
      bmi,
      hasDiabetes,
      hasHypertension,
      hasCardiovascularDisease,
      unit: selectedUnit
    };
    navigation.navigate('Lifestyle', { basicInfo: formData });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
         source={require('../../assets/cemetery-night.jpg')}style={styles.backgroundImage}
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
              <Text style={styles.cardTitle}>Basic Info</Text>

              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.textInput}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="Enter your age"
              />

              <Text style={styles.label}>Sex</Text>
              <View style={styles.sexSelector}>
                <TouchableOpacity
                  style={[
                    styles.sexButton,
                    selectedSex === 'Male' && styles.sexButtonSelected
                  ]}
                  onPress={() => setSelectedSex('Male')}
                >
                  <Text style={[
                    styles.sexButtonText,
                    selectedSex === 'Male' && styles.sexButtonTextSelected
                  ]}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sexButton,
                    selectedSex === 'Female' && styles.sexButtonSelected
                  ]}
                  onPress={() => setSelectedSex('Female')}
                >
                  <Text style={[
                    styles.sexButtonText,
                    selectedSex === 'Female' && styles.sexButtonTextSelected
                  ]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Measurements</Text>

              <View style={styles.unitSelector}>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    selectedUnit === 'Metric' && styles.unitButtonSelected
                  ]}
                  onPress={() => setSelectedUnit('Metric')}
                >
                  <Text style={[
                    styles.unitButtonText,
                    selectedUnit === 'Metric' && styles.unitButtonTextSelected
                  ]}>
                    Metric
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    selectedUnit === 'Imperial' && styles.unitButtonSelected
                  ]}
                  onPress={() => setSelectedUnit('Imperial')}
                >
                  <Text style={[
                    styles.unitButtonText,
                    selectedUnit === 'Imperial' && styles.unitButtonTextSelected
                  ]}>
                    Imperial
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.measurementRow}>
                <View style={styles.measurementField}>
                  <Text style={styles.measurementLabel}>
                    Height ({selectedUnit === 'Metric' ? 'cm' : 'inches'})
                  </Text>
                  <TextInput
                    style={styles.measurementInput}
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>

                <View style={styles.measurementField}>
                  <Text style={styles.measurementLabel}>
                    Weight ({selectedUnit === 'Metric' ? 'kg' : 'lbs'})
                  </Text>
                  <TextInput
                    style={styles.measurementInput}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
              </View>

              {bmi && (
                <View style={styles.bmiContainer}>
                  <Text style={styles.bmiLabel}>BMI: {bmi}</Text>
                  <Text style={[styles.bmiCategory, {
                    color: bmiCategory === 'Normal weight' ? '#4CAF50' :
                           bmiCategory === 'Underweight' ? '#FF9800' :
                           bmiCategory === 'Overweight' ? '#FF5722' : '#D32F2F'
                  }]}>
                    {bmiCategory}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Medical Conditions</Text>

              <View style={styles.conditionRow}>
                <Text style={styles.conditionLabel}>Diabetes</Text>
                <TouchableOpacity
                  style={styles.conditionToggle}
                  onPress={() => setHasDiabetes(!hasDiabetes)}
                >
                  <View style={[
                    styles.toggleSwitch,
                    hasDiabetes && styles.toggleSwitchActive
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      hasDiabetes && styles.toggleKnobActive
                    ]} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.conditionRow}>
                <Text style={styles.conditionLabel}>Hypertension (High Blood Pressure)</Text>
                <TouchableOpacity
                  style={styles.conditionToggle}
                  onPress={() => setHasHypertension(!hasHypertension)}
                >
                  <View style={[
                    styles.toggleSwitch,
                    hasHypertension && styles.toggleSwitchActive
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      hasHypertension && styles.toggleKnobActive
                    ]} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.conditionRow}>
                <Text style={styles.conditionLabel}>Cardiovascular Disease</Text>
                <TouchableOpacity
                  style={styles.conditionToggle}
                  onPress={() => setHasCardiovascularDisease(!hasCardiovascularDisease)}
                >
                  <View style={[
                    styles.toggleSwitch,
                    hasCardiovascularDisease && styles.toggleSwitchActive
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      hasCardiovascularDisease && styles.toggleKnobActive
                    ]} />
                  </View>
                </TouchableOpacity>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  sexSelector: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    marginBottom: 20,
    overflow: 'hidden',
  },
  sexButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  sexButtonSelected: {
    backgroundColor: '#87CEEB',
  },
  sexButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  sexButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  unitSelector: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    marginBottom: 20,
    overflow: 'hidden',
  },
  unitButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  unitButtonSelected: {
    backgroundColor: '#87CEEB',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#666',
  },
  unitButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  measurementField: {
    flex: 1,
    marginHorizontal: 5,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  measurementInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  diabetesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diabetesToggle: {
    padding: 5,
  },
  toggleSwitch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleSwitchActive: {
    backgroundColor: '#87CEEB',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
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
  bmiContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  bmiLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  bmiCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  conditionLabel: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginRight: 10,
  },
  conditionToggle: {
    padding: 5,
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
});

export default BasicInfoScreen;