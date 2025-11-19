import { useEffect, useState } from 'react';
import { Timeline } from '../components/Timeline';
import { TaskModal } from '../components/TaskModal';
import { useTasksStore } from '../state/useTasksStore';
import { getTodayKey } from '../utils/date';

export function Today() {
  const { tasks, loadTasks, addTask, deleteTask, moveTaskToHour, selectedDate, setDate, loading } = useTasksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTasks(getTodayKey());
  }, [loadTasks]);

  const handleDrop = (taskId, hour) => {
    moveTaskToHour(taskId, hour);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task-id', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleAddTask = async (task) => {
    await addTask(task);
  };

  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    await loadTasks(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="card p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-600">Plan your day with calm confidence.</p>
          <h2 className="text-2xl font-semibold text-slate-900">Today&apos;s Flow</h2>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
          />
          <button onClick={() => setIsModalOpen(true)} className="pill bg-pastelLilac text-slate-900 shadow-soft">
            + New Task
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
            {loading && <span className="text-sm text-slate-500">Syncing tasks…</span>}
          </div>
          <Timeline
            tasks={tasks}
            onTaskDrop={handleDrop}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
          />
        </section>

        <aside className="space-y-3">
          <div className="card p-4 space-y-3">
            <h4 className="text-lg font-semibold text-slate-900">Notes</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              DayFlow keeps working even when you go offline. Tasks are stored locally with IndexedDB and sync instantly when
              you return.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="pill bg-pastelBlue/60 text-slate-900">Offline-first</span>
              <span className="pill bg-pastelLilac/60 text-slate-900">Drag & drop</span>
              <span className="pill bg-white/80 text-slate-800">Auto updates</span>
            </div>
          </div>
          <div className="card p-4 space-y-3 bg-gradient-to-br from-pastelBlue/40 to-pastelLilac/40">
            <h4 className="text-lg font-semibold text-slate-900">Quick tips</h4>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              <li>Drag tasks between hours to reshuffle your day.</li>
              <li>Use Templates to save routines you repeat.</li>
              <li>DayFlow auto-updates when a new version ships.</li>
            </ul>
          </div>
        </aside>
      </div>

      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />
    </div>
  );
}
