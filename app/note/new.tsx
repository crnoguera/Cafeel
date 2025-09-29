import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { router } from 'expo-router';
import { Alert, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';

export default function NewNote() {
  const colors = theme(useColorScheme());
  const addNote = useStore((s) => s.addNote);

  let title = '';
  let body = '';

  function save() {
    if (!title.trim()) return Alert.alert('Título requerido', 'Escribe un título para la nota.');
    addNote({ title: title.trim(), body: body.trim(), pinned: false, date: new Date().toISOString() } as any);
    router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Nueva nota</Text>
        <Text style={{ color: colors.subtext }}>Título</Text>
        <TextInput onChangeText={(v) => (title = v)} placeholder="Ej. Ideas de contenido" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, marginBottom: 10 }} />
        <Text style={{ color: colors.subtext }}>Contenido</Text>
        <TextInput multiline onChangeText={(v) => (body = v)} placeholder="Escribe aquí…" style={{ minHeight: 160, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, textAlignVertical: 'top' }} />
        <Pressable onPress={save} style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 12, marginTop: 16 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Guardar</Text>
        </Pressable>
      </Card>
    </View>
  );
}
