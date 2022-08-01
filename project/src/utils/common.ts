
const getTimeFromMins = (mins: number): string => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const getFormatDateByString = (string: string) => new Date(string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export {getTimeFromMins, getFormatDateByString};
