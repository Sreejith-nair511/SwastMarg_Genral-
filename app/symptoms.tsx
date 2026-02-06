import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ClipboardList, ArrowLeft } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useScreening } from '@/context/ScreeningContext';

export default function SymptomsScreen() {
  const router = useRouter();
  const { updateSymptoms } = useScreening();

  const [symptoms, setSymptoms] = useState({
    fever: false,
    cough: false,
    chestPain: false,
    breathlessness: false,
    dizziness: false,
  });

  const toggleSymptom = (key: keyof typeof symptoms) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    updateSymptoms(symptoms);
    router.push('/location');
  };

  const symptomItems = [
    { key: 'fever' as const, label: 'Fever or feeling hot', color: '#EF4444' },
    { key: 'cough' as const, label: 'Cough', color: '#F59E0B' },
    { key: 'chestPain' as const, label: 'Chest pain or discomfort', color: '#DC2626' },
    { key: 'breathlessness' as const, label: 'Difficulty breathing', color: '#7C3AED' },
    { key: 'dizziness' as const, label: 'Dizziness or lightheadedness', color: '#2563EB' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PrimaryButton
          title="Back"
          onPress={() => router.back()}
          variant="outline"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ProgressIndicator currentStep={2} totalSteps={4} />

        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <ClipboardList size={32} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Current Symptoms</Text>
          <Text style={styles.subtitle}>
            Select any symptoms you are experiencing
          </Text>
        </View>

        {symptomItems.map((item) => (
          <Card key={item.key} style={styles.symptomCard}>
            <Text style={styles.symptomLabel}>{item.label}</Text>
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="Yes"
                  onPress={() => toggleSymptom(item.key)}
                  variant={symptoms[item.key] ? 'primary' : 'outline'}
                />
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="No"
                  onPress={() =>
                    setSymptoms((prev) => ({ ...prev, [item.key]: false }))
                  }
                  variant={!symptoms[item.key] ? 'secondary' : 'outline'}
                />
              </View>
            </View>
          </Card>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Tap "Yes" if you are currently experiencing the symptom, or "No" if
            not. You can change your selections before continuing.
          </Text>
        </View>

        <PrimaryButton title="Continue" onPress={handleContinue} />

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
  header: {
    padding: 20,
    paddingTop: 60,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
  symptomCard: {
    marginBottom: 16,
  },
  symptomLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
});
