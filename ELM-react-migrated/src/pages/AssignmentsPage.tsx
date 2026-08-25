"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/Modal";
import {
  assignments,
  filterAssignments,
  type Assignment,
} from "@/features/students/assignments/data/Assignment";

import { AssignmentCard } from "@/features/students/assignments/components/AssignmentCard";

import {
  AssignmentTabs,
  type AssignmentTab,
} from "@/features/students/assignments/components/AssignmentTabs";

import { AssignmentActionDropdown } from "@/features/students/assignments/components/AssignmentActionDropdown";

const ASSIGNMENT_TAB_LABELS: Record<AssignmentTab, string> = {
  all: "All Assignments",
  pending: "Pending Assignments",
  submitted: "Submitted Assignments",
  overdue: "Overdue Assignments",
  graded: "Graded Assignments",
};

const STATUS_OPTIONS: Assignment["status"][] = [
  "pending",
  "submitted",
  "overdue",
  "graded",
];

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<AssignmentTab>("all");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Assignment["status"][]>([]);

  const subjectOptions = useMemo(
    () => [...new Set(assignments.map((assignment) => assignment.subject))],
    []
  );

  const pending = assignments.filter(
    (assignment) => assignment.status === "pending"
  ).length;

  const submitted = assignments.filter(
    (assignment) => assignment.status === "submitted"
  ).length;

  const overdue = assignments.filter(
    (assignment) => assignment.status === "overdue"
  ).length;

  const graded = assignments.filter(
    (assignment) => assignment.status === "graded"
  ).length;

  const filteredByTab = useMemo(() => {
    const base = assignments.filter((assignment) => {
      const matchesSubject =
        selectedSubjects.length === 0 ||
        selectedSubjects.includes(assignment.subject);

      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(assignment.status);

      return matchesSubject && matchesStatus;
    });

    return filterAssignments(base, activeTab);
  }, [activeTab, selectedStatuses, selectedSubjects]);

  const visibleAssignments: Assignment[] = filterBySearch(
    filteredByTab,
    search
  );
  const showEmpty = visibleAssignments.length === 0;

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject]
    );
  };

  const toggleStatus = (status: Assignment["status"]) => {
    setSelectedStatuses((current) =>
      current.includes(status)
        ? current.filter((item) => item !== status)
        : [...current, status]
    );
  };

  return (
    <div className="mb-15 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your academic assignments.
        </p>
      </div>

      <AssignmentTabs
        total={assignments.length}
        pending={pending}
        submitted={submitted}
        overdue={overdue}
        graded={graded}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search assignments..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-lg bg-white pl-9 pr-4 text-sm shadow outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-10 min-w-[110px] items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
            {(selectedSubjects.length > 0 || selectedStatuses.length > 0) && (
              <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
                {selectedSubjects.length + selectedStatuses.length}
              </span>
            )}
          </button>

          <AssignmentActionDropdown />
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{ASSIGNMENT_TAB_LABELS[activeTab]}</h2>

          <span className="text-sm text-gray-500">
            {visibleAssignments.length}{" "}
            {showEmpty
              ? ""
              : visibleAssignments.length === 1
                ? "assignment"
                : "assignments"}
          </span>
        </div>

        {showEmpty ? (
          <div className="rounded-xl bg-white px-5 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              No assignments match your filters
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or tab.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        )}
      </section>

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter assignments">
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Subjects</p>
            <div className="space-y-2">
              {subjectOptions.map((subject) => (
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

          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Status</p>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
                >
                  <span className="capitalize">{status}</span>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => {
                setSelectedSubjects([]);
                setSelectedStatuses([]);
              }}
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
    </div>
  );
}

function filterBySearch(list: Assignment[], search: string): Assignment[] {
  if (!search.trim()) return list;

  const query = search.toLowerCase();
  return list.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query)
  );
}
