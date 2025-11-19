import { useEffect, useMemo, useRef, useState } from 'react';
import { HourBlock } from './HourBlock';
import { TaskCard } from './TaskCard';

const HOURS = Array.from({ length: 14 }, (_, idx) => 7 + idx);

export function Timeline({ tasks = [], onTaskDrop, onDeleteTask, onPointerDragStart, onLongPress }) {
  const [dragging, setDragging] = useState(null);
  const [ghost, setGhost] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const hourRefs = useRef(new Map());

  const tasksByHour = useMemo(() => {
    return HOURS.map((hour) => ({
      hour,
      tasks: tasks
        .filter((task) => task.hour === hour)
        .sort((a, b) => a.hour + (a.minute || 0) / 60 - (b.hour + (b.minute || 0) / 60))
    }));
  }, [tasks]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging) return;
      setGhost({ x: e.clientX, y: e.clientY, task: dragging.task });
      const target = getTargetHour(e.clientX, e.clientY);
      setDropTarget(target);
    };

    const handleUp = () => {
      if (dragging && dropTarget) {
        onTaskDrop?.(dragging.task.id, dropTarget.hour, dropTarget.minute);
      }
      setDragging(null);
      setGhost(null);
      setDropTarget(null);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    if (dragging) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    }

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragging, dropTarget, onTaskDrop]);

  const getTargetHour = (x, y) => {
    for (const [hour, ref] of hourRefs.current.entries()) {
      if (!ref) continue;
      const rect = ref.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        const offsetY = y - rect.top;
        const fraction = Math.min(1, Math.max(0, offsetY / rect.height));
        const snap = Math.round((fraction * 60) / 15) * 15;
        const minute = Math.min(45, Math.max(0, snap));
        return { hour, minute };
      }
    }
    return null;
  };

  const startDrag = (event, task) => {
    event.preventDefault();
    setDragging({ task });
    setGhost({ x: event.clientX, y: event.clientY, task });
  };

  return (
    <div className="grid gap-3 relative">
      {tasksByHour.map(({ hour, tasks: hourTasks }) => (
        <HourBlock
          key={hour}
          hour={hour}
          refCallback={(el) => hourRefs.current.set(hour, el)}
          isDropTarget={dropTarget?.hour === hour}
        >
          {hourTasks.length === 0 && <p className="text-xs text-slate-500">Drop a task here</p>}
          {hourTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onPointerDragStart={(e) => {
                startDrag(e, task);
                onPointerDragStart?.(e, task);
              }}
              onLongPress={onLongPress}
            />
          ))}
        </HourBlock>
      ))}
      {ghost && (
        <div
          className="pointer-events-none fixed z-50 w-56"
          style={{ transform: `translate(${ghost.x + 10}px, ${ghost.y + 10}px)`, transition: 'transform 120ms ease' }}
        >
          <div className="card p-3 shadow-xl opacity-90">
            <p className="text-sm font-semibold text-slate-900 truncate">{ghost.task.title}</p>
            <p className="text-xs text-slate-600">Dragging…</p>
          </div>
        </div>
      )}
import { HourBlock } from './HourBlock';

const HOURS = Array.from({ length: 14 }, (_, idx) => 7 + idx);

export function Timeline({ tasks = [], onTaskDrop, onDeleteTask, onDragStart }) {
  return (
    <div className="grid gap-3">
      {HOURS.map((hour) => (
        <HourBlock
          key={hour}
          hour={hour}
          tasks={tasks.filter((task) => task.hour === hour)}
          onTaskDrop={onTaskDrop}
          onDeleteTask={onDeleteTask}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}
