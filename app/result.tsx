import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';
import RiskBadge from '@/components/RiskBadge';
import ClinicCard from '@/components/ClinicCard';
import { useScreening } from '@/context/ScreeningContext';

export default function ResultScreen() {
  const router = useRouter();
  const { data, resetScreening } = useScreening();

  const riskLevel = data.riskLevel || 'low';

  const getRiskInfo = () => {
    switch (riskLevel) {
      case 'high':
        return {
          icon: AlertCircle,
          color: '#DC2626',
          title: 'Immediate Medical Attention Recommended',
          description:
            'Your symptoms and vital signs indicate you should seek medical care immediately. Please visit a healthcare facility as soon as possible.',
          action: 'Visit nearest emergency facility',
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: '#D97706',
          title: 'Medical Consultation Advised',
          description:
            'Your symptoms suggest you should consult with a healthcare provider within 24 hours for proper evaluation and care.',
          action: 'Schedule appointment soon',
        };
      case 'low':
        return {
          icon: CheckCircle2,
          color: '#059669',
          title: 'Monitor Your Health',
          description:
            'Your vitals and symptoms are within normal ranges. Continue monitoring your health and maintain good wellness practices.',
          action: 'Continue self-care and monitoring',
        };
    }
  };

  const riskInfo = getRiskInfo();
  const Icon = riskInfo.icon;

  const mockClinics =
    riskLevel === 'high'
      ? [
          {
            name: 'Central District Hospital',
            distance: '1.2 km',
            type: 'Emergency Care',
            waitTime: '15 min',
          },
          {
            name: 'Community Health Center',
            distance: '2.5 km',
            type: 'Urgent Care',
            waitTime: '30 min',
          },
        ]
      : riskLevel === 'medium'
        ? [
            {
              name: 'Family Health Clinic',
              distance: '0.8 km',
              type: 'Primary Care',
              waitTime: '45 min',
            },
            {
              name: 'Wellness Medical Center',
              distance: '1.5 km',
              type: 'General Practice',
              waitTime: '1 hour',
            },
          ]
        : [
            {
              name: 'Community Health Post',
              distance: '0.5 km',
              type: 'Basic Care',
            },
            {
              name: 'Village Medical Clinic',
              distance: '1.0 km',
              type: 'Primary Care',
            },
          ];

  const handleRestart = () => {
    resetScreening();
    router.push('/');
  };

  const handleFeedback = () => {
    router.push('/feedback');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${riskInfo.color}15` },
            ]}
          >
            <Icon size={48} color={riskInfo.color} />
          </View>
          <Text style={styles.title}>Screening Complete</Text>
        </View>

        <Card style={styles.riskCard}>
          <RiskBadge level={riskLevel} />
          <Text style={styles.riskTitle}>{riskInfo.title}</Text>
          <Text style={styles.riskDescription}>{riskInfo.description}</Text>
        </Card>

        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Recommended Action</Text>
          <Text style={styles.actionText}>{riskInfo.action}</Text>
        </Card>

        <View style={styles.clinicsSection}>
          <Text style={styles.sectionTitle}>Nearby Healthcare Facilities</Text>
          <Text style={styles.sectionSubtitle}>
            Based on your location: {data.location?.village}
          </Text>

          {mockClinics.map((clinic, index) => (
            <ClinicCard
              key={index}
              name={clinic.name}
              distance={clinic.distance}
              type={clinic.type}
              waitTime={clinic.waitTime}
            />
          ))}
        </View>

        <Card style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Important Notice</Text>
          <Text style={styles.disclaimerText}>
            This screening provides guidance only and is not a medical
            diagnosis. Always consult qualified healthcare professionals for
            medical advice, diagnosis, and treatment.
          </Text>
        </Card>

        <PrimaryButton
          title="Provide Feedback"
          onPress={handleFeedback}
          variant="secondary"
        />

        <View style={styles.buttonSpacer} />

        <PrimaryButton
          title="Start New Screening"
          onPress={handleRestart}
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  riskCard: {
    marginBottom: 16,
  },
  riskTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  riskDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  actionCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    marginBottom: 24,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  clinicsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  disclaimerCard: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  buttonSpacer: {
    height: 12,
  },
  spacer: {
    height: 40,
  },
});
