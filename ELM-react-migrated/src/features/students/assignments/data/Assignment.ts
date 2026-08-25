// data/Assignment.ts

export type AssignmentStatus =
  | "pending"
  | "submitted"
  | "overdue"
  | "graded";

export type AssignmentIndicatorState =
  | "empty"
  | "submitted"
  | "unsubmitted";

export interface Assignment {
  id: string;

  // Assignment identification
  number: number;
  title: string;

  // Subject / class
  subject: string;

  description: string;

  // Submission window
  submissionStart: string;
  submissionEnd: string;

  // Assignment question/document
  assignmentFile?: {
    name: string;
    url: string;
  };

  status: AssignmentStatus;

  score?: number;
  totalMarks?: number;
}

export interface AssignmentSummary {
  total: number;
  submitted: number;
  unsubmitted: number;
  state: AssignmentIndicatorState;
}

const STATUS_FILTERS: Record<
  string,
  AssignmentStatus[] | undefined
> = {
  pending: ["pending", "overdue"],
  submitted: ["submitted"],
  overdue: ["overdue"],
  graded: ["graded"],
};

export function filterAssignments(
  list: Assignment[],
  tab: string
): Assignment[] {
  if (tab === "all") return list;

  const allowed = STATUS_FILTERS[tab];

  if (!allowed) return list;

  return list.filter((item) =>
    allowed.includes(item.status)
  );
}

export function getUnsubmittedAssignmentsBySubject(
  subject: string,
  list: Assignment[] = assignments
): Assignment[] {
  return list.filter(
    (item) =>
      item.subject === subject &&
      (item.status === "pending" ||
        item.status === "overdue")
  );
}

export function getAssignmentSummaryBySubject(
  subject: string,
  list: Assignment[] = assignments
): AssignmentSummary {
  const filtered = list.filter(
    (item) => item.subject === subject
  );

  const submitted = filtered.filter(
    (item) => item.status === "submitted"
  ).length;

  const unsubmitted = filtered.filter(
    (item) =>
      item.status === "pending" ||
      item.status === "overdue"
  ).length;

  return {
    total: filtered.length,
    submitted,
    unsubmitted,
    state:
      filtered.length === 0
        ? "empty"
        : unsubmitted > 0
          ? "unsubmitted"
          : "submitted",
  };
}

export const assignments: Assignment[] = [
  {
    id: "assignment-001",
    number: 1,
    title: "Quadratic Equations",
    subject: "Mathematics",
    description:
      "Solve the given quadratic equations and show all working steps.",
    submissionStart: "Aug 8, 2026",
    submissionEnd: "Aug 12, 2026",
    assignmentFile: {
      name: "Quadratic Equations.pdf",
      url: "/assignments/quadratic-equations.pdf",
    },
    status: "pending",
    totalMarks: 20,
  },

  {
    id: "assignment-002",
    number: 2,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    description:
      "Explain Newton's three laws of motion and provide practical examples.",
    submissionStart: "Aug 9, 2026",
    submissionEnd: "Aug 14, 2026",
    assignmentFile: {
      name: "Newton's Laws.pdf",
      url: "/assignments/newtons-laws.pdf",
    },
    status: "submitted",
    totalMarks: 20,
  },

  {
    id: "assignment-003",
    number: 3,
    title: "Cell Structure",
    subject: "Biology",
    description:
      "Draw and label a typical animal cell and explain its major components.",
    submissionStart: "Aug 10, 2026",
    submissionEnd: "Aug 16, 2026",
    assignmentFile: {
      name: "Cell Structure.pdf",
      url: "/assignments/cell-structure.pdf",
    },
    status: "pending",
    totalMarks: 25,
  },

  {
    id: "assignment-004",
    number: 4,
    title: "Essay Writing",
    subject: "English Language",
    description:
      "Write an essay discussing the importance of technology in education.",
    submissionStart: "Jul 30, 2026",
    submissionEnd: "Aug 5, 2026",
    assignmentFile: {
      name: "Essay Writing.pdf",
      url: "/assignments/essay-writing.pdf",
    },
    status: "graded",
    score: 18,
    totalMarks: 20,
  },

  {
    id: "assignment-005",
    number: 5,
    title: "Organic Compounds",
    subject: "Chemistry",
    description:
      "Identify and explain the major classes of organic compounds.",
    submissionStart: "Aug 1, 2026",
    submissionEnd: "Aug 7, 2026",
    assignmentFile: {
      name: "Organic Compounds.pdf",
      url: "/assignments/organic-compounds.pdf",
    },
    status: "overdue",
    totalMarks: 20,
  },
];