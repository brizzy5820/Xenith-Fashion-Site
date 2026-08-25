import { BookOpenCheck } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}

export function AcademicInformation() {
  const enrollment = studentProfile.currentEnrollment;

  return (
    <ProfileSectionCard
      title="Academic information"
      description="Current academic placement and enrollment"
      icon={BookOpenCheck}
    >
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field
          label="Academic session"
          value={enrollment.academicSession}
        />

        <Field label="Term" value={enrollment.term} />

        <Field
          label="Class"
          value={`${enrollment.classLevel} ${enrollment.classArm}`}
        />

        <Field label="Section" value={enrollment.section} />

        <Field label="Department" value={enrollment.department} />

        <Field label="House" value={enrollment.house} />

        <Field label="Form teacher" value={enrollment.formTeacher} />

        <Field
          label="Admission year"
          value={studentProfile.admissionNumber.split("-")[1] ?? "—"}
        />
      </div>
    </ProfileSectionCard>
  );
}