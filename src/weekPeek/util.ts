import { dateService } from '../service/date-service';
import { Day, User } from './types';

export type ClientDay = [number, Day | undefined];
export type ClientWeek = ClientDay[];

export function getWeek(user: User, now: Date) {
  const sun = dateService.getStartOfWeek(now);
  const sat = dateService.getEndOfWeek(now);

  const newWeek: ClientWeek = Array.from({
    length: 7,
  });

  newWeek.forEach((d, i) => {
    const dateCopy = new Date(sun);
    const newDate = dateCopy.setDate(sun.getDate() + i);
    if (!d) {
      newWeek[i] = [newDate, undefined];
    }
  });

  Object.entries(user.days).forEach((d) => {
    const [date, meals] = d;
    const numDate = parseInt(date);

    if (numDate < sun.getTime() || numDate > sat.getTime()) {
      return;
    }

    newWeek.forEach(([nwDate, _]) => {
      if (isDay(numDate, nwDate)) {
        const i = newWeek.findIndex((c) => c[0] === nwDate);
        newWeek[i] = [nwDate, meals];
      }
    });
  });

  console.log({ newWeek });

  return newWeek;
}

function isDay(eventDate: number, day: number) {
  const sod = new Date(new Date(day).setHours(0, 0, 0, 0));
  const eod = new Date(sod);
  eod.setDate(sod.getDate() + 1);
  return eventDate >= sod.getTime() && eventDate < eod.getTime();
}
