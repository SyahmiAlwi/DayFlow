import Dexie from 'dexie';

export const db = new Dexie('dayflow');

db.version(1).stores({
  tasks: '++id,date,hour,order'
});

db.version(2).stores({
  tasks: '++id,date,hour,order',
  templates: '++id,name'
});

db.on('populate', () => {
  const today = new Date().toISOString().split('T')[0];
  db.tasks.bulkAdd([
    {
      date: today,
      hour: 9,
      title: 'Welcome to DayFlow',
      description: 'Add tasks, drag them between hours, and stay productive offline.',
      tag: 'Getting Started',
      color: '#AAC8FF',
      order: 0
    }
  ]);
});

export const getTasksForDate = async (date) => {
  const tasks = await db.tasks.where({ date }).sortBy('hour');
  return tasks.sort((a, b) => (a.hour + (a.minute || 0) / 60) - (b.hour + (b.minute || 0) / 60));
};

export const addTaskToDb = async (task) => {
  const startDate = new Date(task.date);
  const occurrences = [];
  const repeat = task.repeat || 'none';

  const shouldIncludeDate = (date) => {
    if (repeat === 'daily') return true;
    if (repeat === 'weekly') return date.getDay() === startDate.getDay();
    if (repeat === 'weekdays') {
      const day = date.getDay();
      return day >= 1 && day <= 5;
    }
    return date.toISOString().split('T')[0] === task.date;
  };

  for (let i = 0; i < 30; i += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    if (repeat === 'none' && i > 0) break;
    if (!shouldIncludeDate(date)) continue;
    const dateKey = date.toISOString().split('T')[0];
    occurrences.push({ ...task, date: dateKey });
  }

  const ids = await db.tasks.bulkPut(occurrences, undefined, { allKeys: true });
  return occurrences.map((occurrence, idx) => ({ ...occurrence, id: ids[idx] }));
};

export const deleteTaskFromDb = async (id) => {
  await db.tasks.delete(id);
};

export const updateTaskHourInDb = async (id, hour) => {
  await db.tasks.update(id, { hour });
};

export const updateTaskInDb = async (id, updates) => {
  await db.tasks.update(id, updates);
};

// Templates
export const getTemplates = () => db.templates.toArray();

export const addTemplateToDb = async (template) => {
  const id = await db.templates.add(template);
  return { ...template, id };
};

export const updateTemplateInDb = async (id, updates) => {
  await db.templates.update(id, updates);
};

export const deleteTemplateInDb = async (id) => {
  await db.templates.delete(id);
};

export const applyTemplateToDate = async (template, date) => {
  const tasks = (template.tasks || []).map((task) => ({
    ...task,
    date,
    repeat: task.repeat || 'none'
  }));
  const ids = await db.tasks.bulkPut(tasks, undefined, { allKeys: true });
  return tasks.map((t, idx) => ({ ...t, id: ids[idx] }));
};
