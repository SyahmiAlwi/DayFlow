import { useEffect, useState } from 'react';

const categories = [
  { label: 'Work', value: 'Work', color: '#AAC8FF' },
  { label: 'Study', value: 'Study', color: '#D9C7FF' },
  { label: 'Health', value: 'Health', color: '#C9BFF3' },
  { label: 'Personal', value: 'Personal', color: '#FFF7EB' }
];

const createTemplateTask = () => ({ title: '', hour: 9, minute: 0, category: 'Work', categoryColor: '#AAC8FF' });

const createDraft = () => ({ name: '', tasks: [createTemplateTask()] });

export function TemplateModal({ open, onClose, onSave, onDelete, template }) {
  const [draft, setDraft] = useState(createDraft());

  useEffect(() => {
    if (open) {
      setDraft(
        template
          ? {
              ...template,
              tasks: (template.tasks || []).map((task) => ({ ...createTemplateTask(), ...task }))
            }
          : createDraft()
      );
    }
  }, [open, template]);

  const addRow = () => setDraft((prev) => ({ ...prev, tasks: [...prev.tasks, createTemplateTask()] }));
  const updateRow = (idx, field, value) => {
    setDraft((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === idx ? { ...task, [field]: value } : task))
    }));
  };

  const removeRow = (idx) => {
    setDraft((prev) => {
      const remaining = prev.tasks.filter((_, i) => i !== idx);
      return { ...prev, tasks: remaining.length ? remaining : [createTemplateTask()] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  const handleDelete = async () => {
    if (!template) return;
    await onDelete?.(template.id);
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
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1.2fr_110px_80px_120px] gap-2 bg-white/70 rounded-card p-3">
                <input
                  className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                  value={row.title}
                  onChange={(e) => updateRow(idx, 'title', e.target.value)}
                  placeholder="Task name"
                  required
                />
                <select
                  className="rounded-card border border-white/60 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                  value={row.category}
                  onChange={(e) => {
                    const category = categories.find((c) => c.value === e.target.value);
                    updateRow(idx, 'category', e.target.value);
                    updateRow(idx, 'categoryColor', category?.color || '#AAC8FF');
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
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
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className="sm:col-span-4 text-left sm:text-right text-xs text-rose-600 hover:text-rose-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {template && (
              <button
                type="button"
                onClick={handleDelete}
                className="pill bg-rose-100 text-rose-700 hover:bg-rose-200 order-2 sm:order-1"
              >
                Delete template
              </button>
            )}
            <div className="flex justify-end gap-3 order-1 sm:order-2">
              <button type="button" onClick={onClose} className="pill bg-white/70 text-slate-700">
                Cancel
              </button>
              <button type="submit" className="pill bg-pastelBlue text-slate-900 shadow-soft">
                Save template
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
