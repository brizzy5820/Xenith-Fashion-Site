import { Mail, Phone, UsersRound } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

export function GuardianInformation() {
  return (
    <ProfileSectionCard
      title="Family & guardians"
      description="Registered parent and guardian information"
      icon={UsersRound}
    >
      <div className="space-y-3">
        {studentProfile.guardians.map((guardian) => (
          <div
            key={guardian.id}
            className="rounded-xl bg-gray-50 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {guardian.name}
                  </p>

                  {guardian.isPrimary && (
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                      Primary
                    </span>
                  )}
                </div>

                <p className="mt-0.5 text-xs text-gray-500">
                  {guardian.relationship} · {guardian.occupation}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <Phone size={13} />
                  {guardian.phone}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Mail size={13} />
                  {guardian.email}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSectionCard>
  );
}