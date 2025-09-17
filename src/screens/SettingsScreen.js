import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const showDataClearConfirmation = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all stored health data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Data",
          style: "destructive",
          onPress: () => {
            Alert.alert("Data Cleared", "All health data has been removed from your device.");
          }
        }
      ]
    );
  };

  const SettingRow = ({ icon, title, subtitle, onPress, hasToggle, toggleValue, onToggleChange, dangerous = false }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={hasToggle}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, dangerous && styles.dangerousIcon]}>
          <Ionicons
            name={icon}
            size={20}
            color={dangerous ? "#FF4444" : "#87CEEB"}
          />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, dangerous && styles.dangerousText]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{ false: "#E8E8E8", true: "#87CEEB" }}
          thumbColor={toggleValue ? "#FFFFFF" : "#FFFFFF"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.sectionHeader}>App Preferences</Text>

              <SettingRow
                icon="notifications"
                title="Health Reminders"
                subtitle="Get reminders to update your health data"
                hasToggle={true}
                toggleValue={notificationsEnabled}
                onToggleChange={setNotificationsEnabled}
              />

              <SettingRow
                icon="moon"
                title="Dark Theme"
                subtitle="Use dark cemetery theme throughout the app"
                hasToggle={true}
                toggleValue={darkModeEnabled}
                onToggleChange={setDarkModeEnabled}
              />

              <SettingRow
                icon="shield-checkmark"
                title="Local Data Backup"
                subtitle="Backup health data to device storage"
                hasToggle={true}
                toggleValue={dataBackupEnabled}
                onToggleChange={setDataBackupEnabled}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionHeader}>Privacy & Data</Text>

              <SettingRow
                icon="analytics"
                title="Anonymous Analytics"
                subtitle="Help improve the app (no personal data shared)"
                hasToggle={true}
                toggleValue={analyticsEnabled}
                onToggleChange={setAnalyticsEnabled}
              />

              <SettingRow
                icon="document-text"
                title="Privacy Policy"
                subtitle="View our privacy policy"
                onPress={() => Alert.alert("Privacy Policy", "Your data is processed locally and never shared. Full privacy policy available at longevitycompass.app/privacy")}
              />

              <SettingRow
                icon="finger-print"
                title="Data Security"
                subtitle="Learn about how we protect your data"
                onPress={() => Alert.alert("Data Security", "All health calculations are performed locally on your device. No personal data is transmitted to external servers.")}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionHeader}>Support & Feedback</Text>

              <SettingRow
                icon="help-circle"
                title="Help & FAQ"
                subtitle="Get answers to common questions"
                onPress={() => Alert.alert("Help Center", "For support, visit longevitycompass.app/help or contact support@longevitycompass.app")}
              />

              <SettingRow
                icon="chatbubble"
                title="Send Feedback"
                subtitle="Share your thoughts and suggestions"
                onPress={() => Alert.alert("Feedback", "We'd love to hear from you! Send feedback to feedback@longevitycompass.app")}
              />

              <SettingRow
                icon="star"
                title="Rate This App"
                subtitle="Help others discover Longevity Compass"
                onPress={() => Alert.alert("Rate App", "Thank you for using Longevity Compass! Please rate us in the App Store.")}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionHeader}>Data Management</Text>

              <SettingRow
                icon="download"
                title="Export Health Data"
                subtitle="Download your data as a CSV file"
                onPress={() => Alert.alert("Export Data", "Health data exported successfully! Check your downloads folder.")}
              />

              <SettingRow
                icon="trash"
                title="Clear All Data"
                subtitle="Remove all stored health information"
                onPress={showDataClearConfirmation}
                dangerous={true}
              />
            </View>

            <View style={styles.versionCard}>
              <Text style={styles.versionText}>Longevity Compass v1.0.0</Text>
              <Text style={styles.buildText}>Build 2024.12.17</Text>
              <Text style={styles.copyrightText}>
                Made with ❤️ for your health journey
              </Text>
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
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(135, 206, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dangerousIcon: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  dangerousText: {
    color: '#FF4444',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  versionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  buildText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SettingsScreen;