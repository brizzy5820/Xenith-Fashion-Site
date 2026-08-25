"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { ClassHeader } from "@/features/students/classes/components/ClassHeader";
import { ClassActivityBar } from "@/features/students/classes/components/ClassActivityBar";
import {
  LectureTable,
  Lecture,
} from "@/features/students/classes/components/LectureTable";
import { ClassResourceSettings } from "@/components/shared/ClassResourceSetting";

const lectures: Lecture[] = [
  {
    id: "functions-and-limits",
    order: 1,
    title: "Functions and Limits",
    startDate: "Aug 11, 10:00 AM",
    endDate: "Aug 13, 6:00 PM",
    audioVisual: {
      label: "Start lesson",
      href: "/students/classes/lectures/functions-and-limits",
    },
    material: {
      label: "PDF Available",
      href: "/students/materials/functions-and-limits",
    },
  },
  {
    id: "differentiation",
    order: 2,
    title: "Differentiation",
    startDate: "Aug 17, 10:00 AM",
    endDate: "Aug 20, 6:00 PM",
    audioVisual: {
      label: "Start lesson",
      href: "/students/classes/lectures/differentiation",
    },
    material: {
      label: "PDF Available",
      href: "/students/materials/differentiation",
    },
  },
  {
    id: "techniques-differentiation-part-1",
    order: 3,
    title: "Techniques of Differentiation — Part I",
    startDate: "Aug 24, 8:00 AM",
    endDate: "Aug 28, 6:00 PM",
    audioVisual: null,
    material: {
      label: "PDF Available",
      href: "/students/materials/techniques-differentiation-1",
    },
  },
  {
    id: "techniques-differentiation-part-2",
    order: 4,
    title: "Techniques of Differentiation — Part II",
    startDate: "Aug 31, 8:00 AM",
    endDate: "Sep 4, 6:00 PM",
    audioVisual: null,
    material: null,
  },
  {
    id: "applications-differentiation-part-1",
    order: 5,
    title: "Some Applications of Differentiation — Part I",
    startDate: "Sep 7, 8:00 AM",
    endDate: "Sep 11, 6:00 PM",
    audioVisual: {
      label: "Start lesson",
      href: "/students/classes/lectures/applications-differentiation-1",
    },
    material: {
      label: "PDF Available",
      href: "/students/materials/applications-differentiation-1",
    },
  },
];

export default function ClassPage() {
  const params = useParams();
  const classId = params.classId as string;

  const [audioVisualEnabled, setAudioVisualEnabled] =
    useState(true);

  const [materialsEnabled, setMaterialsEnabled] =
    useState(true);

  const currentClass = {
    subject: "Mathematics",
    code: "MTH 102",
    teacher: "Mr. Adeyemi",
    room: "Room 204",
    schedule: "Mon • 8:00 AM - 9:30 AM",
    period: "Period 1",
  };

  const ongoingLecture = {
    title: lectures[0].title,
    lectureId: lectures[0].id,
    topic: lectures[0].title,
    location: currentClass.room,
    period: `${currentClass.period} • ${currentClass.schedule}`,
    teacher: currentClass.teacher,
  };

  return (
    <main className="min-h-screen">
      <div>
        <ClassHeader
          subject={currentClass.subject}
          code={currentClass.code}
          teacher={currentClass.teacher}
        />

        <ClassActivityBar
          ongoingLecture={ongoingLecture}
          pendingAssignments={3}
        />
        <LectureTable
          lectures={lectures}
          audioVisualEnabled={audioVisualEnabled}
          materialsEnabled={materialsEnabled}
        />

        <div className="mt-6">
          <ClassResourceSettings
            audioVisualEnabled={audioVisualEnabled}
            materialsEnabled={materialsEnabled}
            onAudioVisualChange={setAudioVisualEnabled}
            onMaterialsChange={setMaterialsEnabled}
          />
        </div>
      </div>
    </main>
  );
}
export type ScheduleType =
  | "lecture"
  | "practical"
  | "tutorial"
  | "examination"
  | "event";

export type ScheduleStatus =
  | "scheduled"
  | "ongoing"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface ScheduleItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseTitle: string;
  instructor: string;
  location: string;
  type: ScheduleType;
  status: ScheduleStatus;
}