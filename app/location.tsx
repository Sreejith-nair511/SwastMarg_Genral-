import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { MapPin, Lock } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Card from '@/components/Card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useScreening } from '@/context/ScreeningContext';

export default function LocationScreen() {
  const router = useRouter();
  const { updateLocation } = useScreening();
  const [isDetecting, setIsDetecting] = useState(true);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const mockLocations = [
      'Greenfield Village',
      'Riverside District',
      'Hilltop Community',
      'Central Township',
      'Lakeside Area',
    ];

    const randomLocation =
      mockLocations[Math.floor(Math.random() * mockLocations.length)];

    setTimeout(() => {
      setLocation(randomLocation);
      setIsDetecting(false);
      updateLocation({
        village: randomLocation,
        coordinates: { lat: 0, lng: 0 },
      });
    }, 2000);
  }, [updateLocation]);

  const handleContinue = () => {
    router.push('/analyze');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressIndicator currentStep={3} totalSteps={4} />

        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <MapPin size={32} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Location Detection</Text>
          <Text style={styles.subtitle}>
            Finding healthcare facilities near you
          </Text>
        </View>

        {isDetecting ? (
          <Card style={styles.loadingCard}>
            <View style={styles.loadingContent}>
              <View style={styles.spinner} />
              <Text style={styles.loadingText}>Detecting your location...</Text>
            </View>
          </Card>
        ) : (
          <>
            <Card style={styles.locationCard}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <View style={styles.locationRow}>
                <MapPin size={24} color="#10B981" />
                <Text style={styles.locationText}>{location}</Text>
              </View>
            </Card>

            <Card style={styles.privacyCard}>
              <View style={styles.privacyHeader}>
                <Lock size={20} color="#6B7280" />
                <Text style={styles.privacyTitle}>Privacy Notice</Text>
              </View>
              <Text style={styles.privacyText}>
                Your location is used only to find nearby healthcare facilities.
                It is not stored or shared with third parties.
              </Text>
            </Card>

            <PrimaryButton title="Continue to Analysis" onPress={handleContinue} />
          </>
        )}

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
  loadingCard: {
    padding: 40,
  },
  loadingContent: {
    alignItems: 'center',
    gap: 20,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: '#3B82F6',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  locationCard: {
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  privacyCard: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    marginBottom: 32,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  privacyText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
});
