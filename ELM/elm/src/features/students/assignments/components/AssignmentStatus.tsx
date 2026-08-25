import type { AssignmentStatus as Status } from "@/src/features/students/assignments/data/Assignment";

interface AssignmentStatusProps {
  status: Status;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700",
  },

  submitted: {
    label: "Submitted",
    className: "bg-blue-50 text-blue-700",
  },

  overdue: {
    label: "Overdue",
    className: "bg-red-50 text-red-700",
  },

  graded: {
    label: "Graded",
    className: "bg-green-50 text-green-700",
  },
};

export function AssignmentStatus({
  status,
}: AssignmentStatusProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}