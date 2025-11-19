import { create } from 'zustand';
import {
  addTaskToDb,
  deleteTaskFromDb,
  getTasksForDate,
  updateTaskInDb,
  applyTemplateToDate
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
    const newTasks = await addTaskToDb(payload);
    set((state) => ({
      tasks: [...state.tasks, ...newTasks.filter((t) => t.date === get().selectedDate)].sort(
        (a, b) => a.hour + (a.minute || 0) / 60 - (b.hour + (b.minute || 0) / 60)
      )
    }));
    return newTasks.find((t) => t.date === get().selectedDate) || newTasks[0];
    const newTask = await addTaskToDb(payload);
    set((state) => ({ tasks: [...state.tasks, newTask].sort((a, b) => a.hour - b.hour) }));
    return newTask;
  },
  deleteTask: async (id) => {
    await deleteTaskFromDb(id);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  moveTaskToSlot: async (id, hour, minute = 0) => {
    await updateTaskInDb(id, { hour, minute });
    set((state) => ({
      tasks: state.tasks
        .map((task) => (task.id === id ? { ...task, hour, minute } : task))
        .sort((a, b) => a.hour + (a.minute || 0) / 60 - (b.hour + (b.minute || 0) / 60))
    }));
  },
  updateTask: async (id, updates) => {
    await updateTaskInDb(id, updates);
    set((state) => ({
      tasks: state.tasks
        .map((task) => (task.id === id ? { ...task, ...updates } : task))
        .sort((a, b) => a.hour + (a.minute || 0) / 60 - (b.hour + (b.minute || 0) / 60))
    }));
  },
  applyTemplate: async (template) => {
    const date = get().selectedDate;
    const created = await applyTemplateToDate(template, date);
    set((state) => ({
      tasks: [...state.tasks, ...created].sort((a, b) => a.hour + (a.minute || 0) / 60 - (b.hour + (b.minute || 0) / 60))
  moveTaskToHour: async (id, hour) => {
    await updateTaskHourInDb(id, hour);
    set((state) => ({
      tasks: state.tasks
        .map((task) => (task.id === id ? { ...task, hour } : task))
        .sort((a, b) => a.hour - b.hour)
    }));
  }
}));
