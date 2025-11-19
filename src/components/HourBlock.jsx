import { formatHour } from '../utils/date';

export function HourBlock({ hour, isDropTarget, refCallback, children }) {
  return (
    <div
      ref={refCallback}
      data-hour={hour}
      className={`card p-4 space-y-3 transition border-dashed min-h-[44px] ${
        isDropTarget ? 'border-pastelBlue bg-pastelBlue/10' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700">{formatHour(hour)}</h4>
      </div>
      <div className="space-y-3">{children}</div>
import { useState } from 'react';
import { formatHour } from '../utils/date';
import { TaskCard } from './TaskCard';

export function HourBlock({ hour, tasks = [], onTaskDrop, onDeleteTask, onDragStart }) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData('task-id'));
    if (taskId) {
      onTaskDrop(taskId, hour);
    }
    setIsOver(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className={`card p-4 space-y-3 transition border-dashed ${isOver ? 'border-pastelBlue bg-pastelBlue/10' : 'border-transparent'}`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700">{formatHour(hour)}</h4>
        <span className="text-xs text-slate-500">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 && <p className="text-xs text-slate-500">Drop a task here</p>}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
}
