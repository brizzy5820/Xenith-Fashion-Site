"use client";

import { useState } from "react";
import { ChevronDown, Clock, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";

import { PeriodKind } from "../type/schedule.type";
import { useTimetable } from "../data/TimetableProvider";

export default function PeriodManager() {
  const { periods, addPeriod, updatePeriod, removePeriod } = useTimetable();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-brand-900">
          <Clock className="h-4 w-4 text-brand-600" />
          Manage periods &amp; breaks
        </span>

        <ChevronDown
          className={clsx(
            "h-4 w-4 text-muted-foreground transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="space-y-2 border-t border-border p-3">
          {periods.map((period) => (
            <div
              key={period.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 rounded-lg bg-brand-50/60 p-2"
            >
              <input
                value={period.label}
                onChange={(event) =>
                  updatePeriod(period.id, { label: event.target.value })
                }
                className="min-w-0 rounded-md border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-brand-500"
              />

              <input
                type="time"
                value={period.startTime}
                onChange={(event) =>
                  updatePeriod(period.id, { startTime: event.target.value })
                }
                className="rounded-md border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-brand-500"
              />

              <input
                type="time"
                value={period.endTime}
                onChange={(event) =>
                  updatePeriod(period.id, { endTime: event.target.value })
                }
                className="rounded-md border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-brand-500"
              />

              <select
                value={period.kind}
                onChange={(event) =>
                  updatePeriod(period.id, {
                    kind: event.target.value as PeriodKind,
                  })
                }
                className="rounded-md border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-brand-500"
              >
                <option value="class">Class</option>
                <option value="break">Break</option>
              </select>

              <button
                type="button"
                onClick={() => removePeriod(period.id)}
                aria-label={`Remove ${period.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-rose-600 transition hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                addPeriod({
                  label: "New period",
                  startTime: "15:00",
                  endTime: "15:45",
                  kind: "class",
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              <Plus className="h-4 w-4" />
              Add period
            </button>

            <button
              type="button"
              onClick={() =>
                addPeriod({
                  label: "New break",
                  startTime: "15:45",
                  endTime: "16:00",
                  kind: "break",
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
            >
              <Plus className="h-4 w-4" />
              Add break
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
