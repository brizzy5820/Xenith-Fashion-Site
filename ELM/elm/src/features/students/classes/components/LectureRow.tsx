// LectureRow.tsx
"use client";

import Link from "next/link";
import { ArrowRight, FileText, Headphones } from "lucide-react";

import { Lecture } from "./LectureTable";

interface LectureRowProps {
  lecture: Lecture;
  audioVisualEnabled: boolean;
  materialsEnabled: boolean;
  mobile?: boolean;
}

export function LectureRow({
  lecture,
  audioVisualEnabled,
  materialsEnabled,
  mobile = false,
}: LectureRowProps) {
  if (mobile) {
    return (
      <article className="p-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-semibold text-brand-700">
            {lecture.order}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/student/classes/lectures/${lecture.id}`}
              className="text-sm font-semibold text-brand-900 hover:text-brand-700"
            >
              {lecture.title}
            </Link>

            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {lecture.startDate} — {lecture.endDate}
            </p>

            {(audioVisualEnabled || materialsEnabled) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {audioVisualEnabled && (
                  <LectureResource
                    href={lecture.audioVisual?.href}
                    label={lecture.audioVisual?.label ?? "Unavailable"}
                    icon={Headphones}
                    available={Boolean(lecture.audioVisual)}
                  />
                )}

                {materialsEnabled && (
                  <LectureResource
                    href={lecture.material?.href}
                    label={lecture.material?.label ?? "Unavailable"}
                    icon={FileText}
                    available={Boolean(lecture.material)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <tr className="border-b border-brand-200/70 last:border-0 transition-colors hover:bg-brand-50/40">
      <td className="w-16 border-r border-brand-100 px-5 py-4 align-top">
        <span className="flex h-7 w-7 items-center justify-center rounded-md  text-xs font-semibold text-brand-700">
          {lecture.order}
        </span>
      </td>

      <td className="w-full border-r border-brand-100 px-5 py-4 align-top">
        <div className="flex justify-center">
          <Link
            href={`/student/classes/lectures/${lecture.id}`}
            className="group inline-flex items-start gap-2  text-left"
          >
            <span className="text-sm font-medium leading-6   text-brand-900 transition-colors group-hover:text-brand-700">
              {lecture.title}
            </span>

            <ArrowRight
              size={13}
              className="mt-1.5 text-brand-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
            />
          </Link>
        </div>
      </td>

      <td className="whitespace-nowrap border-r border-brand-100 px-5 py-4 text-left align-top last:border-r-0">
        <p className="text-xs leading-5 text-brand-900/80">{lecture.startDate}</p>
        <p className="text-xs leading-5 text-muted-foreground">to {lecture.endDate}</p>
      </td>

      {audioVisualEnabled && (
        <td className="border-r border-brand-100 px-3 py-4 align-top last:border-r-0">
          <LectureResource
            href={lecture.audioVisual?.href}
            label={lecture.audioVisual?.label ?? "Unavailable"}
            icon={Headphones}
            available={Boolean(lecture.audioVisual)}
          />
        </td>
      )}

      {materialsEnabled && (
        <td className="px-3 py-4 align-top">
          <LectureResource
            href={lecture.material?.href}
            label={lecture.material?.label ?? "Unavailable"}
            icon={FileText}
            available={Boolean(lecture.material)}
          />
        </td>
      )}
    </tr>
  );
}

interface LectureResourceProps {
  href?: string;
  label: string;
  icon: React.ElementType;
  available: boolean;
}

function LectureResource({ href, label, icon: Icon, available }: LectureResourceProps) {
  if (!available || !href) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md  px-2 py-1 text-xs text-muted-foreground">
        <Icon size={13} />
        Unavailable
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 hover:text-brand-800"
    >
      <Icon size={13} />
      {label}
    </Link>
  );
}