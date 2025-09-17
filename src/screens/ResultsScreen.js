import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { calculateMortalityRisk } from '../utils/mortalityCalculator';

const { width, height } = Dimensions.get('window');

const ResultsScreen = ({ navigation, route }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('10yr');
  const [animatedValue] = useState(new Animated.Value(0));

  const { basicInfo, lifestyle, demographics } = route.params || {};

  // Calculate risks
  const riskData = calculateMortalityRisk({
    basicInfo,
    lifestyle,
    demographics
  });

  const currentRisk = selectedPeriod === '5yr' ? riskData.fiveYear :
                    selectedPeriod === '10yr' ? riskData.tenYear :
                    riskData.fifteenYear;

  const currentRiskText = selectedPeriod === '5yr' ? '5-Year' :
                         selectedPeriod === '10yr' ? '10-Year' :
                         '15-Year';

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentRisk,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [currentRisk]);

  const CircularProgress = ({ percentage, size = 200 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <View style={styles.circularProgressContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FF4444"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: [circumference, 0],
              extrapolate: 'clamp',
            })}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressPercentage}>{currentRisk}%</Text>
          <Text style={styles.progressDescription}>
            probability of death within {selectedPeriod === '5yr' ? '5' : selectedPeriod === '10yr' ? '10' : '15'} years
          </Text>
          <View style={styles.riskLevelContainer}>
            <Text style={[
              styles.riskLevel,
              {
                color: riskData.riskLevel === 'VERY LOW' ? '#4CAF50' :
                       riskData.riskLevel === 'LOW' ? '#8BC34A' :
                       riskData.riskLevel === 'MODERATE' ? '#FF9800' :
                       riskData.riskLevel === 'HIGH' ? '#FF5722' : '#D32F2F'
              }
            ]}>
              {riskData.riskLevel}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const getConfidenceRange = (risk) => {
    const lower = Math.max(0.1, risk - 0.2);
    const upper = risk + 0.2;
    return `${lower.toFixed(1)}% – ${upper.toFixed(1)}%`;
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
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="home" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{currentRiskText} Mortality Risk</Text>

              <CircularProgress percentage={currentRisk} />

              <Text style={styles.confidenceText}>
                Confidence range: {getConfidenceRange(currentRisk)}
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
            </View>

            <TouchableOpacity
              style={styles.whatIfButton}
              onPress={() => navigation.navigate('WhatIf', {
                basicInfo,
                lifestyle,
                demographics,
                currentRisk: riskData
              })}
            >
              <Text style={styles.whatIfButtonText}>🔮 What If?</Text>
            </TouchableOpacity>

            <View style={styles.disclaimerCard}>
              <Text style={styles.disclaimerText}>
                These estimates are for educational purposes only and should not replace professional medical advice.
                Individual results may vary based on genetic factors, medical history, and other variables not captured in this assessment.
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
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  progressDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    maxWidth: 120,
  },
  riskLevelContainer: {
    backgroundColor: 'rgba(135, 206, 235, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confidenceText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
    width: '100%',
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
  whatIfButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 20,
    alignItems: 'center',
  },
  whatIfButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disclaimerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ResultsScreen;