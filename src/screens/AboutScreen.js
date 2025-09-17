import React from 'react';
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

const { width, height } = Dimensions.get('window');

const AboutScreen = ({ navigation }) => {
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
            <Text style={styles.headerTitle}>About</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.logoSection}>
                <View style={styles.logoCircle}>
                  <Ionicons name="hourglass" size={40} color="#FF0000" />
                </View>
                <Text style={styles.appName}>Longevity Compass</Text>
                <Text style={styles.version}>Version 1.0.0</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎯 Our Mission</Text>
                <Text style={styles.sectionText}>
                  Longevity Compass empowers you to understand and improve your health journey.
                  By analyzing key lifestyle and health factors, we provide personalized insights
                  into your mortality risk and actionable steps for a healthier, longer life.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>⚕️ Medical Disclaimer</Text>
                <Text style={styles.disclaimerText}>
                  This app is for educational purposes only and should not replace professional
                  medical advice, diagnosis, or treatment. Always consult with qualified healthcare
                  providers regarding your health concerns. Individual results may vary based on
                  genetic factors, medical history, and other variables not captured in this assessment.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔬 Data Sources</Text>
                <Text style={styles.sectionText}>
                  Our risk calculations are based on peer-reviewed medical research, population
                  health studies, and established clinical guidelines. The algorithms incorporate
                  factors like the Framingham Risk Score and other validated mortality prediction models.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🛡️ Privacy</Text>
                <Text style={styles.sectionText}>
                  Your health data is processed locally on your device. We do not store, share,
                  or transmit your personal health information to external servers. Your privacy
                  and data security are our top priorities.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💡 How It Works</Text>
                <Text style={styles.sectionText}>
                  1. Input your basic health and lifestyle information{'\n'}
                  2. Our algorithm analyzes multiple risk factors{'\n'}
                  3. Receive personalized mortality risk assessments{'\n'}
                  4. Explore "what-if" scenarios to see improvement potential{'\n'}
                  5. Use insights to make informed health decisions
                </Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Take control of your health journey today.{'\n'}
                  Every small change can make a big difference.
                </Text>
                <View style={styles.heartContainer}>
                  <Ionicons name="heart" size={20} color="#FF0000" />
                  <Text style={styles.heartText}>Made with care for your wellbeing</Text>
                </View>
              </View>
            </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#FF4444',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  footerText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default AboutScreen;