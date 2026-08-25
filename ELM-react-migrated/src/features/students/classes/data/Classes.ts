import {
  getAssignmentSummaryBySubject,
  type AssignmentIndicatorState,
} from "@/features/students/assignments/data/Assignment";

const buildClassAssignmentMeta = (subject: string) => {
  const summary = getAssignmentSummaryBySubject(subject);

  return {
    assignments: summary.total,
    submittedAssignments: summary.submitted,
    unsubmittedAssignments: summary.unsubmitted,
    assignmentState: summary.state as AssignmentIndicatorState,
  };
};

export const classes = [
  {
    id: "mathematics",
    name: "Mathematics",
    code: "MTH 201",
    teacher: "Mr. Adeyemi",
    room: "Room 204",
    schedule: "Mon • 8:00 AM",
    progress: 82,
    isOngoing: true,
    ...buildClassAssignmentMeta("Mathematics"),
  },
  {
    id: "biology",
    name: "Biology",
    code: "BIO 201",
    teacher: "Mrs. Williams",
    room: "Laboratory 2",
    schedule: "Mon • 9:15 AM",
    progress: 76,
    ...buildClassAssignmentMeta("Biology"),
  },
  {
    id: "english",
    name: "English Language",
    code: "ENG 201",
    teacher: "Mrs. Okafor",
    room: "Room 108",
    schedule: "Mon • 11:00 AM",
    progress: 88,
    ...buildClassAssignmentMeta("English Language"),
  },
  {
    id: "physics",
    name: "Physics",
    code: "PHY 201",
    teacher: "Mr. Ibrahim",
    room: "Science Block",
    schedule: "Mon • 1:00 PM",
    progress: 84,
    ...buildClassAssignmentMeta("Physics"),
  },
  {
    id: "chemistry",
    name: "Chemistry",
    code: "CHE 201",
    teacher: "Mrs. Bello",
    room: "Laboratory 1",
    schedule: "Tue • 8:00 AM",
    progress: 79,
    ...buildClassAssignmentMeta("Chemistry"),
  },
  {
    id: "computer-science",
    name: "Computer Science",
    code: "CSC 201",
    teacher: "Mr. James",
    room: "ICT Lab",
    schedule: "Tue • 10:00 AM",
    progress: 91,
    ...buildClassAssignmentMeta("Computer Science"),
  },
];

export type StudentClass = (typeof classes)[number];
