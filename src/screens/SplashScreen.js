import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [textAnim] = useState(new Animated.Value(0));
  const [currentLine1, setCurrentLine1] = useState('');
  const [currentLine2, setCurrentLine2] = useState('');
  const [fadeOutAnim] = useState(new Animated.Value(1));

  const line1Text = 'Longevity';
  const line2Text = 'Compass';

  useEffect(() => {
    // First, fade in the background image
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Start typewriter effect after image fades in
      setTimeout(() => {
        // Start text animation when typewriter begins
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Type first line
        let line1Index = 0;
        const typeFirstLine = setInterval(() => {
          if (line1Index < line1Text.length) {
            setCurrentLine1(line1Text.substring(0, line1Index + 1) + '|');
            line1Index++;
          } else {
            clearInterval(typeFirstLine);
            setCurrentLine1(line1Text); // Remove cursor

            // Wait a bit, then start second line
            setTimeout(() => {
              let line2Index = 0;
              const typeSecondLine = setInterval(() => {
                if (line2Index < line2Text.length) {
                  setCurrentLine2(line2Text.substring(0, line2Index + 1) + '|');
                  line2Index++;
                } else {
                  clearInterval(typeSecondLine);
                  setCurrentLine2(line2Text); // Remove cursor

                  // After both lines complete, wait 3 seconds then fade out
                  setTimeout(() => {
                    Animated.timing(fadeOutAnim, {
                      toValue: 0,
                      duration: 1000,
                      useNativeDriver: true,
                    }).start();
                  }, 3000);
                }
              }, 120);
            }, 500);
          }
        }, 120);
      }, 800);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.backgroundContainer, { opacity: fadeOutAnim }]}>
        <ImageBackground
          source={require('../../assets/cemetery-path.jpg')}
          style={styles.backgroundImage}
        >
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.title, { opacity: textAnim }]}>
              <Text style={styles.titleText}>{currentLine1}</Text>
              <Text style={styles.titleText}>{currentLine2}</Text>
            </Animated.View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 2,
  },
});

export default SplashScreen;