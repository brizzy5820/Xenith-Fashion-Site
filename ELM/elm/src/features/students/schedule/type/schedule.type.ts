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
