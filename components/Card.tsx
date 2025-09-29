import { theme } from '@/constants/theme';
import { useColorScheme, View, ViewProps } from 'react-native';

export default function Card({ style, ...rest }: ViewProps) {
  const colors = theme(useColorScheme());
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          padding: colors.spacing(4),
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      {...rest}
    />
  );
}
