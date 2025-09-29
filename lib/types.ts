export type Task = {
  id: string;
  title: string;
  done: boolean;
  tag?: string;          // #work, #stories
  progress?: number;     // 0..1
  reminderAt?: string;   // ISO string (cuando sonar la notificación)
  reminderId?: string;   // id devuelto por expo-notifications
  createdAt: string;     // ISO
};

export type Note = {
  id: string;
  title: string;
  body: string;
  pinned?: boolean;
  date?: string;         // ISO
  createdAt: string;     // ISO
};
