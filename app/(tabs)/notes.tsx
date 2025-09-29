import Card from '@/components/Card';
import FAB from '@/components/FAB';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

export default function Notes() {
  const colors = theme(useColorScheme());
  const { notes } = useStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return notes.filter(n => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  }, [notes, query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Notas</Text>

        <TextInput
          placeholder="Buscar nota…"
          onChangeText={setQuery}
          style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, color: colors.text, marginBottom: 12 }}
        />

        {filtered.map(n => (
          <Link key={n.id} href={`/note/${n.id}`} asChild>
            <Card style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 6 }}>{n.title}</Text>
              <Text numberOfLines={3} style={{ color: colors.subtext }}>{n.body}</Text>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && <Text style={{ color: colors.subtext }}>No hay notas que coincidan.</Text>}
      </ScrollView>

      <Link href="/note/new" asChild>
        <FAB onPress={() => {}} />
      </Link>
    </View>
  );
}
