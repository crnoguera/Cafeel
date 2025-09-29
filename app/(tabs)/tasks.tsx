import FAB from '@/components/FAB';
import TaskItem from '@/components/TaskItem';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

export default function Tasks() {
  const { tasks, toggleTask, removeTask } = useStore();
  const colors = theme(useColorScheme());
  const [query, setQuery] = useState('');
  const [showDone, setShowDone] = useState(true);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tasks
      .filter(t => (showDone || !t.done))
      .filter(t => t.title.toLowerCase().includes(q) || (t.tag ?? '').toLowerCase().includes(q));
  }, [tasks, query, showDone]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Progreso de Tareas</Text>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <TextInput
            placeholder="Buscar por título o #tag"
            onChangeText={setQuery}
            style={{ flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, color: colors.text }}
          />
          <Text onPress={() => setShowDone(v => !v)} style={{ color: colors.primary, textAlignVertical: 'center' }}>
            {showDone ? 'Ocultar hechas' : 'Ver hechas'}
          </Text>
        </View>

        {filtered.map(t => (
          <TaskItem
            key={t.id}
            id={t.id}
            title={t.title}
            done={t.done}
            tag={t.tag}
            progress={t.progress}
            reminderAt={t.reminderAt}
            onToggle={toggleTask}
            onDelete={(id) => {
              Alert.alert('Eliminar', '¿Borrar esta tarea?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Borrar', style: 'destructive', onPress: () => removeTask(id) },
              ]);
            }}
            onOpen={(id) => router.push(`/task/${id}`)}
          />
        ))}

        {filtered.length === 0 && <Text style={{ color: colors.subtext }}>No hay tareas que coincidan.</Text>}
      </ScrollView>

      <FAB onPress={() => router.push('/task/new')} />
    </View>
  );
}
