"use client";

import clsx from "clsx";
import { CalendarRange, Check, Pencil, RotateCcw } from "lucide-react";

import type { Orientation } from "./ScheduleGrid";

interface ScheduleHeaderProps {
  orientation: Orientation;
  onOrientationChange: (orientation: Orientation) => void;
  editing: boolean;
  onToggleEditing: () => void;
  onReset: () => void;
}

const views: { value: Orientation; label: string }[] = [
    { value: "compact", label: "Compact" },
     { value: "expanded", label: "Expand" },
];
 

export default function ScheduleHeader({
  orientation,
  onOrientationChange,
  editing,
  onToggleEditing,
  onReset,
}: ScheduleHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-brand-600">
          <CalendarRange className="h-5 w-5" />
          <span className="text-sm font-medium">Weekly Timetable</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
          Timetable
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Your recurring class schedule across every subject.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg bg-white shadow  p-1.5">
          {views.map((view) => (
            <button
              key={view.value}
              type="button"
              onClick={() => onOrientationChange(view.value)}
              className={clsx(
                "rounded-md px-3 py-1.5 text-sm font-medium transition",
                orientation === view.value
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-brand-800 hover:bg-brand-50",
              )}
            >
              {view.label}
            </button>
          ))}
        </div>

        {editing && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg shadow bg-white px-3 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}

        <button
          type="button"
          onClick={onToggleEditing}
          className={clsx(
            "inline-flex h-9 items-center gap-1.5 shadow rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition",
            editing
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : " bg-white text-brand-800 hover:bg-brand-50",
          )}
        >
          {editing ? (
            <>
              <Check className="h-4 w-4" />
              Done
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit
            </>
          )}
        </button>
      </div>
    </div>
  );
}
