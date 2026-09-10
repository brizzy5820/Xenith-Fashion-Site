export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type SessionType =
  | "lecture"
  | "practical"
  | "tutorial"
  | "examination"
  | "event";

export type PeriodKind = "class" | "break";

/** A slot on the shared time axis. Breaks are periods with kind === "break". */
export interface TimePeriod {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  kind: PeriodKind;
}

/** One subject occupying a single day × period cell. */
export interface TimetableEntry {
  id: string;
  day: DayOfWeek;
  periodId: string;
  subjectId: string;
  subject: string;
  code: string;
  teacher: string;
  room: string;
  type: SessionType;
}

export interface TimetableState {
  periods: TimePeriod[];
  entries: TimetableEntry[];
}

export const cellKey = (day: DayOfWeek, periodId: string) =>
  `${day}__${periodId}`;

const dayNames: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

/** True when an entry is happening right now (today's weekday, within its period). */
export function isEntryLive(
  entry: TimetableEntry,
  periods: TimePeriod[],
  now: Date,
): boolean {
  const today = dayNames[now.getDay()];
  if (today !== entry.day) return false;

  const period = periods.find((item) => item.id === entry.periodId);
  if (!period || period.kind !== "class") return false;

  const current = now.getHours() * 60 + now.getMinutes();
  return current >= toMinutes(period.startTime) && current <= toMinutes(period.endTime);
}
