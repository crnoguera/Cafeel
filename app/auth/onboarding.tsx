import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { Pressable, Text, useColorScheme, View } from 'react-native';

export default function Onboarding() {
  const colors = theme(useColorScheme());
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'space-between' }}>
      <View>
        <Text style={{ fontSize: 28, fontWeight: '900', color: colors.text, marginBottom: 8 }}>Planeador de contenido</Text>
        <Text style={{ color: colors.subtext, fontSize: 16 }}>Empieza hoy. Sé organizado. Este es tu progreso.</Text>
      </View>
      <View style={{ gap: 12 }}>
        <Pressable onPress={() => router.push('/auth/register')} style={{ backgroundColor: colors.primary, padding: 16, borderRadius: 14 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Registrarse</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/auth/login')} style={{ padding: 16 }}>
          <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>Acceder</Text>
        </Pressable>
      </View>
    </View>
  );
}
