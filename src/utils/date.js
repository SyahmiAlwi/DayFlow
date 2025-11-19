export const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const formatHour = (hour) => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
};

export const formatTime = (hour, minute = 0) => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  const paddedMinute = minute.toString().padStart(2, '0');
  return `${normalized}:${paddedMinute} ${suffix}`;
};
