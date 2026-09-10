import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { AcademicSnapshot } from "./AcademicSnapshot";
import { ProfileHeader } from "./ProfileHeader";
import { profileSections } from "./profileSections";

export function StudentProfilePage() {
  const handleSettings = () => {
    // Replace with your existing student settings route.
    console.log("Open profile settings");
  };

  return (
    <main className="min-h-screen pb-10">
      <div className="mx-auto max-w-5xl space-y-5">
        <div>
          <p className="text-sm font-medium text-brand-700">Student account</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
            Profile
          </h1>
        </div>

        <ProfileHeader onSettings={handleSettings} />

       

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profileSections.map(({ key, title, description, icon: Icon }) => (
            <Link
              key={key}
              to={`/students/profile/${key}`}
              className="group flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{description}</p>
              </div>

              <ChevronRight
                size={16}
                className="mt-0.5 shrink-0 text-gray-300 transition group-hover:text-brand-600"
              />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
