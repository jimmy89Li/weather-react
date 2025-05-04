export const isoToDate = (date: string): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GB').format(new Date(date));
};
