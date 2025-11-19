import { useEffect, useState } from 'react';

const defaultTemplateTask = { title: '', hour: 9, minute: 0, category: 'Work', categoryColor: '#AAC8FF' };

export function TemplateModal({ open, onClose, onSave, template }) {
  const [draft, setDraft] = useState({ name: '', tasks: [defaultTemplateTask] });

  useEffect(() => {
    if (open) {
      setDraft(template || { name: '', tasks: [defaultTemplateTask] });
    }
  }, [open, template]);

  const addRow = () => setDraft((prev) => ({ ...prev, tasks: [...prev.tasks, defaultTemplateTask] }));
  const updateRow = (idx, field, value) => {
    setDraft((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === idx ? { ...task, [field]: value } : task))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 z-50">
      <div className="card w-full h-full sm:h-auto sm:max-w-lg p-6 rounded-none sm:rounded-card overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{template ? 'Edit template' : 'New template'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700" aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Name</label>
            <input
              required
              className="w-full rounded-card border border-white/60 bg-white/80 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700">Tasks</h4>
              <button type="button" onClick={addRow} className="pill bg-pastelLilac text-slate-900 shadow-soft text-xs">
                + Add task
              </button>
            </div>
            {draft.tasks.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_90px_80px] gap-2 bg-white/70 rounded-card p-3">
                <input
                  className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                  value={row.title}
                  onChange={(e) => updateRow(idx, 'title', e.target.value)}
                  placeholder="Task name"
                  required
                />
                <select
                  className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                  value={row.hour}
                  onChange={(e) => updateRow(idx, 'hour', Number(e.target.value))}
                >
                  {Array.from({ length: 16 }, (_, i) => 7 + i).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                  value={row.minute || 0}
                  onChange={(e) => updateRow(idx, 'minute', Number(e.target.value))}
                >
                  {[0, 15, 30, 45].map((min) => (
                    <option key={min} value={min}>
                      {min.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="pill bg-white/70 text-slate-700">
              Cancel
            </button>
            <button type="submit" className="pill bg-pastelBlue text-slate-900 shadow-soft">
              Save template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
