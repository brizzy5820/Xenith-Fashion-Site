"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";

import {
  cellKey,
  DayOfWeek,
  SessionType,
  TimePeriod,
} from "../type/schedule.type";
import { subjectCatalog } from "../data/schedule.data";
import { useTimetable } from "../data/TimetableProvider";
import { sessionTypeMeta } from "./ScheduleCard";

interface CellEditorProps {
  target: { day: DayOfWeek; period: TimePeriod } | null;
  onClose: () => void;
}

const sessionTypes = Object.keys(sessionTypeMeta) as SessionType[];

export default function CellEditor({ target, onClose }: CellEditorProps) {
  const { entryMap, setEntry, clearEntry } = useTimetable();

  const [subjectId, setSubjectId] = useState("");
  const [type, setType] = useState<SessionType>("lecture");
  const [room, setRoom] = useState("");

  const existing = target
    ? entryMap.get(cellKey(target.day, target.period.id))
    : undefined;

  useEffect(() => {
    if (!target) return;

    if (existing) {
      setSubjectId(existing.subjectId);
      setType(existing.type);
      setRoom(existing.room);
    } else {
      const first = subjectCatalog[0];
      setSubjectId(first?.id ?? "");
      setType("lecture");
      setRoom(first?.room ?? "");
    }
    // Reset whenever a different cell is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.day, target?.period.id]);

  if (!target) return null;

  const handleSubjectChange = (nextId: string) => {
    setSubjectId(nextId);
    const subject = subjectCatalog.find((item) => item.id === nextId);
    if (subject) setRoom(subject.room);
  };

  const handleSave = () => {
    const subject = subjectCatalog.find((item) => item.id === subjectId);
    if (!subject) return;

    setEntry(target.day, target.period.id, {
      subjectId: subject.id,
      subject: subject.subject,
      code: subject.code,
      teacher: subject.teacher,
      room: room.trim() || subject.room,
      type,
    });

    onClose();
  };

  const handleClear = () => {
    clearEntry(target.day, target.period.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {target.day} · {target.period.startTime} –{" "}
              {target.period.endTime}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-brand-900">
              {existing ? "Edit class" : "Assign class"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-brand-800">Subject</span>
            <select
              value={subjectId}
              onChange={(event) => handleSubjectChange(event.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {subjectCatalog.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.subject} ({subject.code})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-medium text-brand-800">Type</span>
            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value as SessionType)
              }
              className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm capitalize outline-none focus:border-brand-500"
            >
              {sessionTypes.map((option) => (
                <option key={option} value={option}>
                  {sessionTypeMeta[option].label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-medium text-brand-800">Room</span>
            <input
              value={room}
              onChange={(event) => setRoom(event.target.value)}
              placeholder="e.g. Room 204"
              className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
          >
            Save
          </button>

          {existing && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-rose-200 px-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
