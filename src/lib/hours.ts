import { HOURS, type DayKey } from '../data';

const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY = 24 * 60;

/** A moment in the bar's week: day index (Mon = 0) and minutes after midnight, London time. */
export type Moment = { day: number; minutes: number };

export type Status =
  | {
      open: true;
      /** Index of the day whose session we're in (Tue 01:30 is still Monday's). */
      session: number;
      closesAt: number;
      afterMidnight: boolean;
      minutesLeft: number;
    }
  | {
      open: false;
      /** Index of the day the next session starts on. */
      session: number;
      opensAt: number;
      sameDay: boolean;
      minutesUntil: number;
    };

export function londonNow(date = new Date()): Moment {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = DAY_KEYS.indexOf(get('weekday').slice(0, 3).toLowerCase() as DayKey);
  return { day: day < 0 ? 0 : day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

/** Reads a demo override like `sat-23:30` or `tue-1:30`. */
export function parseAt(value: string | null | undefined): Moment | null {
  if (!value) return null;
  const m = value.trim().toLowerCase().match(/^(mon|tue|wed|thu|fri|sat|sun)[a-z]*[-_ ]?(\d{1,2})(?::?(\d{2}))?$/);
  if (!m) return null;
  const hour = Number(m[2]);
  const minute = Number(m[3] ?? 0);
  if (hour > 23 || minute > 59) return null;
  return { day: DAY_KEYS.indexOf(m[1] as DayKey), minutes: hour * 60 + minute };
}

export function statusAt({ day, minutes }: Moment): Status {
  // Still inside last night's session?
  const prev = (day + 6) % 7;
  const prevClose = HOURS[prev].close - DAY;
  if (prevClose > 0 && minutes < prevClose) {
    return { open: true, session: prev, closesAt: HOURS[prev].close, afterMidnight: true, minutesLeft: prevClose - minutes };
  }
  const today = HOURS[day];
  if (minutes >= today.open && minutes < today.close) {
    return { open: true, session: day, closesAt: today.close, afterMidnight: false, minutesLeft: today.close - minutes };
  }
  if (minutes < today.open) {
    return { open: false, session: day, opensAt: today.open, sameDay: true, minutesUntil: today.open - minutes };
  }
  const next = (day + 1) % 7;
  return { open: false, session: next, opensAt: HOURS[next].open, sameDay: false, minutesUntil: DAY - minutes + HOURS[next].open };
}

/** 960 -> "4pm", 720 -> "noon", 1560 -> "2am", 990 -> "4:30pm" */
export function clock(mins: number, { noon = true } = {}): string {
  const m = ((mins % DAY) + DAY) % DAY;
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (noon && h === 12 && min === 0) return 'noon';
  const suffix = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return min ? `${h12}:${String(min).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

/** 1560 -> "2" for "Open till 2 tonight" */
export function closingHour(mins: number) {
  const h = Math.floor((mins % DAY) / 60);
  return String(h % 12 === 0 ? 12 : h % 12);
}

export function headline(s: Status): string {
  if (s.open) return s.afterMidnight ? `Open till ${closingHour(s.closesAt)}` : `Open till ${closingHour(s.closesAt)} tonight`;
  return `Doors at ${clock(s.opensAt)}`;
}

function duration(n: number) {
  if (n < 60) return `${n} minute${n === 1 ? '' : 's'}`;
  if (n === 60) return 'an hour';
  const h = Math.floor(n / 60);
  const m = n % 60;
  return m ? `${h}h ${m}m` : `${h} hours`;
}

export function subline(s: Status, at: Moment): string {
  const day = HOURS[s.session];
  if (s.open) {
    if (s.minutesLeft <= 45) return `${day.label} night's last ${duration(s.minutesLeft)}.`;
    if (s.afterMidnight) return `Still ${day.label} night, technically.`;
    return `${day.label} · ${clock(day.open)} till ${clock(day.close)}`;
  }
  if (s.minutesUntil <= 90) return `In ${duration(s.minutesUntil)} · then till ${clock(day.close)}`;
  if (at.minutes < 6 * 60) return `Closed for now · ${day.label} ${clock(day.open)} till ${clock(day.close)}`;
  return `${day.label} · ${clock(day.open)} till ${clock(day.close)}`;
}

export function dayLabel(i: number) {
  return HOURS[i].label;
}

export function formatMoment({ day, minutes }: Moment) {
  return `${HOURS[day].label.slice(0, 3)} ${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
