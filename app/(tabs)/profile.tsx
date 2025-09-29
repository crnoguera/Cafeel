import { theme } from '@/constants/theme';
import { Text, useColorScheme, View } from 'react-native';

export default function Profile() {
  const colors = theme(useColorScheme());
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text }}>Perfil</Text>
    </View>
  );
}
