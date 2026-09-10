'use client'
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  BookOpen,
} from "lucide-react";

import type { Assignment } from "@/features/students/assignments/data/Assignment";
import { AssignmentStatus } from "./AssignmentStatus";

interface AssignmentCardProps {
  assignment: Assignment;
}

export function AssignmentCard({
  assignment,
}: AssignmentCardProps) {
  return (
    <div className="rounded-xl  shadow-sm bg-white p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">
              {assignment.subject}
            </p>

            <h3 className="mt-1 font-semibold">
              {assignment.title}
            </h3>
          </div>
        </div>

        <AssignmentStatus status={assignment.status} />
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
        {assignment.description}
      </p>

      <div className="mt-5 flex items-center justify-between  pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays className="h-4 w-4" />
          <span>Due {assignment.submissionEnd}</span>
        </div>

        <Link
          to={`/students/assignments/${assignment.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}