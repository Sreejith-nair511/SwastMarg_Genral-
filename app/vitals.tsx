import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Activity, Thermometer, Heart, Wind, ArrowLeft } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';
import VoiceInputButton from '@/components/VoiceInputButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useScreening } from '@/context/ScreeningContext';

export default function VitalsScreen() {
  const router = useRouter();
  const { updateVitals } = useScreening();

  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [spO2, setSpO2] = useState('');

  const handleContinue = () => {
    updateVitals({ temperature, heartRate, spO2 });
    router.push('/symptoms');
  };

  const handleSkip = () => {
    updateVitals({ temperature: '', heartRate: '', spO2: '' });
    router.push('/symptoms');
  };

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
        <ProgressIndicator currentStep={1} totalSteps={4} />

        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Activity size={32} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Vital Signs</Text>
          <Text style={styles.subtitle}>
            Enter measurements if available
          </Text>
        </View>

        <Card style={styles.vitalCard}>
          <View style={styles.vitalHeader}>
            <Thermometer size={24} color="#EF4444" />
            <Text style={styles.vitalLabel}>Temperature</Text>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="98.6"
              value={temperature}
              onChangeText={setTemperature}
              keyboardType="decimal-pad"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.unit}>°F</Text>
            <VoiceInputButton onResult={setTemperature} fieldType="number" />
          </View>
          <Text style={styles.hint}>Normal: 97.0 - 99.0°F</Text>
        </Card>

        <Card style={styles.vitalCard}>
          <View style={styles.vitalHeader}>
            <Heart size={24} color="#EF4444" />
            <Text style={styles.vitalLabel}>Heart Rate</Text>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="72"
              value={heartRate}
              onChangeText={setHeartRate}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.unit}>bpm</Text>
            <VoiceInputButton onResult={setHeartRate} fieldType="number" />
          </View>
          <Text style={styles.hint}>Normal: 60 - 100 bpm</Text>
        </Card>

        <Card style={styles.vitalCard}>
          <View style={styles.vitalHeader}>
            <Wind size={24} color="#3B82F6" />
            <Text style={styles.vitalLabel}>Blood Oxygen (SpO₂)</Text>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="98"
              value={spO2}
              onChangeText={setSpO2}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.unit}>%</Text>
            <VoiceInputButton onResult={setSpO2} fieldType="number" />
          </View>
          <Text style={styles.hint}>Normal: 95 - 100%</Text>
        </Card>

        <View style={styles.skipNote}>
          <Text style={styles.skipText}>
            No equipment? You can skip vitals and continue with symptoms only.
          </Text>
        </View>

        <PrimaryButton title="Continue" onPress={handleContinue} />

        <View style={styles.buttonSpacer} />

        <PrimaryButton
          title="Skip Vitals"
          onPress={handleSkip}
          variant="outline"
        />

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
  vitalCard: {
    marginBottom: 16,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  vitalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  unit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    width: 40,
  },
  hint: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  skipNote: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  skipText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonSpacer: {
    height: 12,
  },
  spacer: {
    height: 40,
  },
});
