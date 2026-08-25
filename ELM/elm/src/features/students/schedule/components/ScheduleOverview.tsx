"use client";

import { Coffee } from "lucide-react";

import { SessionType } from "../type/schedule.type";
import { useTimetable } from "../data/TimetableProvider";
import { sessionTypeMeta } from "./ScheduleCard";

const legendOrder: SessionType[] = [
  "lecture",
  "practical",
  "tutorial",
  "examination",
  "event",
];

export default function ScheduleOverview() {
  const { periods, entries } = useTimetable();

  const subjectCount = new Set(entries.map((item) => item.subjectId)).size;
  const classPeriods = periods.filter(
    (period) => period.kind === "class",
  ).length;
  const breakCount = periods.filter(
    (period) => period.kind === "break",
  ).length;

  const stats = [
    { label: "Subjects", value: subjectCount },
    { label: "Sessions", value: entries.length },
    { label: "Periods", value: classPeriods },
    { label: "Breaks", value: breakCount },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl  border-border bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* <div className="flex flex-wrap gap-x-6 gap-y-2">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-semibold text-brand-900">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div> */}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {legendOrder.map((type) => {
          const meta = sessionTypeMeta[type];

          return (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${meta.dot}`}
              />
              {meta.label}
            </span>
          );
        })}

        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Coffee className="h-3.5 w-3.5 text-brand-600" />
          Break
        </span>
      </div>
    </div>
  );
}
