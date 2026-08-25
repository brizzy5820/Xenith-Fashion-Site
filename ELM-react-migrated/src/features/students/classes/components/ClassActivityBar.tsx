"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Clock3,
  MapPin,
  Radio,
  UserRound,
} from "lucide-react";

interface ClassActivityBarProps {
  ongoingLecture?: {
    title: string;
    lectureId: string;
    topic: string;
    location: string;
    period: string;
    teacher: string;
  } | null;

  pendingAssignments: number;
}

export function ClassActivityBar({
  ongoingLecture,
  pendingAssignments,
}: ClassActivityBarProps) {
  return (
    <div className="mb-5 grid gap-3 md:grid-cols-2">
      {/* Ongoing Lecture */}
      {ongoingLecture ? (
        <Link
          to={`/students/classes/lectures/${ongoingLecture.lectureId}`}
          className="group relative flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <span className="absolute inset-0 rounded-xl ring-2 ring-brand-200" />

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <BookOpen
              size={18}
              className="text-brand-600"
            />

            {/* Live indicator */}
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-600" />
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <Radio
                size={12}
                className="text-brand-600"
              />

              <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                Ongoing Lecture
              </p>
            </div>

            <p className="truncate text-sm font-semibold text-gray-900">
              {ongoingLecture.title}
            </p>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-50">
                  <BookOpen size={10} className="text-brand-600" />
                </span>
                <span className="truncate text-xs text-gray-600">
                  {ongoingLecture.topic}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-50">
                  <MapPin size={10} className="text-brand-600" />
                </span>
                <span className="truncate text-xs text-gray-600">
                  {ongoingLecture.location}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-50">
                  <Clock3 size={10} className="text-brand-600" />
                </span>
                <span className="truncate text-xs text-gray-600">
                  {ongoingLecture.period}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-50">
                  <UserRound size={10} className="text-brand-600" />
                </span>
                <span className="truncate text-xs text-gray-600">
                  {ongoingLecture.teacher}
                </span>
              </div>
            </div>
          </div>

          <ArrowRight
            size={16}
            className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
          />
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
            <BookOpen
              size={18}
              className="text-gray-400"
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Ongoing Lecture
            </p>

            <p className="mt-1 text-sm text-gray-500">
              No lecture is currently ongoing
            </p>
          </div>
        </div>
      )}

      {/* Pending Assignments */}
      <Link
        to="/students/assignments"
        className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
          <ClipboardList
            size={18}
            className="text-brand-600"
          />

          {pendingAssignments > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-600" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-700">
            Pending Assignments
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            {pendingAssignments > 0
              ? `${pendingAssignments} assignment${
                  pendingAssignments === 1 ? "" : "s"
                } waiting`
              : "No pending assignments"}
          </p>
        </div>

        <ArrowRight
          size={16}
          className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
        />
      </Link>
    </div>
  );
}
