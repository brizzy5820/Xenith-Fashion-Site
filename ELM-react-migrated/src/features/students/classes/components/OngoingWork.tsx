"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  FileText,
  PlayCircle,
} from "lucide-react";

interface OngoingWorkProps {
  type: "lesson" | "assignment";
  title: string;
  description: string;
  due?: string;
  actionHref: string;
}

export function OngoingWork({
  type,
  title,
  description,
  due,
  actionHref,
}: OngoingWorkProps) {
  const isAssignment = type === "assignment";

  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        {isAssignment ? (
          <FileText
            size={18}
            className="text-brand-600"
          />
        ) : (
          <BookOpen
            size={18}
            className="text-brand-600"
          />
        )}

        <h2 className="text-sm font-semibold text-gray-900">
          Currently Ongoing
        </h2>
      </div>

      <div className="p-5">
        <div className="rounded-lg bg-brand-50 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                {isAssignment ? "Assignment" : "Lesson"}
              </span>

              <h3 className="mt-2 text-base font-semibold text-gray-900">
                {title}
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                {description}
              </p>

              {due && (
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <CalendarClock size={14} />
                  {due}
                </div>
              )}
            </div>

            <Link
              to={actionHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-brand-700"
            >
              {isAssignment
                ? "View assignment"
                : "Continue lesson"}

              {isAssignment ? (
                <ArrowRight size={14} />
              ) : (
                <PlayCircle size={14} />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}