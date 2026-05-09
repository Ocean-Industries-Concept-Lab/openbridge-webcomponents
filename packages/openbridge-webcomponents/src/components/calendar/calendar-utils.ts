import {DateItemEvent, EventItemType} from '../event-item/event-item.js';

export type {DateItemEvent};
export {EventItemType};

export enum CalendarType {
  Small = 'small',
  Regular = 'regular',
  Large = 'large',
  XLarge = 'xlarge',
}

export interface CalendarEvent extends DateItemEvent {
  date: Date;
}

export interface DateCellInfo {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: DateItemEvent[];
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function groupEventsByDate(
  events: CalendarEvent[]
): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = toDateKey(event.date);
    let group = map.get(key);
    if (!group) {
      group = [];
      map.set(key, group);
    }
    group.push(event);
  }
  map.forEach((group) => {
    group.sort((a, b) => a.startTime.localeCompare(b.startTime));
  });
  return map;
}

export function getMonthYearLabel(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getWeekdayNames(locale?: string, firstDayOfWeek = 1): string[] {
  const baseDate = new Date(2024, 0, 7); // Sunday 2024-01-07
  const formatter = new Intl.DateTimeFormat(locale, {weekday: 'short'});
  const names: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const formatted = formatter.format(d);
    names.push(formatted.slice(0, 2));
  }
  const rotated = [
    ...names.slice(firstDayOfWeek),
    ...names.slice(0, firstDayOfWeek),
  ];
  return rotated;
}

export function getMonthGrid(
  year: number,
  month: number,
  firstDayOfWeek = 1,
  events?: CalendarEvent[],
  today?: Date
): DateCellInfo[][] {
  const actualToday = today ?? new Date();
  const eventMap = events
    ? groupEventsByDate(events)
    : new Map<string, CalendarEvent[]>();

  const firstOfMonth = new Date(year, month, 1);
  const rawDay = firstOfMonth.getDay();
  const offset = (rawDay - firstDayOfWeek + 7) % 7;

  const startDate = new Date(year, month, 1 - offset);

  const grid: DateCellInfo[][] = [];
  for (let row = 0; row < 6; row++) {
    const week: DateCellInfo[] = [];
    for (let col = 0; col < 7; col++) {
      const cellDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + row * 7 + col
      );
      const key = toDateKey(cellDate);
      const matchedEvents = eventMap.get(key) ?? [];
      week.push({
        date: cellDate,
        dayNumber: cellDate.getDate(),
        isCurrentMonth:
          cellDate.getMonth() === month && cellDate.getFullYear() === year,
        isToday: isSameDay(cellDate, actualToday),
        events: matchedEvents,
      });
    }
    grid.push(week);
  }

  return grid;
}
