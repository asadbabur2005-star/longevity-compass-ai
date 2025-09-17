// Mortality Risk Calculator based on various health and lifestyle factors
// This is a simplified version for educational purposes

export const calculateMortalityRisk = (userData) => {
  const {
    basicInfo,
    lifestyle,
    demographics
  } = userData;

  // Base risk factors
  let riskScore = 0;
  let fiveYearRisk = 0;
  let tenYearRisk = 0;
  let fifteenYearRisk = 0;

  // Age factor (most significant)
  const age = parseInt(basicInfo?.age || 33);
  if (age < 30) {
    riskScore += 0.1;
  } else if (age < 40) {
    riskScore += 0.3;
  } else if (age < 50) {
    riskScore += 0.8;
  } else if (age < 60) {
    riskScore += 2.0;
  } else if (age < 70) {
    riskScore += 4.5;
  } else {
    riskScore += 8.0;
  }

  // Sex factor
  if (basicInfo?.sex === 'Male') {
    riskScore *= 1.3; // Males generally have higher mortality risk
  }

  // BMI calculation and factor
  if (basicInfo?.height && basicInfo?.weight) {
    const height = parseFloat(basicInfo.height);
    const weight = parseFloat(basicInfo.weight);
    let bmi;

    if (basicInfo.unit === 'Metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      // Imperial: height in inches, weight in pounds
      bmi = (weight * 703) / (height ** 2);
    }

    if (bmi < 18.5) {
      riskScore *= 1.4; // Underweight
    } else if (bmi > 30) {
      riskScore *= 1.6; // Obese
    } else if (bmi > 25) {
      riskScore *= 1.2; // Overweight
    }
  }

  // Blood pressure factor
  switch (basicInfo?.bloodPressure) {
    case 'Low':
      riskScore *= 1.1;
      break;
    case 'Elevated':
      riskScore *= 1.3;
      break;
    case 'High1':
      riskScore *= 1.8;
      break;
    case 'High2':
      riskScore *= 2.5;
      break;
    default: // Normal
      riskScore *= 1.0;
  }

  // Diabetes factor
  if (basicInfo?.hasDiabetes) {
    riskScore *= 2.2;
  }

  // Smoking factor
  switch (lifestyle?.smokingStatus) {
    case 'Light':
      riskScore *= 1.8;
      break;
    case 'Heavy':
      riskScore *= 3.2;
      break;
    case 'Former':
      riskScore *= 1.4;
      break;
    default: // Never
      riskScore *= 1.0;
  }

  // Physical activity factor
  switch (lifestyle?.physicalActivity) {
    case 'Low':
      riskScore *= 1.5;
      break;
    case 'High':
      riskScore *= 0.7;
      break;
    default: // Moderate
      riskScore *= 1.0;
  }

  // Diet quality factor
  switch (lifestyle?.dietQuality) {
    case 'Poor':
      riskScore *= 1.4;
      break;
    case 'Fair':
      riskScore *= 1.1;
      break;
    case 'Excellent':
      riskScore *= 0.8;
      break;
    default: // Good
      riskScore *= 1.0;
  }

  // Sleep factor
  const sleepHours = parseInt(lifestyle?.sleepHours || 8);
  if (sleepHours < 6 || sleepHours > 9) {
    riskScore *= 1.3;
  }

  // Alcohol factor
  switch (lifestyle?.alcoholFrequency) {
    case 'Daily':
      riskScore *= 1.4;
      break;
    case 'Weekly':
      riskScore *= 1.1;
      break;
    default: // Monthly or Never
      riskScore *= 1.0;
  }

  // Demographics factors (protective factors)
  if (demographics?.maritalStatus === 'Married') {
    riskScore *= 0.9; // Married people tend to have lower mortality
  }

  if (demographics?.educationLevel === 'Bachelor' || demographics?.educationLevel === 'Graduate') {
    riskScore *= 0.85; // Higher education is protective
  }

  // Calculate risk percentages
  fiveYearRisk = Math.min(riskScore * 0.35, 15);
  tenYearRisk = Math.min(riskScore * 0.7, 25);
  fifteenYearRisk = Math.min(riskScore * 1.1, 35);

  // Ensure minimum values
  fiveYearRisk = Math.max(fiveYearRisk, 0.1);
  tenYearRisk = Math.max(tenYearRisk, 0.2);
  fifteenYearRisk = Math.max(fifteenYearRisk, 0.3);

  return {
    fiveYear: parseFloat(fiveYearRisk.toFixed(1)),
    tenYear: parseFloat(tenYearRisk.toFixed(1)),
    fifteenYear: parseFloat(fifteenYearRisk.toFixed(1)),
    riskLevel: getRiskLevel(tenYearRisk)
  };
};

const getRiskLevel = (tenYearRisk) => {
  if (tenYearRisk < 2) return 'VERY LOW';
  if (tenYearRisk < 5) return 'LOW';
  if (tenYearRisk < 10) return 'MODERATE';
  if (tenYearRisk < 20) return 'HIGH';
  return 'VERY HIGH';
};

export const calculateWhatIfScenario = (originalData, changes) => {
  // Create a modified version of the data with the changes
  const modifiedData = JSON.parse(JSON.stringify(originalData));

  // Apply changes
  if (changes.exercise) {
    modifiedData.lifestyle.physicalActivity = 'High';
  }
  if (changes.diet) {
    modifiedData.lifestyle.dietQuality = 'Excellent';
  }
  if (changes.smoking && modifiedData.lifestyle.smokingStatus !== 'Never') {
    modifiedData.lifestyle.smokingStatus = 'Never';
  }
  if (changes.weight) {
    // Reduce weight by 10% for weight loss scenario
    if (modifiedData.basicInfo.weight) {
      modifiedData.basicInfo.weight = (parseFloat(modifiedData.basicInfo.weight) * 0.9).toString();
    }
  }

  return calculateMortalityRisk(modifiedData);
};

export const generateWhatIfSuggestions = (userData) => {
  const suggestions = [];

  // Exercise suggestion
  if (userData.lifestyle?.physicalActivity !== 'High') {
    suggestions.push({
      title: 'What if you exercise regularly?',
      description: 'Regular physical activity can significantly reduce your mortality risk.',
      change: { exercise: true }
    });
  }

  // Diet suggestion
  if (userData.lifestyle?.dietQuality !== 'Excellent') {
    suggestions.push({
      title: 'What if you improve your diet?',
      description: 'A high-quality diet rich in fruits, vegetables, and whole grains can lower health risks.',
      change: { diet: true }
    });
  }

  // Smoking suggestion
  if (userData.lifestyle?.smokingStatus !== 'Never') {
    suggestions.push({
      title: 'What if you quit smoking?',
      description: 'Quitting smoking is one of the best things you can do for your health.',
      change: { smoking: true }
    });
  }

  // Weight suggestion
  if (userData.basicInfo?.weight && userData.basicInfo?.height) {
    const height = parseFloat(userData.basicInfo.height);
    const weight = parseFloat(userData.basicInfo.weight);
    let bmi;

    if (userData.basicInfo.unit === 'Metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      bmi = (weight * 703) / (height ** 2);
    }

    if (bmi > 25) {
      suggestions.push({
        title: 'What if you lose weight?',
        description: 'Maintaining a healthy weight can reduce your risk of chronic diseases.',
        change: { weight: true }
      });
    }
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
};