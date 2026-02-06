import { TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useState } from 'react';

interface VoiceInputButtonProps {
  onResult: (text: string) => void;
  fieldType?: 'number' | 'text';
}

export default function VoiceInputButton({
  onResult,
  fieldType = 'text',
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    if (Platform.OS === 'web') {
      setIsListening(true);

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        processTranscript(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        Alert.alert('Error', 'Voice input failed. Please try again.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      Alert.alert(
        'Voice Input',
        'Voice input is available on web. For demo, please type manually.',
      );
    }
  };

  const processTranscript = (transcript: string) => {
    if (fieldType === 'number') {
      const numbers = transcript.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        onResult(numbers[0]);
      } else {
        const words = transcript.toLowerCase();
        const numberWords: { [key: string]: string } = {
          zero: '0',
          one: '1',
          two: '2',
          three: '3',
          four: '4',
          five: '5',
          six: '6',
          seven: '7',
          eight: '8',
          nine: '9',
          ten: '10',
          twenty: '20',
          thirty: '30',
          forty: '40',
          fifty: '50',
          sixty: '60',
          seventy: '70',
          eighty: '80',
          ninety: '90',
        };

        for (const [word, num] of Object.entries(numberWords)) {
          if (words.includes(word)) {
            onResult(num);
            return;
          }
        }

        Alert.alert('Error', 'Could not detect a number. Please try again.');
      }
    } else {
      onResult(transcript);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isListening && styles.buttonActive]}
      onPress={handleVoiceInput}
      activeOpacity={0.7}
    >
      <Mic size={24} color={isListening ? '#DC2626' : '#3B82F6'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  buttonActive: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
});
