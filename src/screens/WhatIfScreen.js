import React, { useState, useEffect } from 'react';
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
import { calculateWhatIfScenario, generateWhatIfSuggestions } from '../utils/mortalityCalculator';

const { width, height } = Dimensions.get('window');

const WhatIfScreen = ({ navigation, route }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [improvedRisk, setImprovedRisk] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('10yr');

  const { basicInfo, lifestyle, demographics, currentRisk } = route.params || {};

  const userData = { basicInfo, lifestyle, demographics };
  const suggestions = generateWhatIfSuggestions(userData);

  useEffect(() => {
    // Auto-select first suggestion and calculate
    if (suggestions.length > 0 && !selectedScenario) {
      handleScenarioSelect(suggestions[0]);
    }
  }, [suggestions]);

  const handleScenarioSelect = (suggestion) => {
    setSelectedScenario(suggestion);
    const newRisk = calculateWhatIfScenario(userData, suggestion.change);
    setImprovedRisk(newRisk);
  };

  const getRiskColor = (risk) => {
    if (risk < 2) return '#4CAF50';
    if (risk < 5) return '#8BC34A';
    if (risk < 10) return '#FF9800';
    if (risk < 20) return '#FF5722';
    return '#D32F2F';
  };

  const getCurrentRiskForPeriod = () => {
    return selectedPeriod === '5yr' ? currentRisk.fiveYear :
           selectedPeriod === '10yr' ? currentRisk.tenYear :
           currentRisk.fifteenYear;
  };

  const getImprovedRiskForPeriod = () => {
    if (!improvedRisk) return null;
    return selectedPeriod === '5yr' ? improvedRisk.fiveYear :
           selectedPeriod === '10yr' ? improvedRisk.tenYear :
           improvedRisk.fifteenYear;
  };

  const getPeriodText = () => {
    return selectedPeriod === '5yr' ? '5-year' :
           selectedPeriod === '10yr' ? '10-year' :
           '15-year';
  };

  const getRiskImprovement = () => {
    const originalRisk = getCurrentRiskForPeriod();
    const improvedRiskValue = getImprovedRiskForPeriod();
    if (!improvedRiskValue) return null;
    const improvement = originalRisk - improvedRiskValue;
    const improvementPercent = ((improvement / originalRisk) * 100).toFixed(0);
    return { improvement: improvement.toFixed(1), percent: improvementPercent };
  };

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
            <Text style={styles.headerTitle}>What If Analysis</Text>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="home" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>What If?</Text>

              <View style={styles.scenarioList}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.scenarioButton,
                      selectedScenario?.title === suggestion.title && styles.scenarioButtonSelected
                    ]}
                    onPress={() => handleScenarioSelect(suggestion)}
                  >
                    <Text style={[
                      styles.scenarioTitle,
                      selectedScenario?.title === suggestion.title && styles.scenarioTitleSelected
                    ]}>
                      {suggestion.title}
                    </Text>
                    <Text style={[
                      styles.scenarioDescription,
                      selectedScenario?.title === suggestion.title && styles.scenarioDescriptionSelected
                    ]}>
                      {suggestion.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {selectedScenario && improvedRisk && (
              <View style={styles.resultsCard}>
                <Text style={styles.resultsTitle}>
                  {selectedScenario.title}
                </Text>

                <Text style={styles.resultsSubtitle}>
                  Your {getPeriodText()} mortality risk would decrease to:
                </Text>

                <View style={styles.periodSelector}>
                  {['5yr', '10yr', '15yr'].map((period) => (
                    <TouchableOpacity
                      key={period}
                      style={[
                        styles.periodButton,
                        selectedPeriod === period && styles.periodButtonSelected
                      ]}
                      onPress={() => setSelectedPeriod(period)}
                    >
                      <Text style={[
                        styles.periodButtonText,
                        selectedPeriod === period && styles.periodButtonTextSelected
                      ]}>
                        {period === '5yr' ? '5 yr' : period === '10yr' ? '10 yr' : '15 yr'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.riskComparison}>
                  <View style={styles.riskColumn}>
                    <Text style={styles.riskLabel}>Current Risk</Text>
                    <Text style={[styles.riskValue, { color: getRiskColor(getCurrentRiskForPeriod()) }]}>
                      {getCurrentRiskForPeriod()}%
                    </Text>
                  </View>

                  <Ionicons name="arrow-forward" size={24} color="#87CEEB" style={styles.arrowIcon} />

                  <View style={styles.riskColumn}>
                    <Text style={styles.riskLabel}>Improved Risk</Text>
                    <Text style={[styles.riskValue, { color: getRiskColor(getImprovedRiskForPeriod()) }]}>
                      {getImprovedRiskForPeriod()}%
                    </Text>
                  </View>
                </View>

                <View style={styles.improvementCard}>
                  <Text style={styles.improvementValue}>{getImprovedRiskForPeriod()}%</Text>
                  <View style={styles.improvementBadge}>
                    <Text style={styles.improvementBadgeText}>LOWER RISK</Text>
                  </View>
                  {getRiskImprovement() && (
                    <Text style={styles.improvementDetails}>
                      That's a {getRiskImprovement().improvement}% reduction ({getRiskImprovement().percent}% improvement)
                    </Text>
                  )}
                </View>

                <Text style={styles.estimateNote}>
                  Estimate based on current risk factors and revised input values.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.backArrowButton}
              onPress={() => navigation.goBack()}
            >
              <View style={styles.backArrowCircle}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.spacer} />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  scenarioList: {
    marginBottom: 10,
  },
  scenarioButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scenarioButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#87CEEB',
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  scenarioTitleSelected: {
    color: '#1565C0',
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  scenarioDescriptionSelected: {
    color: '#1976D2',
  },
  resultsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  riskComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    width: '100%',
  },
  riskColumn: {
    alignItems: 'center',
    flex: 1,
  },
  riskLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  riskValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginHorizontal: 20,
  },
  improvementCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  improvementValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  improvementBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  improvementBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  improvementDetails: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
  },
  estimateNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  periodSelector: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  periodButtonSelected: {
    backgroundColor: '#87CEEB',
  },
  periodButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  periodButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backArrowButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  backArrowCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 30,
  },
});

export default WhatIfScreen;