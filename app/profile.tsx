import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { User, ArrowLeft } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';
import VoiceInputButton from '@/components/VoiceInputButton';
import { useScreening } from '@/context/ScreeningContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { updateProfile } = useScreening();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [consent, setConsent] = useState(false);

  const handleContinue = () => {
    updateProfile(age, gender, consent);
    router.push('/vitals');
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
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <User size={32} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us provide better recommendations
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.label}>Age</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <VoiceInputButton
              onResult={setAge}
              fieldType="number"
            />
          </View>
          <Text style={styles.hint}>Or tap the microphone to speak</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.label}>Gender (Optional)</Text>
          <View style={styles.genderButtons}>
            <PrimaryButton
              title="Male"
              onPress={() => setGender('male')}
              variant={gender === 'male' ? 'primary' : 'outline'}
            />
            <View style={styles.buttonSpacer} />
            <PrimaryButton
              title="Female"
              onPress={() => setGender('female')}
              variant={gender === 'female' ? 'primary' : 'outline'}
            />
            <View style={styles.buttonSpacer} />
            <PrimaryButton
              title="Other"
              onPress={() => setGender('other')}
              variant={gender === 'other' ? 'primary' : 'outline'}
            />
          </View>
        </Card>

        <Card style={styles.consentCard}>
          <PrimaryButton
            title={consent ? 'Consent Given ✓' : 'Give Consent'}
            onPress={() => setConsent(!consent)}
            variant={consent ? 'secondary' : 'outline'}
          />
          <Text style={styles.consentText}>
            I consent to this health screening. I understand this is not a
            medical diagnosis and should consult healthcare professionals for
            medical advice.
          </Text>
        </Card>

        <PrimaryButton
          title="Continue to Vitals"
          onPress={handleContinue}
          disabled={!age || !consent}
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
  card: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
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
  hint: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  genderButtons: {
    gap: 12,
  },
  buttonSpacer: {
    height: 8,
  },
  consentCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    marginBottom: 24,
  },
  consentText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
    marginTop: 12,
  },
  spacer: {
    height: 40,
  },
});
