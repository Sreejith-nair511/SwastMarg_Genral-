import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';

export default function FeedbackScreen() {
  const router = useRouter();
  const [visitedFacility, setVisitedFacility] = useState<boolean | null>(null);
  const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <CheckCircle2 size={64} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successText}>
            Your feedback helps us improve the system and provide better care
            recommendations.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MessageCircle size={32} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Your Feedback</Text>
          <Text style={styles.subtitle}>
            Help us improve the screening system
          </Text>
        </View>

        <Card style={styles.questionCard}>
          <Text style={styles.questionText}>
            Did you visit a healthcare facility?
          </Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="Yes"
                onPress={() => setVisitedFacility(true)}
                variant={visitedFacility === true ? 'primary' : 'outline'}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="No"
                onPress={() => {
                  setVisitedFacility(false);
                  setWasHelpful(null);
                }}
                variant={visitedFacility === false ? 'secondary' : 'outline'}
              />
            </View>
          </View>
        </Card>

        {visitedFacility === true && (
          <Card style={styles.questionCard}>
            <Text style={styles.questionText}>
              Was the recommendation helpful?
            </Text>
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="Yes"
                  onPress={() => setWasHelpful(true)}
                  variant={wasHelpful === true ? 'primary' : 'outline'}
                />
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="No"
                  onPress={() => setWasHelpful(false)}
                  variant={wasHelpful === false ? 'secondary' : 'outline'}
                />
              </View>
            </View>
          </Card>
        )}

        <Card style={styles.commentsCard}>
          <Text style={styles.label}>Additional Comments (Optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Share your experience or suggestions..."
            value={comments}
            onChangeText={setComments}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>
            Your feedback is anonymous and helps improve the accuracy and
            effectiveness of our health screening and referral system.
          </Text>
        </Card>

        <PrimaryButton
          title="Submit Feedback"
          onPress={handleSubmit}
          disabled={visitedFacility === null}
        />

        <View style={styles.buttonSpacer} />

        <PrimaryButton
          title="Skip"
          onPress={() => router.push('/')}
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
  questionCard: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  commentsCard: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#0C4A6E',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonSpacer: {
    height: 12,
  },
  spacer: {
    height: 40,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  successText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
  },
});
