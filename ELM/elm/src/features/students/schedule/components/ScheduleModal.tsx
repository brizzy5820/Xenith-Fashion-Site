"use client";

import { CalendarDays, Clock3, MapPin, UserRound, X } from "lucide-react";

import { TimetableEntry } from "../type/schedule.type";
import { useTimetable } from "../data/TimetableProvider";
import { sessionTypeMeta } from "./ScheduleCard";

interface ScheduleDetailsModalProps {
  entry: TimetableEntry | null;
  onClose: () => void;
}

export default function ScheduleDetailsModal({
  entry,
  onClose,
}: ScheduleDetailsModalProps) {
  const { periods } = useTimetable();

  if (!entry) return null;

  const period = periods.find((item) => item.id === entry.periodId);
  const meta = sessionTypeMeta[entry.type];
  const TypeIcon = meta.icon;

  const rows = [
    { icon: CalendarDays, label: "Day", value: entry.day },
    {
      icon: Clock3,
      label: "Time",
      value: period ? `${period.startTime} – ${period.endTime}` : "—",
    },
    { icon: MapPin, label: "Location", value: entry.room },
    { icon: UserRound, label: "Lecturer", value: entry.teacher },
  ];

  return (
    <div
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-y-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`border-b px-4 py-4 sm:px-5 ${meta.dot} ${meta.border}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black ${meta.border}  bg-white/80`}>
                  {entry.code}
                </span>
                <span className="text-[11px] font-medium text-white">
                  {meta.label}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                {entry.subject}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg   text-white transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          {rows.map((row) => {
            const RowIcon = row.icon;

            return (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white ${meta.text}`}>
                    <RowIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {row.label}
                  </span>
                </div>

                <span className="truncate text-right text-sm font-semibold text-slate-900">
                  {row.value}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white ${meta.text}`}>
                <TypeIcon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-slate-600">Type</span>
            </div>

            <span className="text-right text-sm font-semibold text-slate-900">
              {meta.label}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
        
        </div>
      </div>
    </div>
  );
}
