"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";

import {
  cellKey,
  DayOfWeek,
  TimePeriod,
  TimetableEntry,
} from "../type/schedule.type";
import { days } from "../data/schedule.data";
import { useTimetable } from "../data/TimetableProvider";
import ScheduleCard from "./ScheduleCard";

export type Orientation = "expanded" | "compact";

interface ScheduleGridProps {
  orientation: Orientation;
  editing: boolean;
  onSelectEntry: (entry: TimetableEntry) => void;
  onEditCell: (day: DayOfWeek, period: TimePeriod) => void;
}

const timeRange = (period: TimePeriod) =>
  `${period.startTime} – ${period.endTime}`;

export default function ScheduleGrid({
  orientation,
  editing,
  onSelectEntry,
  onEditCell,
}: ScheduleGridProps) {
  const { periods, entryMap } = useTimetable();

  const SCROLLBAR_HIDE_DELAY = 1500;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] =
    useState<"subtle" | "active" | "hidden">("subtle");
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const revealScrollbar = () => {
    setScrollState("active");
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setScrollState("hidden");
    }, SCROLLBAR_HIDE_DELAY);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", revealScrollbar, { passive: true });
    el.addEventListener("mouseenter", revealScrollbar);
    el.addEventListener("mousemove", revealScrollbar);

    return () => {
      el.removeEventListener("scroll", revealScrollbar);
      el.removeEventListener("mouseenter", revealScrollbar);
      el.removeEventListener("mousemove", revealScrollbar);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const renderBreakCell = (period: TimePeriod) => (
    <div
      key={cellKey("Monday", period.id)}
      className="flex h-full min-h-[68px] items-center justify-center border border-slate-200 bg-slate-100 px-2 py-2"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
        {period.label}
      </span>
    </div>
  );

  const renderClassCell = (day: DayOfWeek, period: TimePeriod) => {
    const entry = entryMap.get(cellKey(day, period.id));

    if (period.kind === "break") {
      return (
        <div
          key={cellKey(day, period.id)}
          className="flex h-full min-h-[68px] items-center justify-center  bg-white px-2 py-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
            {period.label}
          </span>
        </div>
      );
    }

    if (entry) {
      return (
        <ScheduleCard
          key={cellKey(day, period.id)}
          entry={entry}
          onClick={() =>
            editing ? onEditCell(day, period) : onSelectEntry(entry)
          }
        />
      );
    }

    if (editing) {
      return (
        <button
          key={cellKey(day, period.id)}
          type="button"
          onClick={() => onEditCell(day, period)}
          className="group flex h-full min-h-[68px] items-center justify-center border border-brand-100 bg-brand-50 text-muted-foreground transition hover:bg-brand-100"
        >
          <Plus className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
        </button>
      );
    }

    return (
      <div
        key={cellKey(day, period.id)}
        className="flex h-full min-h-[68px] items-center justify-center border border-brand-100 bg-brand-50 px-2 py-2"
      >
        <span className="rounded-full border border-brand-200 bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-700">
          Free period
        </span>
      </div>
    );
  };

  const headerCell = "bg-brand-700 px-3 py-2.5 text-center text-white";
  const subLabel = "text-[10px] font-medium text-brand-100";

  if (orientation === "compact") {
    const gridTemplateColumns = `minmax(110px, 0.8fr) repeat(${days.length}, minmax(120px, 1fr))`;

    return (
      <div
        ref={scrollRef}
        className={clsx(
          "timetable-scroll",
          "w-full overflow-auto rounded-xl shadow-sm sm:mx-0",
          scrollState === "active" && "timetable-scroll--active",
          scrollState === "hidden" && "timetable-scroll--hidden",
        )}
        style={{ maxHeight: "620px" }}
      >
        <div
          className="grid w-full min-w-[760px] gap-px bg-border sm:min-w-0"
          style={{ gridTemplateColumns }}
        >
          <div className={clsx(headerCell, "sticky top-0 left-0 z-30 shadow-sm")}>
            <p className="text-xs font-semibold uppercase tracking-wide">Time</p>
          </div>

          {days.map((day) => (
            <div key={day}               className={clsx(headerCell, "sticky top-0 z-20 shadow-sm")}
              >
              <p className="text-sm font-semibold">{day}</p>
            </div>
          ))}

          {periods.map((period) => (
            <div key={period.id} className="contents">
              <div className={clsx("sticky left-0 z-10 flex flex-col justify-center bg-white px-3 py-2 shadow-sm")} >
                <p className="text-sm font-semibold text-brand-800">
                  {period.label}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {timeRange(period)}
                </p>
              </div>

              {days.map((day) => (
                <div key={cellKey(day, period.id)} className="relative min-h-[68px] z-0">
                  {renderClassCell(day, period)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const expandedColumns = [
    "minmax(112px, 0.7fr)",
    ...periods.map(() => "minmax(148px, 1fr)"),
  ].join(" ");

  const expandedRows = `auto repeat(${days.length}, minmax(92px, 1fr))`;

  return (
    <div
      ref={scrollRef}
      className={clsx(
        "timetable-scroll",
        "w-full overflow-auto rounded-xl shadow-sm sm:mx-0",
        scrollState === "active" && "timetable-scroll--active",
        scrollState === "hidden" && "timetable-scroll--hidden",
      )}
      style={{ maxHeight: "620px" }}
    >
      <div
        className="grid w-full min-w-[900px] gap-px bg-border sm:min-w-0"
        style={{
          gridTemplateColumns: expandedColumns,
          gridTemplateRows: expandedRows,
        }}
      >
        <div
          className={clsx(headerCell, "sticky top-0 left-0 z-30 shadow-sm flex items-center text-left")}
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide">Day</p>
        </div>

        {periods.map((period, periodIndex) => (
          <div
            key={`head-${period.id}`}
            className={clsx(
              headerCell,
              "sticky top-0 z-20 shadow-sm",
              period.kind === "break" && "bg-brand-700",
            )}
            style={{ gridColumn: periodIndex + 2, gridRow: 1 }}
          >
            <p className="text-xs font-semibold leading-tight">{period.label}</p>
            <p className={subLabel}>{timeRange(period)}</p>
          </div>
        ))}

        {days.map((day, dayIndex) => (
          <div
            key={`label-${day}`}
            className="sticky left-0 z-10 flex items-center bg-white px-3 py-2 text-sm font-semibold text-brand-800 shadow-sm"
            style={{ gridColumn: 1, gridRow: dayIndex + 2 }}
          >
            {day}
          </div>
        ))}

        {days.map((day, dayIndex) =>
          periods.map((period, periodIndex) => (
            <div
              key={cellKey(day, period.id)}
              className="relative min-h-[92px] z-0"
              style={{
                gridColumn: periodIndex + 2,
                gridRow: dayIndex + 2,
              }}
            >
              {renderClassCell(day, period)}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
