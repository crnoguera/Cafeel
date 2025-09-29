import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { cancelReminder, scheduleReminder } from '@/lib/notifications';
import { useStore } from '@/lib/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput, useColorScheme, View } from 'react-native';

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, removeTask } = useStore();
  const task = useMemo(() => tasks.find(x => x.id === id), [tasks, id]);
  const colors = theme(useColorScheme());

  const [title, setTitle] = useState(task?.title ?? '');
  const [tag, setTag] = useState(task?.tag ?? '');
  const [progress, setProgress] = useState(task?.progress ?? (task?.done ? 1 : 0));
  const [dt, setDt] = useState<Date | undefined>(task?.reminderAt ? new Date(task.reminderAt) : undefined);
  const [showPicker, setShowPicker] = useState(false);

  if (!task) return null;

  async function save() {
    updateTask(task.id, { title: title.trim(), tag: tag.trim() || undefined, progress });
    if (dt) {
      // reprogramar
      if (task.reminderId) await cancelReminder(task.reminderId);
      const idNotif = await scheduleReminder(`Recordatorio: ${title || task.title}`, dt, 'Revisa tu tarea');
      updateTask(task.id, { reminderAt: dt.toISOString(), reminderId: idNotif });
    }
    router.back();
  }

  async function clearReminder() {
    if (task.reminderId) await cancelReminder(task.reminderId);
    updateTask(task.id, { reminderAt: undefined, reminderId: undefined });
    setDt(undefined);
  }

  function askDelete() {
    Alert.alert('Eliminar', '¿Borrar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: () => { removeTask(task.id); router.back(); } },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Editar tarea</Text>

        <Text style={{ color: colors.subtext }}>Título</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Título" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, marginBottom: 10 }} />

        <Text style={{ color: colors.subtext }}>Etiqueta</Text>
        <TextInput value={tag} onChangeText={setTag} placeholder="#work" style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, color: colors.text, marginBottom: 10 }} />

        <Text style={{ color: colors.subtext, marginBottom: 4 }}>Progreso: {Math.round((progress ?? 0) * 100)}%</Text>
        <Slider
          value={progress ?? 0}
          onValueChange={setProgress}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
        />

        <View style={{ height: 12 }} />

        <Text style={{ color: colors.subtext, marginBottom: 6 }}>Recordatorio</Text>
        {dt ? (
          <Text style={{ color: colors.text, marginBottom: 6 }}>🔔 {dt.toLocaleString()}</Text>
        ) : (
          <Text style={{ color: colors.subtext, marginBottom: 6 }}>Sin recordatorio</Text>
        )}

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={() => setShowPicker(true)} style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 12 }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>{dt ? 'Cambiar fecha' : 'Agregar fecha'}</Text>
          </Pressable>
          {dt && (
            <Pressable onPress={clearReminder} style={{ backgroundColor: colors.border, padding: 12, borderRadius: 12 }}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>Quitar</Text>
            </Pressable>
          )}
        </View>

        {showPicker && (
          <DateTimePicker
            value={dt ?? new Date()}
            onChange={(e, d) => { setShowPicker(false); if (d) setDt(d); }}
            mode="datetime"
          />
        )}

        <View style={{ height: 16 }} />

        <Pressable onPress={save} style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Guardar</Text>
        </Pressable>

        <Pressable onPress={askDelete} style={{ padding: 14, borderRadius: 12, marginTop: 8 }}>
          <Text style={{ color: colors.danger, textAlign: 'center', fontWeight: '700' }}>Eliminar tarea</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={{ padding: 14, borderRadius: 12 }}>
          <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>Cerrar</Text>
        </Pressable>
      </Card>
    </View>
  );
}
