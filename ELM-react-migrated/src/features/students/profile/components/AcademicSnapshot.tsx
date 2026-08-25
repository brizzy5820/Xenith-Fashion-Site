import {
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  Percent,
} from "lucide-react";

import { studentProfile } from "../data/studentProfile";

const snapshotItems = [
  {
    label: "Attendance",
    value: `${studentProfile.academic.attendance}%`,
    icon: Percent,
  },
  {
    label: "CGPA",
    value: studentProfile.academic.cgpa,
    icon: GraduationCap,
  },
  {
    label: "Current term",
    value: studentProfile.academic.currentTerm,
    icon: CalendarDays,
  },
  {
    label: "Enrollment",
    value:
      studentProfile.currentEnrollment.status === "enrolled"
        ? "Active"
        : "Required",
    icon: BookOpenCheck,
  },
];

export function AcademicSnapshot() {
  return (
    <section className="flex flex-wrap gap-3">
      {snapshotItems.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex min-w-[150px] flex-1 items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              {label}
            </p>
            <p className="mt-0.5 text-lg font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
