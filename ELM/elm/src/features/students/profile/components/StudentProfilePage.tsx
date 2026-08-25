import {
  BookOpen,
  CalendarRange,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { studentProfile } from "../data/studentProfile";

const statCards = [
  { label: "Class", value: `${studentProfile.classLevel} ${studentProfile.classArm}` },
  { label: "Section", value: studentProfile.section },
  { label: "Attendance", value: `${studentProfile.attendance}%` },
  { label: "CGPA", value: studentProfile.cgpa },
];

const personalDetails = [
  { label: "Student ID", value: studentProfile.id },
  { label: "Date of birth", value: studentProfile.dob },
  { label: "Age", value: `${studentProfile.age} years` },
  { label: "Gender", value: studentProfile.gender },
  { label: "Nationality", value: studentProfile.nationality },
  { label: "State of origin", value: studentProfile.stateOfOrigin },
  { label: "Religion", value: studentProfile.religion },
  { label: "Blood group", value: studentProfile.bloodGroup },
];

const academicDetails = [
  { label: "Academic session", value: studentProfile.academicSession },
  { label: "Term", value: studentProfile.term },
  { label: "Department", value: studentProfile.department },
  { label: "House", value: studentProfile.house },
  { label: "Form teacher", value: studentProfile.formTeacher },
  { label: "Admission year", value: studentProfile.admissionYear },
  { label: "Status", value: studentProfile.status },
  { label: "Medical condition", value: studentProfile.medicalCondition },
];

const contactDetails = [
  { label: "Email", value: studentProfile.email },
  { label: "Phone", value: studentProfile.phone },
  { label: "Address", value: studentProfile.address },
  { label: "Guardian", value: `${studentProfile.guardianName} (${studentProfile.guardianOccupation})` },
  { label: "Guardian phone", value: studentProfile.guardianPhone },
  { label: "Emergency contact", value: studentProfile.emergencyContactName },
  { label: "Emergency phone", value: studentProfile.emergencyContactPhone },
];

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white px-3 py-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <ShieldCheck size={14} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export function StudentProfilePage() {
  const initials = studentProfile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen pb-10">
      <div className="space-y-6">
        <header className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-xl font-bold text-brand-700">
                {initials}
              </div>

              <div>
                <p className="text-sm font-medium text-brand-700">Student profile</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {studentProfile.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {studentProfile.classLevel} {studentProfile.classArm} • {studentProfile.section}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
              <ShieldCheck size={16} className="text-brand-600" />
              {studentProfile.status}
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                {card.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-gray-900">
                <UserRound size={18} className="text-brand-600" />
                <h2 className="text-lg font-semibold">Personal information</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {personalDetails.map((item) => (
                  <DetailItem key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-gray-900">
                <BookOpen size={18} className="text-brand-600" />
                <h2 className="text-lg font-semibold">Academic information</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {academicDetails.map((item) => (
                  <DetailItem key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-gray-900">
                <Users size={18} className="text-brand-600" />
                <h2 className="text-lg font-semibold">Contact & guardian</h2>
              </div>

              <div className="space-y-3">
                {contactDetails.map((item) => (
                  <DetailItem key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-gray-900">
                <GraduationCap size={18} className="text-brand-600" />
                <h2 className="text-lg font-semibold">Student summary</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-brand-50 p-4 text-sm leading-6 text-gray-700">
                  {studentProfile.bio}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-3 py-3 text-sm text-gray-700">
                    <Mail size={15} className="text-brand-600" />
                    <span>{studentProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-3 py-3 text-sm text-gray-700">
                    <Phone size={15} className="text-brand-600" />
                    <span>{studentProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-3 py-3 text-sm text-gray-700">
                    <MapPin size={15} className="text-brand-600" />
                    <span>{studentProfile.address}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-3 py-3 text-sm text-gray-700">
                    <CalendarRange size={15} className="text-brand-600" />
                    <span>{studentProfile.admissionYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
