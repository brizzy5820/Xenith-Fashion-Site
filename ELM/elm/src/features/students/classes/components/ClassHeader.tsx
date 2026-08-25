"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, UserRound } from "lucide-react";

interface ClassHeaderProps {
  subject: string;
  code: string;
  teacher: string;
}

export function ClassHeader({
  subject,
  code,
  teacher,
}: ClassHeaderProps) {
  return (
    <section className="mb-7">
      <Link
        href="/students/classes"
        className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-brand-700"
      >
        <ArrowLeft size={16} />
        My Classes
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <BookOpen
              size={21}
              className="text-brand-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {subject}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {code}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
          <UserRound
            size={16}
            className="text-gray-400"
          />

          <span className="text-sm text-gray-600">
            {teacher}
          </span>
        </div>
      </div>
    </section>
  );
}