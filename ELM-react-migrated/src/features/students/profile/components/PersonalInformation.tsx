import { UserRound } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

function Field({
  label,
  value,
}: {
  label: string;
  value: string | number;
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

export function PersonalInformation() {
  const { personal } = studentProfile;

  return (
    <ProfileSectionCard
      title="Personal information"
      description="Basic identity and personal details"
      icon={UserRound}
    >
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field label="Date of birth" value={personal.dob} />
        <Field label="Age" value={`${personal.age} years`} />
        <Field label="Gender" value={personal.gender} />
        <Field label="Nationality" value={personal.nationality} />
        <Field label="State of origin" value={personal.stateOfOrigin} />
        <Field label="Religion" value={personal.religion} />
      </div>
    </ProfileSectionCard>
  );
}