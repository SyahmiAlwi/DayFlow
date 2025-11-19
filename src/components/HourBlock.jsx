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
    </div>
  );
}
