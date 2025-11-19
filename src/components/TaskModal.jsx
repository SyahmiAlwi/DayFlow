import { useEffect, useState } from 'react';
import { getTodayKey } from '../utils/date';

const defaultTask = {
  title: '',
  description: '',
  tag: 'Focus',
  hour: 9,
  minute: 0,
  color: '#AAC8FF',
  category: 'Work',
  repeat: 'none'
};

const categoryColors = {
  Work: '#AAC8FF',
  Study: '#D9C7FF',
  Health: '#C9BFF3',
  Personal: '#FFF7EB'
};

export function TaskModal({ open, onClose, onSave, task }) {
  const [draft, setDraft] = useState({ ...defaultTask, date: getTodayKey() });

  useEffect(() => {
    if (open) {
      setDraft({ ...defaultTask, ...task, categoryColor: categoryColors[task?.category] || categoryColors.Work });
    }
  }, [open, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...draft,
      color: draft.color || categoryColors[draft.category],
      categoryColor: categoryColors[draft.category],
      minute: Number(draft.minute) || 0,
      hour: Number(draft.hour)
    };
    onSave(payload);
  color: '#AAC8FF'
};

export function TaskModal({ open, onClose, onSave }) {
  const [task, setTask] = useState(defaultTask);

  useEffect(() => {
    if (open) {
      setTask(defaultTask);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 z-50">
      <div className="card w-full h-full sm:h-auto sm:max-w-md p-6 rounded-none sm:rounded-card overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{task ? 'Edit task' : 'Add task'}</h3>
          <div className="flex items-center gap-2">
            {task && (
              <button
                type="button"
                onClick={() => onSave(draft)}
                className="pill bg-white/70 text-slate-700"
              >
                Edit
              </button>
            )}
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700" aria-label="Close">
              ✕
            </button>
          </div>
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Add task</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700" aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Title</label>
            <input
              required
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Design standup"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Description</label>
            <textarea
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Share progress and blockers"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-slate-600">Hour</label>
              <select
                className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                value={draft.hour}
                onChange={(e) => setDraft({ ...draft, hour: Number(e.target.value) })}
                className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                value={task.hour}
                onChange={(e) => setTask({ ...task, hour: Number(e.target.value) })}
              >
                {Array.from({ length: 16 }, (_, idx) => 7 + idx).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-600">Minutes</label>
              <select
                className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                value={draft.minute}
                onChange={(e) => setDraft({ ...draft, minute: Number(e.target.value) })}
              >
                {[0, 15, 30, 45].map((min) => (
                  <option key={min} value={min}>
                    {min.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(categoryColors).map(([name, color]) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setDraft({ ...draft, category: name, categoryColor: color })}
                  className={`flex items-center gap-2 rounded-card border px-3 py-3 text-left ${
                    draft.category === name ? 'border-slate-700 bg-white' : 'border-white/60 bg-white/60'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="text-sm text-slate-800">{name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Repeat</label>
            <select
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={draft.repeat}
              onChange={(e) => setDraft({ ...draft, repeat: e.target.value })}
            >
              <option value="none">No repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="weekdays">Weekdays</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Accent color</label>
            <div className="flex items-center gap-3">
              {['#AAC8FF', '#D9C7FF', '#FFF7EB', '#C9BFF3'].map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setDraft({ ...draft, color })}
                  className={`w-10 h-10 rounded-card border ${draft.color === color ? 'border-slate-700' : 'border-white/60'}`}
              <label className="text-sm text-slate-600">Tag</label>
              <input
                className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                value={task.tag}
                onChange={(e) => setTask({ ...task, tag: e.target.value })}
                placeholder="Focus"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Accent color</label>
            <div className="flex items-center gap-3">
              {['#AAC8FF', '#D9C7FF', '#FFF7EB', '#86efac'].map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setTask({ ...task, color })}
                  className={`w-10 h-10 rounded-card border ${task.color === color ? 'border-slate-700' : 'border-white/60'}`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="pill bg-white/70 text-slate-700">
              Cancel
            </button>
            <button type="submit" className="pill bg-pastelBlue text-slate-900 shadow-soft">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
