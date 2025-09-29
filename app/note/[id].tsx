import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, TextInput, useColorScheme, View } from 'react-native';

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, updateNote } = useStore();
  const n = notes.find(x => x.id === id);
  const colors = theme(useColorScheme());
  if (!n) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 8 }}>{n.title}</Text>
        <TextInput
          multiline
          defaultValue={n.body}
          onChangeText={(text) => updateNote(n.id, { body: text })}
          style={{ minHeight: 180, color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, textAlignVertical: 'top' }}
        />
        <Pressable onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.primary }}>Guardar y cerrar</Text>
        </Pressable>
      </Card>
    </View>
  );
}
