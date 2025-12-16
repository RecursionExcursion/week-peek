export const dateService = {
  getStartOfWeek(d: Date) {
    d = new Date(d);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  },

  getEndOfWeek(d: Date) {
    d = new Date(d);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    const diff = Math.abs(d.getDay() - 6);
    d.setDate(d.getDate() + diff);
    return d;
  },
};
