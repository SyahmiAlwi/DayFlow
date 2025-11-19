import { create } from 'zustand';
import {
  addTaskToDb,
  deleteTaskFromDb,
  getTasksForDate,
  updateTaskHourInDb
} from '../db';
import { getTodayKey } from '../utils/date';

export const useTasksStore = create((set, get) => ({
  selectedDate: getTodayKey(),
  tasks: [],
  loading: false,
  setDate: (date) => set({ selectedDate: date }),
  loadTasks: async (date = get().selectedDate) => {
    set({ loading: true });
    const tasks = await getTasksForDate(date);
    set({ tasks, selectedDate: date, loading: false });
  },
  addTask: async (task) => {
    const payload = { ...task, date: get().selectedDate };
    const newTask = await addTaskToDb(payload);
    set((state) => ({ tasks: [...state.tasks, newTask].sort((a, b) => a.hour - b.hour) }));
    return newTask;
  },
  deleteTask: async (id) => {
    await deleteTaskFromDb(id);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  moveTaskToHour: async (id, hour) => {
    await updateTaskHourInDb(id, hour);
    set((state) => ({
      tasks: state.tasks
        .map((task) => (task.id === id ? { ...task, hour } : task))
        .sort((a, b) => a.hour - b.hour)
    }));
  }
}));
