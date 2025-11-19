import { useRef } from 'react';

export function TaskCard({ task, onDelete, onPointerDragStart, onLongPress }) {
  const pressTimer = useRef(null);

  const handlePointerDown = (e) => {
    pressTimer.current = setTimeout(() => {
      onLongPress?.(task);
    }, 500);
    onPointerDragStart?.(e, task);
  };

  const clearTimer = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <article
      className="card p-4 space-y-2 cursor-grab active:cursor-grabbing transition hover:-translate-y-0.5 border-l-4"
      style={{ borderColor: task.categoryColor || task.color || '#AAC8FF' }}
      onPointerDown={handlePointerDown}
      onPointerUp={clearTimer}
      onPointerCancel={clearTimer}
      onPointerLeave={clearTimer}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: task.categoryColor || task.color || '#AAC8FF' }}></div>
          <h3 className="font-semibold text-slate-900 truncate">{task.title}</h3>
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
      <div className="flex flex-wrap gap-2 items-center">
        {task.tag && <span className="pill bg-pastelLilac/60 text-slate-800">{task.tag}</span>}
        {task.category && <span className="text-xs text-slate-600">{task.category}</span>}
      </div>
    </article>
  );
}
