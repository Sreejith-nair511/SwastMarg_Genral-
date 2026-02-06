import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ScreeningProvider } from '@/context/ScreeningContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ScreeningProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ScreeningProvider>
  );
}
