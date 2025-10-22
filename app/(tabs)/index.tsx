import { router } from 'expo-router';
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={PALETTE.bg}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Cafeel</Text>
        <Text style={styles.subtitle}>
          Organiza tus tareas y notas en un solo lugar ☕
        </Text>

        <Pressable
          onPress={() => router.replace('/(tabs)')}
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.9, transform: [{ translateY: 1 }] },
          ]}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </Pressable>

        <Text style={styles.footer}>v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const PALETTE = {
  // Verde claro pastel
  bg: '#F1FBF5',        // fondo suave
  primary: '#86EFAC',   // botón/acentos
  primaryText: '#065F46',
  text: '#0F172A',
  subtext: '#64748B',
  shadow: 'rgba(0,0,0,0.08)',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PALETTE.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: PALETTE.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: PALETTE.subtext,
    textAlign: 'center',
    maxWidth: 380,
    lineHeight: 22,
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: PALETTE.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    shadowColor: PALETTE.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: PALETTE.primaryText,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    color: PALETTE.subtext,
    fontSize: 12,
  },
});
