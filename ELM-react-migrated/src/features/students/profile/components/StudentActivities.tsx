import { Trophy } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

export function StudentActivities() {
  return (
    <ProfileSectionCard
      title="Activities & achievements"
      description="Clubs, sports, leadership and other school activities"
      icon={Trophy}
    >
      {studentProfile.activities.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-5 text-center">
          <p className="text-sm font-medium text-gray-700">
            No activities recorded
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Activities and achievements will appear here when added by the
            school.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {studentProfile.activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-3.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800">
                  {activity.title}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {activity.category}
                  {activity.role ? ` · ${activity.role}` : ""}
                </p>
              </div>

              <span className="shrink-0 text-xs font-medium text-gray-400">
                {activity.year}
              </span>
            </div>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}