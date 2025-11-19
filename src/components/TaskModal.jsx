import { useEffect, useState } from 'react';

const defaultTask = {
  title: '',
  description: '',
  tag: 'Focus',
  hour: 9,
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
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Design standup"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Description</label>
            <textarea
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
