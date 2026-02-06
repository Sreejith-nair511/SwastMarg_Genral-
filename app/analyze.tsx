import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Brain, CheckCircle } from 'lucide-react-native';
import Card from '@/components/Card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useScreening } from '@/context/ScreeningContext';

export default function AnalyzeScreen() {
  const router = useRouter();
  const { data, updateRiskLevel } = useScreening();
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    'Reviewing vital signs...',
    'Analyzing symptoms...',
    'Calculating risk score...',
    'Generating recommendation...',
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    const analysisTimeout = setTimeout(() => {
      clearInterval(stepInterval);

      const spO2Value = parseFloat(data.vitals.spO2);
      const { chestPain, breathlessness, fever, cough } = data.symptoms;

      let riskLevel: 'low' | 'medium' | 'high';

      if (
        (spO2Value > 0 && spO2Value < 92) ||
        chestPain ||
        breathlessness
      ) {
        riskLevel = 'high';
      } else if (fever && cough) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }

      updateRiskLevel(riskLevel);
      router.push('/result');
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(analysisTimeout);
    };
  }, [data, updateRiskLevel, router]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressIndicator currentStep={4} totalSteps={4} />

        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Brain size={48} color="#3B82F6" />
          </View>
          <Text style={styles.title}>AI Analysis</Text>
          <Text style={styles.subtitle}>
            Processing your health information
          </Text>
        </View>

        <Card style={styles.stepsCard}>
          {analysisSteps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View
                style={[
                  styles.stepIndicator,
                  index <= currentStep && styles.stepIndicatorActive,
                ]}
              >
                {index < currentStep ? (
                  <CheckCircle size={20} color="#10B981" />
                ) : (
                  <View style={styles.stepDot} />
                )}
              </View>
              <Text
                style={[
                  styles.stepText,
                  index <= currentStep && styles.stepTextActive,
                ]}
              >
                {step}
              </Text>
            </View>
          ))}
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>How AI Analysis Works</Text>
          <Text style={styles.infoText}>
            Our system uses rule-based logic to analyze health indicators:
          </Text>
          <Text style={styles.infoPoint}>
            • Vital signs are compared against normal ranges
          </Text>
          <Text style={styles.infoPoint}>
            • Symptom patterns are evaluated for severity
          </Text>
          <Text style={styles.infoPoint}>
            • A priority score is generated for triage
          </Text>
          <Text style={styles.infoText} style={{ marginTop: 12 }}>
            This is NOT a medical diagnosis. Results guide referral decisions
            only.
          </Text>
        </Card>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  stepsCard: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicatorActive: {
    backgroundColor: '#D1FAE5',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#9CA3AF',
  },
  stepTextActive: {
    color: '#111827',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#0C4A6E',
    lineHeight: 20,
    marginBottom: 8,
  },
  infoPoint: {
    fontSize: 14,
    color: '#075985',
    lineHeight: 22,
  },
  spacer: {
    height: 40,
  },
});
