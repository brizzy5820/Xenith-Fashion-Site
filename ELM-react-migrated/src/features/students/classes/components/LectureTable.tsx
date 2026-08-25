// LectureTable.tsx
"use client";

import { BookOpen } from "lucide-react";
import { LectureRow } from "./LectureRow";

export interface Lecture {
  id: string;
  order: number;
  title: string;

  startDate: string;
  endDate: string;

  audioVisual?: {
    label: string;
    href: string;
  } | null;

  material?: {
    label: string;
    href: string;
  } | null;
}

interface LectureTableProps {
  lectures: Lecture[];

  audioVisualEnabled: boolean;
  materialsEnabled: boolean;
}

export function LectureTable({
  lectures,
  audioVisualEnabled,
  materialsEnabled,
}: LectureTableProps) {
  const isEmpty = lectures.length === 0;

  return (
    <section className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b  border-brand-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-brand-900">
            Term Outline
          </h2>
        </div>

        {!isEmpty && (
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
            {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"}
          </span>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-500">
            <BookOpen size={18} />
          </span>
          <p className="text-sm font-medium text-brand-900">No lectures yet</p>
          <p className="text-xs text-muted-foreground">
            Lectures will appear here once they're scheduled.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-100 bg-muted">
                  <th className="w-16 border-r border-brand-100 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    week
                  </th>

                  <th className="w-full border-r border-brand-100 px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Topic
                  </th>

                  <th className="whitespace-nowrap border-r border-brand-100 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground last:border-r-0">
                    Period
                  </th>

                  {audioVisualEnabled && (
                    <th className="whitespace-nowrap border-r border-brand-100 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground last:border-r-0">
                      Audio / Visual
                    </th>
                  )}

                  {materialsEnabled && (
                    <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Lecture Material
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {lectures.map((lecture) => (
                  <LectureRow
                    key={lecture.id}
                    lecture={lecture}
                    audioVisualEnabled={audioVisualEnabled}
                    materialsEnabled={materialsEnabled}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-brand-100 md:hidden">
            {lectures.map((lecture) => (
              <LectureRow
                key={lecture.id}
                lecture={lecture}
                audioVisualEnabled={audioVisualEnabled}
                materialsEnabled={materialsEnabled}
                mobile
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}