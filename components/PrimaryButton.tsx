import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return '#E0E0E0';
    if (variant === 'secondary') return '#10B981';
    if (variant === 'outline') return 'transparent';
    return '#3B82F6';
  };

  const getTextColor = () => {
    if (disabled) return '#9CA3AF';
    if (variant === 'outline') return '#3B82F6';
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: variant === 'outline' ? '#3B82F6' : 'transparent',
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.buttonText, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
