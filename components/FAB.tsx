import { theme } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, useColorScheme } from 'react-native';

export default function FAB({ onPress, label = '+' }: { onPress: () => void; label?: string }) {
  const colors = theme(useColorScheme());
  return (
    <Pressable
      onPress={async () => { try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); } catch {} onPress(); }}
      style={{
        position: 'absolute', right: 20, bottom: 24,
        backgroundColor: colors.primary, borderRadius: 28, paddingHorizontal: 20, paddingVertical: 14,
        shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 3
      }}
    >
      <Text style={{ color: 'white', fontWeight: '800', fontSize: 20 }}>{label}</Text>
    </Pressable>
  );
}
