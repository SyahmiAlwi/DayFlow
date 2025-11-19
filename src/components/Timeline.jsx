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
