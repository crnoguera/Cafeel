import { initNotifications } from '@/lib/notifications';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => { initNotifications(); }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth/onboarding" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen name="task/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="task/new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="note/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="note/new" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
