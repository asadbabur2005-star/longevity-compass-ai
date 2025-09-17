import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const DemographicsScreen = ({ navigation, route }) => {
  const [maritalStatus, setMaritalStatus] = useState('Select');
  const [educationLevel, setEducationLevel] = useState('Select');
  const [incomeBand, setIncomeBand] = useState('Select');

  const { basicInfo, lifestyle } = route.params || {};

  const handleCalculateRisk = () => {
    const demographicsData = {
      maritalStatus,
      educationLevel,
      incomeBand
    };

    // Pass all collected data to results screen
    navigation.navigate('Results', {
      basicInfo,
      lifestyle,
      demographics: demographicsData
    });
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
              <Text style={styles.cardTitle}>Demographics (Optional)</Text>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Marital Status</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={maritalStatus}
                    onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select" value="Select" />
                    <Picker.Item label="Single" value="Single" />
                    <Picker.Item label="Married" value="Married" />
                    <Picker.Item label="Divorced" value="Divorced" />
                    <Picker.Item label="Widowed" value="Widowed" />
                    <Picker.Item label="Separated" value="Separated" />
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education Level</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={educationLevel}
                    onValueChange={(itemValue) => setEducationLevel(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select" value="Select" />
                    <Picker.Item label="Less than High School" value="LessThanHS" />
                    <Picker.Item label="High School" value="HighSchool" />
                    <Picker.Item label="Some College" value="SomeCollege" />
                    <Picker.Item label="Bachelor's Degree" value="Bachelor" />
                    <Picker.Item label="Graduate Degree" value="Graduate" />
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Income Band</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={incomeBand}
                    onValueChange={(itemValue) => setIncomeBand(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select" value="Select" />
                    <Picker.Item label="Under $25,000" value="Under25k" />
                    <Picker.Item label="$25,000 - $49,999" value="25k-49k" />
                    <Picker.Item label="$50,000 - $74,999" value="50k-74k" />
                    <Picker.Item label="$75,000 - $99,999" value="75k-99k" />
                    <Picker.Item label="$100,000 - $149,999" value="100k-149k" />
                    <Picker.Item label="$150,000+" value="150k+" />
                  </Picker>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleCalculateRisk}
            >
              <Text style={styles.calculateButtonText}>Calculate Risk Assessment</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
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
  sectionTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: '600',
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
  calculateButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 30,
    alignItems: 'center',
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DemographicsScreen;