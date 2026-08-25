export type EnrollmentStatus =
  | "enrolled"
  | "pending"
  | "not_enrolled"
  | "completed"
  | "withdrawn";

export type StudentStatus = "Active" | "Inactive" | "Graduated" | "Suspended";

export interface StudentEnrollment {
  id: string;
  academicSession: string;
  term: string;
  classLevel: string;
  classArm: string;
  section: string;
  department: string;
  house: string;
  formTeacher: string;
  status: EnrollmentStatus;
  enrolledAt: string;
}

export interface Guardian {
  id: string;
  name: string;
  relationship: string;
  occupation: string;
  phone: string;
  email: string;
  address: string;
  isPrimary: boolean;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "Verified" | "Pending";
}

export interface StudentActivity {
  id: string;
  title: string;
  category: string;
  role?: string;
  year: string;
}

export const studentProfile = {
  id: "ELM-2026-00124",
  admissionNumber: "ADM-2026-00124",

  name: "Egbeyemi Boluwatife David",
  firstName: "Boluwatife",
  middleName: "",
  lastName: "Adebayo",

  photo: null,

  status: "Active" as StudentStatus,

  personal: {
    dob: "14 March 2010",
    age: 16,
    gender: "Male",
    nationality: "Nigerian",
    stateOfOrigin: "Lagos",
    religion: "Christianity",
  },

  contact: {
    email: "boluwatife@example.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
  },

  health: {
    bloodGroup: "O+",
    genotype: "AA",
    medicalCondition: "None reported",
    allergies: "None reported",
    accessibilityNeeds: "None reported",
  },

  academic: {
    attendance: 94,
    cgpa: "4.62",
    currentTerm: "First Term",
  },

  currentEnrollment: {
    id: "ENR-2026-00124",
    academicSession: "2026/2027",
    term: "First Term",
    classLevel: "SS2",
    classArm: "A",
    section: "Science",
    department: "Science",
    house: "Blue House",
    formTeacher: "Mr. Adekunle",
    status: "enrolled" as EnrollmentStatus,
    enrolledAt: "03 September 2026",
  },

  guardians: [
    {
      id: "G-001",
      name: "Adebayo James",
      relationship: "Father",
      occupation: "Engineer",
      phone: "+234 802 111 2233",
      email: "james.adebayo@example.com",
      address: "Lagos, Nigeria",
      isPrimary: true,
    },
    {
      id: "G-002",
      name: "Adebayo Funmi",
      relationship: "Mother",
      occupation: "Accountant",
      phone: "+234 803 444 5566",
      email: "funmi.adebayo@example.com",
      address: "Lagos, Nigeria",
      isPrimary: false,
    },
  ] satisfies Guardian[],

  emergencyContact: {
    name: "Adebayo James",
    relationship: "Father",
    phone: "+234 802 111 2233",
  },

  documents: [
    {
      id: "DOC-001",
      name: "Birth Certificate",
      type: "Identity",
      uploadedAt: "04 September 2026",
      status: "Verified",
    },
    {
      id: "DOC-002",
      name: "Admission Letter",
      type: "Admission",
      uploadedAt: "04 September 2026",
      status: "Verified",
    },
    {
      id: "DOC-003",
      name: "Student Photograph",
      type: "Profile",
      uploadedAt: "04 September 2026",
      status: "Verified",
    },
  ] satisfies StudentDocument[],

  activities: [
    {
      id: "ACT-001",
      title: "Science & Technology Club",
      category: "Club",
      role: "Member",
      year: "2026",
    },
    {
      id: "ACT-002",
      title: "Inter-house Athletics",
      category: "Sports",
      role: "Participant",
      year: "2026",
    },
  ] satisfies StudentActivity[],

  enrollmentHistory: [] as StudentEnrollment[],
};