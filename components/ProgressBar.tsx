import { theme } from '@/constants/theme';
import { useColorScheme, View } from 'react-native';

export default function ProgressBar({ value = 0 }: { value: number }) {
  const colors = theme(useColorScheme());
  return (
    <View style={{ height: 10, backgroundColor: colors.border, borderRadius: 9999 }}>
      <View style={{
        width: `${Math.min(100, Math.max(0, value * 100))}%`,
        height: 10,
        backgroundColor: colors.primary,
        borderRadius: 9999,
      }}/>
    </View>
  );
}
