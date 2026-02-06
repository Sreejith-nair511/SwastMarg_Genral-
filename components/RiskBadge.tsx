import { View, Text, StyleSheet } from 'react-native';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const getColors = () => {
    switch (level) {
      case 'high':
        return { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' };
      case 'medium':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
      case 'low':
        return { bg: '#D1FAE5', text: '#059669', border: '#6EE7B7' };
    }
  };

  const colors = getColors();
  const label = level.charAt(0).toUpperCase() + level.slice(1) + ' Risk';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.badgeText, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
