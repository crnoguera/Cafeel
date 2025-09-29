import { theme } from '@/constants/theme';
import { Text, useColorScheme, View } from 'react-native';

export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  const colors = theme(useColorScheme());
  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{title}</Text>
      {!!subtitle && <Text style={{ color: colors.subtext, textAlign: 'center' }}>{subtitle}</Text>}
    </View>
  );
}
