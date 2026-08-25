"use client";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Megaphone,
  TrendingUp,
} from "lucide-react";

import { classes } from "@/features/students/classes/data/Classes";
import { assignments } from "@/features/students/assignments/data/Assignment";

export function StudentDashboard() {
  const totalClasses = classes.length;
  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "pending" || assignment.status === "overdue"
  ).length;
  const gradedAssignments = assignments.filter(
    (assignment) => assignment.status === "graded" && assignment.score !== undefined
  );

  const averageGrade =
    gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce((total, assignment) => {
            const maxScore = assignment.totalMarks ?? assignment.score ?? 1;
            return total + (assignment.score! / maxScore) * 100;
          }, 0) / gradedAssignments.length
        )
      : 0;

  const nextSchedule = classes.slice(0, 4).map((classItem) => ({
    ...classItem,
    time: classItem.schedule.split("•")[1]?.trim() ?? "",
  }));

  const recentAssignments = [...assignments]
    .filter((assignment) => assignment.status === "pending" || assignment.status === "overdue")
    .slice(0, 4)
    .map((assignment) => ({
      subject: assignment.subject,
      title: assignment.title,
      due:
        assignment.status === "overdue"
          ? "Overdue"
          : `Due ${assignment.submissionEnd}`,
      points: `${assignment.totalMarks ?? 0} points`,
      urgent: assignment.status === "overdue",
    }));

  const gradeBreakdown = Object.entries(
    gradedAssignments.reduce<Record<string, number[]>>((accumulator, assignment) => {
      const subject = assignment.subject;
      accumulator[subject] = accumulator[subject] ?? [];
      accumulator[subject].push(
        ((assignment.score ?? 0) / (assignment.totalMarks ?? 1)) * 100
      );
      return accumulator;
    }, {})
  ).map(([subject, scores]) => ({
    subject,
    grade: Math.round(scores.reduce((total, score) => total + score, 0) / scores.length),
  }));

  return (
    <main className="min-h-screen">
      <div className="mx-auto ">
        <section className="mb-7">
          <div className="flex flex-col p-4 bg-brand-700 rounded-2xl  gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-200">
                Monday, August 10, 2026
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-gray-100 sm:text-3xl">
                Good evening, Bolu
              </h1>

              <p className="mt-1 text-sm text-gray-200">
                Here&apos;s an overview of your school activities.
              </p>
            </div>

       
          </div>
        </section>

        <section className="mb-6 flex flex-col  grid-cols-4 shadow rounded-2xl bg-white p-5 gap-4 lg:grid-cols-4">
         <div className="flex justify-around items-center gap-3">
           <OverviewCard icon={BookOpen} label="Classes" value={String(totalClasses)} detail="This term" />
          <OverviewCard
            icon={FileText}
            label="Assignments"
            value={String(pendingAssignments)}
            detail="Pending"
            highlighted
          />
          <OverviewCard
            icon={TrendingUp}
            label="Average Grade"
            value={`${averageGrade}%`}
            detail="Current term"
          />
         </div>
            <div>
             
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: "94%" }} />
                </div>
                 <div className="flex justify-between mt-1">
                <p className="font-semibold text-brand-700">Attendance</p> <p className="font-semibold text-brand-700">95%</p>
              </div>
            </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-xl bg-white shadow-sm">
              <SectionHeader icon={CalendarDays} title="Today's Schedule" action="View schedule" />

              <div className="divide-y divide-gray-100">
                {nextSchedule.map((item, index) => (
                  <ScheduleItem
                    key={item.id}
                    time={item.schedule.split("•")[1]?.trim() ?? `${index + 1}:00 PM`}
                    endTime={item.schedule.split("•")[1]?.trim() ?? `${index + 1}:30 PM`}
                    subject={item.name}
                    teacher={item.teacher}
                    room={item.room}
                    active={index === 0}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-xl bg-white shadow-sm">
              <SectionHeader icon={FileText} title="Assignments" action="View all" />

              <div className="divide-y divide-gray-100">
                {recentAssignments.length > 0 ? (
                  recentAssignments.map((assignment, index) => (
                    <AssignmentItem
                      key={`${assignment.subject}-${assignment.title}-${index}`}
                      subject={assignment.subject}
                      title={assignment.title}
                      due={assignment.due}
                      points={assignment.points}
                      urgent={assignment.urgent}
                    />
                  ))
                ) : (
                  <div className="px-5 py-4 text-sm text-gray-500">
                    No pending assignments right now.
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-xl bg-white shadow-sm">
              <SectionHeader icon={TrendingUp} title="Academic Overview" />

              <div className="space-y-5 px-5 pb-5">
                {gradeBreakdown.length > 0 ? (
                  gradeBreakdown.map((item) => <GradeItem key={item.subject} subject={item.subject} grade={item.grade} />)
                ) : (
                  <GradeItem subject="Mathematics" grade={82} />
                )}

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-50 py-2.5 text-sm font-medium text-brand-700 transition hover:bg-brand-100">
                  View grades
                  <ArrowRight size={15} />
                </button>
              </div>
            </section>

            <section className="rounded-xl bg-white shadow-sm">
              <SectionHeader icon={CheckCircle2} title="Attendance" />

              <div className="px-5 pb-5">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-gray-900">94%</p>
                    <p className="mt-1 text-xs text-gray-500">Overall attendance</p>
                  </div>

                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    Good standing
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: "94%" }} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <AttendanceStat label="Present" value="47" />
                  <AttendanceStat label="Absent" value="2" />
                  <AttendanceStat label="Late" value="1" />
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white shadow-sm">
              <SectionHeader icon={Megaphone} title="Announcements" action="View all" />

              <div className="divide-y divide-gray-100">
                <Announcement title="Mid-term examination timetable" date="Today" />
                <Announcement title="Science practical schedule" date="Yesterday" />
                <Announcement title="School assembly reminder" date="Aug 7" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

interface OverviewCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  highlighted?: boolean;
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  detail,
  highlighted,
}: OverviewCardProps) {
  return (
    <div
      className={`rounded-xl flex flex-col items-center`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
          <Icon size={18} className="text-brand-600" />
        </div>
      </div>

      <div className="flex items-center gap-2">

      <span className="text-4xs font-semibold text-gray-900 sm:text-2xl">
          {value}
        </span>
         <p className="text-xs font-medium text-gray-500">
        {label}
      </p>
      </div>
     

      {/* <div className="mt-1 flex items-baseline gap-2">
        

        <span className="text-xs text-gray-400">
          {detail}
        </span>
      </div> */}
      
    </div>
  );
}

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  action?: string;
}

function SectionHeader({
  icon: Icon,
  title,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2.5">
        <Icon size={18} className="text-brand-600" />

        <h2 className="text-sm font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      {action && (
        <button className="flex items-center gap-1 text-xs font-medium text-brand-700 transition hover:text-brand-800">
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

interface ScheduleItemProps {
  time: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  active?: boolean;
}

function ScheduleItem({
  time,
  endTime,
  subject,
  teacher,
  room,
  active,
}: ScheduleItemProps) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="w-20 shrink-0">
        <p className="text-xs font-medium text-gray-700">
          {time}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">
          {endTime}
        </p>
      </div>

      <div
        className={`min-w-0 flex-1 rounded-lg px-3 py-2.5 ${
          active
            ? "bg-brand-50"
            : "bg-gray-50"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {subject}
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              {teacher} • {room}
            </p>
          </div>

          {active && (
            <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-medium text-brand-700">
              Now
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface AssignmentItemProps {
  subject: string;
  title: string;
  due: string;
  points: string;
  urgent?: boolean;
}

function AssignmentItem({
  subject,
  title,
  due,
  points,
  urgent,
}: AssignmentItemProps) {
  return (
    <button className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
        <FileText size={17} className="text-brand-600" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {subject}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium text-gray-900">
          {title}
        </p>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <p
          className={`text-xs font-medium ${
            urgent ? "text-red-600" : "text-gray-600"
          }`}
        >
          {due}
        </p>

        <p className="mt-0.5 text-[11px] text-gray-400">
          {points}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-gray-300"
      />
    </button>
  );
}

interface GradeItemProps {
  subject: string;
  grade: number;
}

function GradeItem({
  subject,
  grade,
}: GradeItemProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">
          {subject}
        </span>

        <span className="text-xs font-semibold text-gray-900">
          {grade}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-brand-600"
          style={{ width: `${grade}%` }}
        />
      </div>
    </div>
  );
}

interface AttendanceStatProps {
  label: string;
  value: string;
}

function AttendanceStat({
  label,
  value,
}: AttendanceStatProps) {
  return (
    <div className="rounded-lg bg-gray-50 py-2.5">
      <p className="text-sm font-semibold text-gray-900">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-gray-400">
        {label}
      </p>
    </div>
  );
}

interface AnnouncementProps {
  title: string;
  date: string;
}

function Announcement({
  title,
  date,
}: AnnouncementProps) {
  return (
    <button className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition hover:bg-gray-50">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium leading-5 text-gray-800">
          {title}
        </p>

        <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
          <Clock3 size={11} />
          {date}
        </div>
      </div>

      <ChevronRight
        size={15}
        className="mt-1 shrink-0 text-gray-300"
      />
    </button>
  );
}