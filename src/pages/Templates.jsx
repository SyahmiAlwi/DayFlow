import { useEffect, useState } from 'react';
import { TemplateModal } from '../components/TemplateModal';
import { useTasksStore } from '../state/useTasksStore';
import { useTemplatesStore } from '../state/useTemplatesStore';
import { formatTime } from '../utils/date';

export function Templates() {
  const { applyTemplate } = useTasksStore();
  const { templates, loadTemplates, addTemplate, updateTemplate, duplicateTemplate } = useTemplatesStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleSave = async (template) => {
    if (editing) {
      await updateTemplate(editing.id, template);
    } else {
      await addTemplate(template);
    }
  };

  const handleApply = async (template) => {
    await applyTemplate(template);
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="card p-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Templates</h2>
          <p className="text-sm text-slate-600">Save routines you revisit often and drop them into your day.</p>
        </div>
        <button className="pill bg-pastelLilac text-slate-900 shadow-soft" onClick={() => setOpen(true)}>
          + New Template
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="card p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
              <div className="flex gap-2">
                <button className="pill bg-white/80 text-slate-800 text-xs" onClick={() => handleApply(template)}>
                  Apply Template
                </button>
                <button className="pill bg-white/60 text-slate-700 text-xs" onClick={() => duplicateTemplate(template)}>
                  Duplicate
                </button>
                <button className="pill bg-white/60 text-slate-700 text-xs" onClick={() => { setEditing(template); setOpen(true); }}>
                  Edit
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {(template.tasks || []).map((task, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: task.categoryColor || '#AAC8FF' }}></span>
                  <span>{task.title}</span>
                  <span className="text-xs text-slate-500">{formatTime(task.hour, task.minute || 0)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-20 right-4 pill bg-pastelBlue text-slate-900 shadow-soft sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Add Template"
      >
        +
      </button>
      <TemplateModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSave={handleSave} template={editing} />
    </div>
  );
}
