import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MeasurementsScreen = ({ navigation }) => {
  const [showBloodPressureInfo, setShowBloodPressureInfo] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Metric');

  const BloodPressureModal = () => (
    <Modal
      visible={showBloodPressureInfo}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowBloodPressureInfo(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Blood Pressure Ranges</Text>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.bpRange}>
              <Text style={styles.bpCategory}>• Normal:</Text>
              <Text style={styles.bpValue}>90-120 / 60-80 mmHg</Text>
            </View>

            <View style={styles.bpRange}>
              <Text style={styles.bpCategory}>• Low:</Text>
              <Text style={styles.bpValue}>Below 90/60 mmHg</Text>
            </View>

            <View style={styles.bpRange}>
              <Text style={styles.bpCategory}>• Elevated:</Text>
              <Text style={styles.bpValue}>120-129 / less than 80 mmHg</Text>
            </View>

            <View style={styles.bpRange}>
              <Text style={styles.bpCategory}>• High Stage 1:</Text>
              <Text style={styles.bpValue}>130-139 / 80-89 mmHg</Text>
            </View>

            <View style={styles.bpRange}>
              <Text style={styles.bpCategory}>• High Stage 2:</Text>
              <Text style={styles.bpValue}>140+ / 90+ mmHg</Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.gotItButton}
            onPress={() => setShowBloodPressureInfo(false)}
          >
            <Text style={styles.gotItText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }}
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
                <Text style={styles.measurementLabel}>
                  Height ({selectedUnit === 'Metric' ? 'cm' : 'ft/in'})
                </Text>
                <Text style={styles.measurementLabel}>
                  Weight ({selectedUnit === 'Metric' ? 'kg' : 'lbs'})
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setShowBloodPressureInfo(true)}
            >
              <View style={styles.card}>
                <View style={styles.bpHeader}>
                  <Text style={styles.cardTitle}>Blood Pressure Ranges</Text>
                  <Ionicons name="information-circle" size={24} color="#4682B4" />
                </View>
                <Text style={styles.bpSubtext}>Tap to view ranges</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Cardiovascular Disease</Text>
              <View style={styles.toggleContainer}>
                <View style={styles.toggle} />
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Lifestyle</Text>
              <Text style={styles.subsectionTitle}>Smoking status</Text>
              <View style={styles.infoIcon}>
                <Ionicons name="information-circle-outline" size={20} color="#666" />
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('BasicInfo')}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>

      <BloodPressureModal />
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
    marginBottom: 15,
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
  },
  measurementLabel: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
  },
  infoButton: {
    marginBottom: 0,
  },
  bpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  bpSubtext: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 5,
  },
  toggleContainer: {
    alignItems: 'flex-start',
  },
  toggle: {
    width: 50,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#E8E8E8',
  },
  infoIcon: {
    alignSelf: 'flex-end',
    marginTop: -25,
  },
  nextButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    backgroundColor: '#4682B4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalBody: {
    padding: 20,
    maxHeight: 300,
  },
  bpRange: {
    marginBottom: 15,
  },
  bpCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  bpValue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 15,
  },
  gotItButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  gotItText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MeasurementsScreen;