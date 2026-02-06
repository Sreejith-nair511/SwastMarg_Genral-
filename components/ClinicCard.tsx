import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import Card from './Card';

interface ClinicCardProps {
  name: string;
  distance: string;
  type: string;
  waitTime?: string;
}

export default function ClinicCard({
  name,
  distance,
  type,
  waitTime,
}: ClinicCardProps) {
  return (
    <Card style={styles.clinicCard}>
      <View style={styles.header}>
        <Text style={styles.clinicName}>{name}</Text>
        <Text style={styles.clinicType}>{type}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.infoText}>{distance}</Text>
        </View>
        {waitTime && (
          <View style={styles.infoItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.infoText}>{waitTime}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  clinicCard: {
    marginBottom: 12,
  },
  header: {
    marginBottom: 8,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  clinicType: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
