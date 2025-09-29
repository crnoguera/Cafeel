import { theme } from '@/constants/theme';
import { Text, useColorScheme, View } from 'react-native';

export default function TagPill({ label }: { label: string }) {
  const colors = theme(useColorScheme());
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 6, backgroundColor: colors.primarySoft, borderRadius: 999 }}>
      <Text style={{ color: colors.primary, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
