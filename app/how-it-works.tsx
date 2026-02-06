import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ClipboardList,
  Brain,
  MapPin,
  Hospital,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';

export default function HowItWorksScreen() {
  const router = useRouter();

  const steps = [
    {
      icon: ClipboardList,
      title: '1. Health Screening',
      description:
        'Quick assessment of vital signs and symptoms using simple inputs or voice commands',
    },
    {
      icon: Brain,
      title: '2. AI-Assisted Triage',
      description:
        'Rule-based system analyzes data to determine health priority level',
    },
    {
      icon: MapPin,
      title: '3. Location Detection',
      description:
        'System identifies your location to find nearby healthcare facilities',
    },
    {
      icon: Hospital,
      title: '4. Smart Referral',
      description:
        'Recommends appropriate healthcare facilities based on risk level and proximity',
    },
    {
      icon: MessageCircle,
      title: '5. Feedback Loop',
      description:
        'Collect outcomes to improve system accuracy and recommendations over time',
    },
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
        <Text style={styles.title}>How This System Works</Text>
        <Text style={styles.subtitle}>
          A step-by-step guide to our health screening and referral process
        </Text>

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.iconContainer}>
                  <Icon size={32} color="#3B82F6" />
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </Card>
          );
        })}

        <Card style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Important Notice</Text>
          <Text style={styles.disclaimerText}>
            This system does NOT perform medical diagnosis. It provides health
            screening and referral guidance only. All health decisions should be
            made in consultation with qualified healthcare professionals.
          </Text>
        </Card>

        <PrimaryButton
          title="Start Screening"
          onPress={() => router.push('/profile')}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  stepCard: {
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  stepDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    paddingLeft: 72,
  },
  disclaimerCard: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    marginTop: 8,
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#991B1B',
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
});
