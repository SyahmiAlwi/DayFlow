export function TaskCard({ task, onDelete, onDragStart }) {
  return (
    <article
      className="card p-4 space-y-2 cursor-grab active:cursor-grabbing transition hover:-translate-y-0.5"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: task.color || '#AAC8FF' }}></span>
          <h3 className="font-semibold text-slate-900">{task.title}</h3>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-500 hover:text-slate-700 text-sm"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
      {task.description && <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>}
      {task.tag && <span className="pill bg-pastelLilac/60 text-slate-800">{task.tag}</span>}
    </article>
  );
}
