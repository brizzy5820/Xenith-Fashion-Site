import { CheckCircle2, Settings } from "lucide-react";

import { studentProfile } from "../data/studentProfile";

interface ProfileHeaderProps {
  onSettings?: () => void;
}

function MetaChip({ label, value }: { label: string; value: string|number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-sm">
      <span className="font-semibold uppercase tracking-[0.08em] text-gray-400">
        {label} 
        :
      </span>
      <span className="font-medium text-gray-800">{value}</span>
    </span>
  );
}

function Avatar() {
  const initials = studentProfile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-brand-50 text-lg font-bold text-brand-700 shadow-md sm:h-20 sm:w-20 sm:text-xl">
      {studentProfile.photo ? (
        <img
          src={studentProfile.photo}
          alt={studentProfile.name}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export function ProfileHeader({ onSettings }: ProfileHeaderProps) {
  const enrollment = studentProfile.currentEnrollment;
  const enrolled = enrollment?.status === "enrolled";

  const classText = enrolled
    ? `${enrollment.classLevel} ${enrollment.classArm}`
    : "No active enrollment";
  const dept = enrollment?.department ?? "—";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500">
        <div className="h-32 sm:h-36" />

        {onSettings && (
          <button
            type="button"
            onClick={onSettings}
            aria-label="Profile settings"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <Settings size={16} />
          </button>
        )}

        {/* Name and active status on the red header */}
        <div className="absolute inset-x-0 top-0 flex h-full flex-col justify-center gap-2 px-5  pr-24 sm:px-7 sm:pb-8 sm:pr-28">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {studentProfile.name}
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <CheckCircle2 size={12} />
              {studentProfile.status}
            </span>
          </div>

          {/* Class, dept and section stay on the header for desktop */}
          <div className="hidden flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-white/90 sm:flex sm:gap-x-5">
            <span>Class: {classText}</span>
            <span>Dept: {dept}</span>
            {enrolled && enrollment.section && (
              <span>Section: {enrollment.section}</span>
            )}
          </div>
        </div>

        {/* Avatar absolute, half overlapping the red header */}
        <div className="absolute right-5 top-full -translate-y-1/2 sm:right-7">
          <Avatar />
        </div>
      </div>

      {/* Meta chips below the header */}
      <div className="px-5 pb-5 pt-16 sm:px-7 sm:pt-14">
        {/* Class, dept and section below the header on mobile */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-600 sm:hidden">
          <span>Class: {classText}</span>
          <span>Dept: {dept}</span>
          {enrolled && enrollment.section && (
            <span>Section: {enrollment.section}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <MetaChip
            label="Session"
            value={enrollment?.academicSession ?? "Not assigned"}
          />
          <MetaChip
            label="Admission no"
            value={studentProfile.admissionNumber}
          />
          <MetaChip
            label="Enrollment"
            value={enrolled ? "Currently enrolled" : "Enrollment required"}
          />
           <MetaChip
            label="Attendance"
            value={studentProfile.academic.attendance}
          />
           <MetaChip
            label="cgpa"
            value={studentProfile.academic.cgpa}
          />
           <MetaChip
            label="Term"
            value={studentProfile.academic.currentTerm}
          />
        </div>
      </div>
    </section>
  );
}
