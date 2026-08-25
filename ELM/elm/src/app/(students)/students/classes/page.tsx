"use client";

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

import { Modal } from "@/src/components/ui/Modal";
import { ClassCard } from "@/src/features/students/classes/components/ClassCard";
import { ClassFilters } from "@/src/features/students/classes/components/ClassFilters";

import { classes } from "@/src/features/students/classes/data/Classes";
import {
  getAssignmentSummaryBySubject,
} from "@/src/features/students/assignments/data/Assignment";

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const classSubjects = useMemo(
    () => [...new Set(classes.map((classItem) => classItem.name))],
    []
  );

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const matched = classes.filter((classItem) => {
      const matchesQuery =
        !query ||
        classItem.name.toLowerCase().includes(query) ||
        classItem.code.toLowerCase().includes(query) ||
        classItem.teacher.toLowerCase().includes(query);

      const matchesSubject =
        selectedSubjects.length === 0 ||
        selectedSubjects.includes(classItem.name);

      return matchesQuery && matchesSubject;
    });

    return matched.map((classItem) => {
      const summary = getAssignmentSummaryBySubject(classItem.name);

      return {
        ...classItem,
        submittedAssignments: summary.submitted,
        unsubmittedAssignments: summary.unsubmitted,
        assignmentState: summary.state,
        hasUnsubmitted: summary.unsubmitted > 0,
      };
    });
  }, [search, selectedSubjects]);

  const totalAssignments = classes.reduce(
    (total, classItem) => total + classItem.assignments,
    0
  );

  const averageProgress = Math.round(
    classes.reduce(
      (total, classItem) => total + classItem.progress,
      0
    ) / classes.length
  );

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject]
    );
  };

  return (
    <main className="min-h-screen ">
      <div className="mx-auto">
        <section className="mb-7">
          <div className="flex items-start gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                My Classes
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View your enrolled classes, coursework, and academic progress.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <ClassFilters
            search={search}
            onSearchChange={setSearch}
            onFilterClick={() => setFilterOpen(true)}
            activeFilterCount={selectedSubjects.length}
          />
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Your Classes
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {filteredClasses.length}{" "}
                {filteredClasses.length === 1 ? "class" : "classes"}
              </p>
            </div>
          </div>

          {filteredClasses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredClasses.map((classItem) => (
                <ClassCard key={classItem.id} {...classItem} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white px-5 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                <BookOpen size={19} className="text-gray-400" />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-900">
                No classes found
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Try searching with another class name, code, or teacher.
              </p>
            </div>
          )}
        </section>
      </div>

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter classes">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Choose the subjects you want to view.
            </p>

            <div className="space-y-2">
              {classSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
                >
                  <span>{subject}</span>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => toggleSubject(subject)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setSelectedSubjects([])}
              className="text-sm font-medium text-gray-600 transition hover:text-gray-800"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Apply filters
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}