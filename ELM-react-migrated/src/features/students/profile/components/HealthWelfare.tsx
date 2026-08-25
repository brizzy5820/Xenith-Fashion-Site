import { HeartPulse } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

export function HealthWelfare() {
  const { health } = studentProfile;

  return (
    <ProfileSectionCard
      title="Health & welfare"
      description="Health information maintained by the school"
      icon={HeartPulse}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Blood group
          </p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {health.bloodGroup}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Genotype
          </p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {health.genotype}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Medical condition
          </p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {health.medicalCondition}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Allergies
          </p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {health.allergies}
          </p>
        </div>
      </div>
    </ProfileSectionCard>
  );
}