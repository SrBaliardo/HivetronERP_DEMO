export function formatTimeInput(value) {
  let cleanedValue = value.replace(/\D/g, '').slice(0, 6);

  cleanedValue = cleanedValue.padStart(6, '0');

  const hours = cleanedValue.slice(0, 2);
  const minutes = cleanedValue.slice(2, 4);
  const seconds = cleanedValue.slice(4, 6);

  return `${hours}:${minutes}:${seconds}`;
}

export function convertTimeToSeconds(formattedTime) {
  const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function convertSecondsToTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
}
