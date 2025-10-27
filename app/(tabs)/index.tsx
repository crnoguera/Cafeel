import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import TagPill from '@/components/TagPill';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';

export default function Home() {
  const colors = theme(useColorScheme());
  const { tasks, notes } = useStore();
  const progress = tasks.length ? tasks.reduce((a, t) => a + (t.progress ?? (t.done ? 1 : 0)), 0) / tasks.length : 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      {/* Header */}
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 12 }}>
        Inicia tu día, sé productivo!
      </Text>
      <Text style={{ color: colors.subtext, marginBottom: 12 }}>
  {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
</Text>


      {/* Tarjeta: Progreso general */}
      <Card style={{ marginBottom: 12 }}>
        <Text style={{ color: colors.subtext, marginBottom: 6 }}>Este es tu progreso</Text>
        <ProgressBar value={progress} />
        <Text style={{ marginTop: 8, color: colors.text }}>{Math.round(progress * 100)}%</Text>
      </Card>

      {/* Hoy / Recordatorios rápidos */}
      <Card style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 }}>Tareas de hoy</Text>
        {tasks.slice(0, 3).map(t => (
          <View key={t.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: colors.text }}>{t.title}</Text>
            {t.tag ? <TagPill label={t.tag} /> : <View />}
          </View>
        ))}
        <Link href="/(tabs)/tasks" asChild>
          <Pressable><Text style={{ color: colors.primary, marginTop: 6 }}>Ver más</Text></Pressable>
        </Link>
      </Card>

      {/* Notas */}
      <Card>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 }}>Mis notas</Text>
        {notes.slice(0, 2).map(n => (
          <Link key={n.id} href={`/note/${n.id}`} asChild>
            <Pressable style={{ paddingVertical: 6 }}>
              <Text style={{ color: colors.text, fontWeight: '600' }}>{n.title}</Text>
              <Text numberOfLines={2} style={{ color: colors.subtext }}>{n.body}</Text>
            </Pressable>
          </Link>
        ))}
        <Link href="/(tabs)/notes" asChild>
          <Pressable><Text style={{ color: colors.primary, marginTop: 6 }}>Ver todas</Text></Pressable>
        </Link>
      </Card>
    </ScrollView>
  );
}
