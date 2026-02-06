import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Users,
  AlertCircle,
  Hospital,
  MessageCircle,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';

export default function DashboardScreen() {
  const router = useRouter();

  const stats = [
    {
      icon: Users,
      label: 'Users Screened',
      value: '1,247',
      change: '+12% this week',
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      icon: AlertCircle,
      label: 'High Risk Cases',
      value: '89',
      change: '7% of total',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      icon: Hospital,
      label: 'Referrals Made',
      value: '456',
      change: '37% of screenings',
      color: '#10B981',
      bg: '#D1FAE5',
    },
    {
      icon: MessageCircle,
      label: 'Feedback Received',
      value: '312',
      change: '68% response rate',
      color: '#F59E0B',
      bg: '#FEF3C7',
    },
  ];

  const recentActivity = [
    {
      time: '2 min ago',
      text: 'High risk screening completed',
      location: 'Greenfield Village',
    },
    {
      time: '15 min ago',
      text: 'Medium risk screening completed',
      location: 'Riverside District',
    },
    {
      time: '28 min ago',
      text: 'Feedback submitted',
      location: 'Central Township',
    },
    {
      time: '1 hour ago',
      text: 'Low risk screening completed',
      location: 'Hilltop Community',
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
        <View style={styles.titleContainer}>
          <TrendingUp size={32} color="#3B82F6" />
          <Text style={styles.title}>System Dashboard</Text>
          <Text style={styles.subtitle}>
            Real-time health screening analytics
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} style={styles.statCard}>
                <View
                  style={[styles.statIcon, { backgroundColor: stat.bg }]}
                >
                  <Icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </Card>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity, index) => (
            <Card key={index} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Text style={styles.activityText}>{activity.text}</Text>
              <Text style={styles.activityLocation}>{activity.location}</Text>
            </Card>
          ))}
        </View>

        <Card style={styles.impactCard}>
          <Text style={styles.impactTitle}>System Impact</Text>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>Average screening time:</Text>
            <Text style={styles.impactValue}>3.5 minutes</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>Facilities connected:</Text>
            <Text style={styles.impactValue}>24 clinics</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>Areas covered:</Text>
            <Text style={styles.impactValue}>8 communities</Text>
          </View>
        </Card>

        <PrimaryButton
          title="View Technology Overview"
          onPress={() => router.push('/tech')}
          variant="secondary"
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsGrid: {
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    alignItems: 'center',
    padding: 24,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 14,
    color: '#10B981',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 12,
  },
  activityHeader: {
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  activityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  impactCard: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    marginBottom: 24,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 16,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  impactLabel: {
    fontSize: 15,
    color: '#075985',
  },
  impactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0C4A6E',
  },
  spacer: {
    height: 40,
  },
});
