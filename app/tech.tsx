import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Brain, Cpu, Database, MapPin, Shield, ArrowLeft } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';

export default function TechScreen() {
  const router = useRouter();

  const techFeatures = [
    {
      icon: Brain,
      title: 'Rule-Based AI Engine',
      description:
        'Explainable logic that evaluates health indicators against clinical guidelines to determine priority levels',
      color: '#3B82F6',
    },
    {
      icon: Cpu,
      title: 'Lightweight ML Model',
      description:
        'Pattern recognition trained on screening outcomes to improve referral accuracy over time',
      color: '#10B981',
    },
    {
      icon: Database,
      title: 'Structured Data Processing',
      description:
        'Efficient handling of vitals, symptoms, and location data with privacy-first architecture',
      color: '#F59E0B',
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description:
        'Real-time mapping of healthcare facilities with distance calculation and availability tracking',
      color: '#8B5CF6',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description:
        'End-to-end data protection with no storage of personal health information',
      color: '#DC2626',
    },
  ];

  const impactMetrics = [
    'Reduces screening time from 20 minutes to 3.5 minutes',
    'Enables early identification of high-risk cases',
    'Connects underserved communities to healthcare',
    'Provides data for public health planning',
    'Improves resource allocation efficiency',
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
          <View style={styles.iconContainer}>
            <Brain size={40} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Technology & AI Overview</Text>
          <Text style={styles.subtitle}>
            How AI powers intelligent health screening
          </Text>
        </View>

        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>System Architecture</Text>
          <Text style={styles.overviewText}>
            Our system combines rule-based decision logic with lightweight
            machine learning to provide accurate, explainable health triage.
            Unlike black-box AI, every recommendation can be traced to specific
            health indicators.
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>Core Technologies</Text>
        {techFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} style={styles.featureCard}>
              <View style={styles.featureHeader}>
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: `${feature.color}15` },
                  ]}
                >
                  <Icon size={28} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </Card>
          );
        })}

        <Card style={styles.aiCard}>
          <Text style={styles.aiTitle}>Why AI Matters</Text>
          <Text style={styles.aiText}>
            Traditional health screening requires trained personnel and
            significant time. AI-assisted triage enables:
          </Text>
          <View style={styles.aiList}>
            <Text style={styles.aiPoint}>
              • Rapid assessment without compromising accuracy
            </Text>
            <Text style={styles.aiPoint}>
              • Consistent evaluation across different locations
            </Text>
            <Text style={styles.aiPoint}>
              • Data-driven insights for healthcare planning
            </Text>
            <Text style={styles.aiPoint}>
              • Scalable solution for underserved areas
            </Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>System Impact</Text>
        <Card style={styles.impactCard}>
          {impactMetrics.map((metric, index) => (
            <View key={index} style={styles.impactRow}>
              <View style={styles.impactDot} />
              <Text style={styles.impactText}>{metric}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>AI Ethics & Transparency</Text>
          <Text style={styles.disclaimerText}>
            This system is designed to assist, not replace, healthcare
            professionals. All AI decisions use explainable logic and are
            validated against clinical guidelines. No diagnosis is performed.
          </Text>
        </Card>

        <PrimaryButton
          title="Back to Dashboard"
          onPress={() => router.push('/dashboard')}
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
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  overviewCard: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 15,
    color: '#075985',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  featureCard: {
    marginBottom: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  featureDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    paddingLeft: 72,
  },
  aiCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    marginTop: 8,
    marginBottom: 24,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 12,
  },
  aiText: {
    fontSize: 15,
    color: '#047857',
    lineHeight: 22,
    marginBottom: 12,
  },
  aiList: {
    gap: 8,
  },
  aiPoint: {
    fontSize: 15,
    color: '#047857',
    lineHeight: 22,
  },
  impactCard: {
    marginBottom: 24,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  impactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  impactText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  disclaimerCard: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
});
