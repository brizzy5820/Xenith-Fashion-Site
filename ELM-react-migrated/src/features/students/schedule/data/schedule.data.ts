import { classes } from "@/features/students/classes/data/Classes";
import {
  DayOfWeek,
  SessionType,
  TimePeriod,
  TimetableEntry,
} from "@/features/students/schedule/type/schedule.type";

export const days: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export interface SubjectOption {
  id: string;
  subject: string;
  code: string;
  teacher: string;
  room: string;
}

/** The timetable relates to the same subjects used across the app. */
export const subjectCatalog: SubjectOption[] = classes.map((item) => ({
  id: item.id,
  subject: item.name,
  code: item.code,
  teacher: item.teacher,
  room: item.room,
}));

const subjectById = new Map(
  subjectCatalog.map((subject) => [subject.id, subject]),
);

export const defaultPeriods: TimePeriod[] = [
  { id: "p1", label: "Period 1", startTime: "08:00", endTime: "08:45", kind: "class" },
  { id: "p2", label: "Period 2", startTime: "08:45", endTime: "09:30", kind: "class" },
  { id: "short-break", label: "Short Break", startTime: "09:30", endTime: "09:45", kind: "break" },
  { id: "p3", label: "Period 3", startTime: "09:45", endTime: "10:30", kind: "class" },
  { id: "p4", label: "Period 4", startTime: "10:30", endTime: "11:15", kind: "class" },
  { id: "p5", label: "Period 5", startTime: "11:15", endTime: "12:00", kind: "class" },
  { id: "lunch", label: "Lunch", startTime: "12:00", endTime: "12:45", kind: "break" },
  { id: "p6", label: "Period 6", startTime: "12:45", endTime: "13:30", kind: "class" },
  { id: "p7", label: "Period 7", startTime: "13:30", endTime: "14:15", kind: "class" },
];

let seq = 0;

const entry = (
  day: DayOfWeek,
  periodId: string,
  subjectId: string,
  type: SessionType = "lecture",
): TimetableEntry => {
  const subject = subjectById.get(subjectId);

  if (!subject) {
    throw new Error(`Unknown subject id in timetable seed: ${subjectId}`);
  }

  seq += 1;

  return {
    id: `seed-${seq}`,
    day,
    periodId,
    subjectId: subject.id,
    subject: subject.subject,
    code: subject.code,
    teacher: subject.teacher,
    room: subject.room,
    type,
  };
};

export const defaultEntries: TimetableEntry[] = [
  // Monday
  entry("Monday", "p1", "mathematics"),
  entry("Monday", "p2", "english"),
  entry("Monday", "p3", "physics"),
  entry("Monday", "p4", "chemistry", "practical"),
  entry("Monday", "p5", "biology"),
  entry("Monday", "p6", "computer-science", "practical"),
  entry("Monday", "p7", "mathematics", "tutorial"),

  // Tuesday
  entry("Tuesday", "p1", "chemistry"),
  entry("Tuesday", "p2", "computer-science"),
  entry("Tuesday", "p3", "mathematics"),
  entry("Tuesday", "p4", "english"),
  entry("Tuesday", "p5", "physics", "practical"),
  entry("Tuesday", "p6", "biology"),

  // Wednesday
  entry("Wednesday", "p1", "biology"),
  entry("Wednesday", "p2", "physics"),
  entry("Wednesday", "p3", "english"),
  entry("Wednesday", "p4", "mathematics"),
  entry("Wednesday", "p5", "computer-science"),
  entry("Wednesday", "p6", "chemistry"),

  // Thursday
  entry("Thursday", "p1", "english"),
  entry("Thursday", "p2", "mathematics"),
  entry("Thursday", "p3", "chemistry", "practical"),
  entry("Thursday", "p4", "physics"),
  entry("Thursday", "p5", "biology", "practical"),
  entry("Thursday", "p7", "computer-science", "tutorial"),

  // Friday
  entry("Friday", "p1", "computer-science"),
  entry("Friday", "p2", "biology"),
  entry("Friday", "p3", "physics"),
  entry("Friday", "p4", "english", "tutorial"),
  entry("Friday", "p5", "mathematics"),
];
