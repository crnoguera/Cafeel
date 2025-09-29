import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { scheduleReminder } from '@/lib/notifications';
import { useStore } from '@/lib/store';
import { router } from 'expo-router';
import { Alert, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';

export default function NewTask() {
  const colors = theme(useColorScheme());
  const addTask = useStore((s) => s.addTask);
  const updateTask = useStore((s) => s.updateTask);

  let title = '';
  let tag = '';
  let minutes = '';

  async function save() {
    if (!title.trim()) return Alert.alert('Título requerido', 'Escribe un título para la tarea.');
    const t = addTask({ title: title.trim(), done: false, tag: tag.trim() || undefined, progress: 0, createdAt: new Date().toISOString() } as any);
    if (minutes && !isNaN(Number(minutes))) {
      const when = new Date(Date.now() + Number(minutes) * 60 * 1000);
      const id = await scheduleReminder(`Recordatorio: ${t.title}`, when, 'Revisa tu tarea');
      updateTask(t.id, { reminderAt: when.toISOString(), reminderId: id });
    }
    router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Nueva tarea</Text>
        <Text style={{ color: colors.subtext }}>Título</Text>
        <TextInput onChangeText={(v) => (title = v)} placeholder="Ej. Redactar informe" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, marginBottom: 10 }} />
        <Text style={{ color: colors.subtext }}>Etiqueta (opcional)</Text>
        <TextInput onChangeText={(v) => (tag = v)} placeholder="#work" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, marginBottom: 10 }} />
        <Text style={{ color: colors.subtext }}>Recordatorio en minutos (opcional)</Text>
        <TextInput keyboardType="numeric" onChangeText={(v) => (minutes = v)} placeholder="15" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text }} />
        <Pressable onPress={save} style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 12, marginTop: 16 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Guardar</Text>
        </Pressable>
      </Card>
    </View>
  );
}
