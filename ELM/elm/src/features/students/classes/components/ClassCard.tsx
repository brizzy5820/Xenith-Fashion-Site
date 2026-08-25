"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

interface ClassCardProps {
  id: string;
  name: string;
  code: string;
  teacher: string;
  room: string;
  schedule: string;
  assignments: number;
  submittedAssignments?: number;
  unsubmittedAssignments?: number;
  assignmentState?: "empty" | "submitted" | "unsubmitted";
  progress: number;
  hasUnsubmitted?: boolean;
  isOngoing?: boolean;
}

export function ClassCard({
  id,
  name,
  code,
  teacher,
  room,
  schedule,
  assignments,
  submittedAssignments = 0,
  unsubmittedAssignments = 0,
  assignmentState,
  progress,
  hasUnsubmitted = false,
  isOngoing = false,
}: ClassCardProps) {
  const state =
    assignmentState ??
    (hasUnsubmitted ? "unsubmitted" : assignments === 0 ? "empty" : "submitted");

  const indicatorConfig = {
    empty: {
      dotClassName: "bg-gray-400",
      badgeClassName: "bg-gray-100 text-gray-700",
      label: "No assignments",
    },
    submitted: {
      dotClassName: "bg-emerald-500",
      badgeClassName: "bg-emerald-50 text-emerald-700",
      label:
        submittedAssignments === 1
          ? " submitted"
          : `${submittedAssignments} submitted`,
    },
    unsubmitted: {
      dotClassName: "bg-red-500",
      badgeClassName: "bg-red-50 text-red-700",
      label:
        unsubmittedAssignments === 1
          ? " unsubmitted"
          : `${unsubmittedAssignments} unsubmitted`,
    },
  }[state];

  return (
    <Link
      href={`/students/classes/${id}`}
      className="group relative block rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {isOngoing && (
        <span
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700"
          aria-label="Class in session"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-600 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
          </span>
          Live
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <BookOpen
              size={19}
              className="text-brand-600"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {name}
            </h3>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {code}
            </p>
          </div>
        </div>

        <ArrowRight
          size={17}
          className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
        />
      </div>

      {/* Teacher */}
      <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
        <UserRound size={15} className="text-gray-400" />
        <span>{teacher}</span>
      </div>

      {/* Class Details */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <CalendarDays
            size={14}
            className="text-gray-400"
          />

          <span className="truncate text-xs text-gray-600">
            {schedule}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <Clock3
            size={14}
            className="text-gray-400"
          />

          <span className="truncate text-xs text-gray-600">
            {room}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            Course progress
          </span>

          <span className="text-xs font-semibold text-gray-700">
            {progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <span className={assignments ===0 ? 'hidden':'text-xs text-gray-500' }>
            {assignments}{" "}
            {assignments <= 1 ? "assignment" : "assignments"}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${indicatorConfig.badgeClassName}`}
          >
            {/* <span className={`h-2 w-2 rounded-full ${indicatorConfig.dotClassName}`} /> */}
            {indicatorConfig.label}
          </span>
        </div>

        <span className="text-xs font-medium text-brand-700">
          View class
        </span>
      </div>
    </Link>
  );
}