import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Activity, MapPin } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Activity size={48} color="#3B82F6" />
        </View>
        <Text style={styles.title}>Smart Health Screening & Referral System</Text>
        <Text style={styles.subtitle}>
          AI-assisted screening • Location-based referrals
        </Text>
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.feature}>
          <Activity size={24} color="#10B981" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Quick Health Screening</Text>
            <Text style={styles.featureDescription}>
              Check vitals and symptoms in minutes
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <MapPin size={24} color="#10B981" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Find Nearby Care</Text>
            <Text style={styles.featureDescription}>
              Get referrals to closest healthcare facilities
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          This system provides health screening and referral guidance only. It
          does not diagnose medical conditions.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title="Start Screening"
          onPress={() => router.push('/profile')}
        />
        <View style={styles.spacer} />
        <PrimaryButton
          title="How This System Works"
          onPress={() => router.push('/how-it-works')}
          variant="outline"
        />
        <View style={styles.spacer} />
        <PrimaryButton
          title="View Dashboard"
          onPress={() => router.push('/dashboard')}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoCard: {
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  disclaimer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCD34D',
    marginBottom: 32,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    textAlign: 'center',
  },
  actions: {
    marginBottom: 40,
  },
  spacer: {
    height: 12,
  },
});
