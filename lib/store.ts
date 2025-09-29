import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Note, Task } from './types';

type State = {
  tasks: Task[];
  notes: Note[];
  addTask: (t: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addNote: (n: Omit<Note, 'id' | 'createdAt'>) => Note;
  updateNote: (id: string, patch: Partial<Note>) => void;
  removeNote: (id: string) => void;
  resetAll: () => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      tasks: [
        { id: '1', title: 'Seguimiento app', done: false, progress: 0.75, tag: '#work', createdAt: new Date().toISOString() },
        { id: '2', title: 'Tareas de la semana', done: false, progress: 0.2, createdAt: new Date().toISOString() },
      ],
      notes: [
        { id: 'n1', title: 'Mis notas', body: 'Notas importantes…', pinned: true, createdAt: new Date().toISOString() },
      ],
      addTask: (t) => {
        const task: Task = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...t };
        set((s) => ({ tasks: [task, ...s.tasks] }));
        return task;
      },
      updateTask: (id, patch) =>
        set((s) => ({ tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((x) => x.id !== id) })),
      toggleTask: (id) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done, progress: t.done ? 0 : 1 } : t)) })),
      addNote: (n) => {
        const note: Note = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...n };
        set((s) => ({ notes: [note, ...s.notes] }));
        return note;
      },
      updateNote: (id, patch) =>
        set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) })),
      removeNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
      resetAll: () => set({ tasks: [], notes: [] }),
    }),
    {
      name: 'todoapp',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ tasks: s.tasks, notes: s.notes }),
    }
  )
);
