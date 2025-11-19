import Dexie from 'dexie';

export const db = new Dexie('dayflow');

db.version(1).stores({
  tasks: '++id,date,hour,order'
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
  return db.tasks.where({ date }).sortBy('hour');
};

export const addTaskToDb = async (task) => {
  const id = await db.tasks.add(task);
  return { ...task, id };
};

export const deleteTaskFromDb = async (id) => {
  await db.tasks.delete(id);
};

export const updateTaskHourInDb = async (id, hour) => {
  await db.tasks.update(id, { hour });
};
