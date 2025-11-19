import { useEffect, useState } from 'react';
import { Timeline } from '../components/Timeline';
import { TaskModal } from '../components/TaskModal';
import { useTasksStore } from '../state/useTasksStore';
import { getTodayKey } from '../utils/date';

export function Today() {
  const { tasks, loadTasks, addTask, deleteTask, moveTaskToSlot, selectedDate, setDate, loading, updateTask } =
    useTasksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks(getTodayKey());
  }, [loadTasks]);

  const handleDrop = (taskId, hour, minute) => {
    moveTaskToSlot(taskId, hour, minute);
  };

  const handleAddTask = async (task) => {
    await addTask(task);
  };

  const handleUpdateTask = async (taskId, updates) => {
    await updateTask(taskId, updates);
  };

  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    await loadTasks(newDate);
  };

  const openNewTaskModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-5 pb-24">
      <div className="sticky top-0 z-30 -mx-4 px-4 pt-3 pb-4 bg-pastelCream/90 backdrop-blur flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600">Plan your day with calm confidence.</p>
          <h2 className="text-2xl font-semibold text-slate-900">Today&apos;s Flow</h2>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="flex-1 sm:flex-none rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
          />
          <button onClick={openNewTaskModal} className="pill bg-pastelLilac text-slate-900 shadow-soft min-w-[110px]">
            + New Task
          </button>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
          {loading && <span className="text-sm text-slate-500">Syncing tasks…</span>}
        </div>
        <Timeline
          tasks={tasks}
          onTaskDrop={handleDrop}
          onDeleteTask={deleteTask}
          onPointerDragStart={() => setEditingTask(null)}
          onLongPress={openEditModal}
        />
      </section>

      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingTask ? (task) => handleUpdateTask(editingTask.id, task) : handleAddTask}
        task={editingTask}
      />
    </div>
  );
}
