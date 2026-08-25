import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getProfileSection } from "./profileSections";

export function ProfileSectionDetail() {
  const { section } = useParams();
  const entry = getProfileSection(section);

  return (
    <main className="min-h-screen pb-10">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link
          to="/students/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-brand-700"
        >
          <ArrowLeft size={16} />
          Back to profile
        </Link>

        {entry ? (
          <entry.Component />
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-700">Section not found</p>
            <p className="mt-1 text-xs text-gray-400">
              This profile section doesn&apos;t exist.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
