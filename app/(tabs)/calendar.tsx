import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { useMemo, useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`; // YYYY-MM-DD
}

export default function CalendarTab() {
  const colors = theme(useColorScheme());
  const tasks = useStore((s) => s.tasks);
  const [selected, setSelected] = useState(isoDate(new Date()));

  const marked = useMemo(() => {
    const marks: Record<string, any> = {};
    tasks.forEach(t => {
      if (!t.reminderAt) return;
      const key = isoDate(new Date(t.reminderAt));
      marks[key] = { ...(marks[key] ?? {}), marked: true, dots: [{ color: colors.primary }] };
    });
    // resaltar seleccionado
    marks[selected] = { ...(marks[selected] ?? {}), selected: true, selectedColor: colors.primary };
    return marks;
  }, [tasks, selected]);

  const dayTasks = useMemo(() => {
    return tasks
      .filter(t => t.reminderAt && isoDate(new Date(t.reminderAt)) === selected)
      .sort((a,b) => new Date(a.reminderAt!).getTime() - new Date(b.reminderAt!).getTime());
  }, [tasks, selected]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 }}>Calendario</Text>

      <Calendar
        onDayPress={(d) => setSelected(d.dateString)}
        markedDates={marked}
        theme={{
          backgroundColor: colors.bg,
          calendarBackground: colors.card,
          dayTextColor: colors.text,
          monthTextColor: colors.text,
          textDisabledColor: colors.subtext,
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: '#fff',
          arrowColor: colors.primary,
        }}
        style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}
      />

      <Card>
        <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 8 }}>
          {new Date(selected).toLocaleDateString()}
        </Text>
        {dayTasks.length === 0 && <Text style={{ color: colors.subtext }}>Sin recordatorios.</Text>}
        {dayTasks.map((t, i) => {
          const d = new Date(t.reminderAt!);
          return (
            <View key={t.id} style={{ paddingVertical: 10, borderBottomWidth: i === dayTasks.length - 1 ? 0 : 1, borderBottomColor: colors.border }}>
              <Text style={{ color: colors.subtext }}>{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              <Text style={{ color: colors.text, fontWeight: '600' }}>{t.title}</Text>
              {!!t.tag && <Text style={{ color: colors.subtext }}>{t.tag}</Text>}
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}
