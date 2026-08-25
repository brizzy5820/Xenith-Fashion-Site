import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";

import {
  SessionType,
  TimetableEntry,
} from "../type/schedule.type";

interface SessionMeta {
  label: string;
  icon: LucideIcon;
  text: string;
  dot: string;
  border: string;
  surface: string;
}

export const sessionTypeMeta: Record<SessionType, SessionMeta> = {
  lecture: {
    label: "Lecture",
    icon: BookOpen,
    text: "text-lecture-700",
    dot: "bg-lecture-500",
    border: "border-lecture-500",
    surface: "bg-lecture-50",
  },
  practical: {
    label: "Practical",
    icon: FlaskConical,
    text: "text-purple-700",
    dot: "bg-purple-500",
    border: "border-purple-500",
    surface: "bg-purple-50",
  },
  tutorial: {
    label: "Tutorial",
    icon: Users,
    text: "text-yellow-700",
    dot: "bg-yellow-500",
    border: "border-yellow-500",
    surface: "bg-yellow-50",
  },
  examination: {
    label: "Examination",
    icon: GraduationCap,
    text: "text-rose-700",
    dot: "bg-rose-500",
    border: "border-rose-500",
    surface: "bg-rose-50",
  },
  event: {
    label: "Event",
    icon: CalendarDays,
    text: "text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-500",
    surface: "bg-blue-50",
  },
};

interface ScheduleCardProps {
  entry: TimetableEntry;
  onClick: () => void;
  live?: boolean;
}

export default function ScheduleCard({ entry, onClick, live }: ScheduleCardProps) {
  const meta = sessionTypeMeta[entry.type];
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative flex h-full w-full flex-col border-r border-b border-white p-2.5 text-left transition duration-150 hover:shadow-md sm:p-3",
        meta.border,
        meta.surface,
        live &&
          "border-lecture-600 ring-2 ring-inset ring-lecture-500 shadow-[0_0_0_3px_rgba(34,197,92,0.35)]",
      )}
    >
      <div className="flex items-center gap-1.5">
        <Icon className={clsx("h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4", meta.text)} />
        <span className={clsx("text-[11px] font-semibold sm:text-xs", meta.text)}>
          {entry.code}
        </span>
        {live && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-lecture-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Live
          </span>
        )}
      </div>

      <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-gray-800 sm:text-sm">
        {entry.subject}
      </p>

      <p className="mt-auto truncate pt-1 text-[10px] text-muted-foreground sm:text-[11px]">
        {entry.room}
      </p>
    </button>
  );
}
