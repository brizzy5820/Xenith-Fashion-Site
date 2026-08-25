import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";

import {
  assignments,
} from "@/src/features/students/assignments/data/Assignment";

import {
  AssignmentStatus,
} from "@/src/features/students/assignments/components/AssignmentStatus";

import {
  AssignmentSubmissionForm,
} from "@/src/features/students/assignments/components/AssignmentSubmissionForm";

interface AssignmentDetailsPageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

export default async function AssignmentDetailsPage({
  params,
}: AssignmentDetailsPageProps) {
  const { assignmentId } = await params;

  const assignment = assignments.find(
    (item) => item.id === assignmentId
  );

  if (!assignment) {
    return (
      <div className="flex min-h-[60vh]  items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Assignment not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The assignment you are looking for does not exist.
          </p>

          <Link
            href="/students/assignments"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Back navigation */}
      <Link
        href="/students/assignments"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to assignments
      </Link>

      {/* Assignment header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                {assignment.subject}
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                {assignment.title}
              </h1>
            </div>
          </div>

          <AssignmentStatus
            status={assignment.status}
          />

        </div>

        {/* Metadata */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-200 pt-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="h-4 w-4" />
            <span>
              Due {assignment.dueDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock3 className="h-4 w-4" />
            <span>
              Submission deadline
            </span>
          </div>

          {assignment.totalMarks && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>
                {assignment.totalMarks} marks
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Instructions */}
        <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold">
            Assignment Instructions
          </h2>

          <div className="mt-5 border-t border-gray-200 pt-5">
            <p className="text-sm leading-7 text-gray-600">
              {assignment.description}
            </p>
          </div>
        </section>

        {/* Submission summary */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Submission
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-sm text-gray-500">
                Status
              </span>

              <AssignmentStatus
                status={assignment.status}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Deadline
              </span>

              <span className="text-sm font-medium">
                {assignment.dueDate}
              </span>
            </div>

          </div>

          {assignment.status === "pending" && (
            <AssignmentSubmissionForm assignmentId={assignment.id} />
          )}

          {assignment.status === "submitted" && (
            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
              Your assignment has been submitted.
            </div>
          )}

          {assignment.status === "graded" && (
            <div className="mt-6 rounded-lg bg-green-50 p-4">
              <p className="text-sm text-green-700">
                Assignment graded
              </p>

              <p className="mt-1 text-2xl font-semibold text-green-800">
                {assignment.score}/{assignment.totalMarks}
              </p>
            </div>
          )}

        </section>

      </div>

    </div>
  );
}