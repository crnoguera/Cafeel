import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function initNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Recordatorios',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export async function scheduleReminder(title: string, when: Date, body?: string) {
  const id = await Notifications.scheduleNotificationAsync({
    content: { title, body: body ?? '¡Tienes una tarea!', sound: 'default' },
    trigger: { date: when, channelId: 'reminders' },
  });
  return id;
}

export async function cancelReminder(id: string) {
  try { await Notifications.cancelScheduledNotificationAsync(id); } catch {}
}
