"use client";

import { useState } from "react";

import ScheduleHeader from "@/src/features/students/schedule/components/ScheduleHeader";
import ScheduleOverview from "@/src/features/students/schedule/components/ScheduleOverview";
import ScheduleGrid, {
  type Orientation,
} from "@/src/features/students/schedule/components/ScheduleGrid";
import ScheduleDetailsModal from "@/src/features/students/schedule/components/ScheduleModal";
import CellEditor from "@/src/features/students/schedule/components/CellEditor";
import PeriodManager from "@/src/features/students/schedule/components/PeriodManager";

import {
  TimetableProvider,
  useTimetable,
} from "@/src/features/students/schedule/data/TimetableProvider";
import {
  DayOfWeek,
  TimePeriod,
  TimetableEntry,
} from "@/src/features/students/schedule/type/schedule.type";

function TimetableView() {
  const { reset } = useTimetable();

  const [orientation, setOrientation] = useState<Orientation>("expanded");
  const [editing, setEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] =
    useState<TimetableEntry | null>(null);
  const [editTarget, setEditTarget] = useState<{
    day: DayOfWeek;
    period: TimePeriod;
  } | null>(null);

  const handleToggleEditing = () => {
    setEditing((value) => {
      if (value) setEditTarget(null);
      return !value;
    });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset the timetable to its default periods and classes? This clears your changes.",
      )
    ) {
      reset();
    }
  };

  return (
    <main className="space-y-6 pb-10">
      <ScheduleHeader
        orientation={orientation}
        onOrientationChange={setOrientation}
        editing={editing}
        onToggleEditing={handleToggleEditing}
        onReset={handleReset}
      />

      <ScheduleOverview />

      {editing && <PeriodManager />}

      <ScheduleGrid
        orientation={orientation}
        editing={editing}
        onSelectEntry={setSelectedEntry}
        onEditCell={(day, period) => setEditTarget({ day, period })}
      />

      <ScheduleDetailsModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />

      <CellEditor
        target={editTarget}
        onClose={() => setEditTarget(null)}
      />
    </main>
  );
}

export default function SchedulePage() {
  return (
    <TimetableProvider>
      <TimetableView />
    </TimetableProvider>
  );
}
