
const getTimeFromMins = (mins: number): string => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const getFormatDateByString = (string: string): string => new Date(string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const getFilmTime = (seconds: number | undefined): string => {
  if (seconds) {
    return new Date(Math.trunc(seconds) * 1000).toISOString().substring(11,19);
  }
  return '00:00';
};

export {getFilmTime, getTimeFromMins, getFormatDateByString};
