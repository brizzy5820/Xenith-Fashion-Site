export type StudentProfile = {
  id: string;
  name: string;
  gender: string;
  dob: string;
  age: number;
  nationality: string;
  stateOfOrigin: string;
  religion: string;
  admissionYear: string;
  classLevel: string;
  classArm: string;
  section: string;
  department: string;
  house: string;
  formTeacher: string;
  academicSession: string;
  term: string;
  attendance: number;
  cgpa: string;
  status: "Active" | "Needs support" | "On probation";
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianOccupation: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  medicalCondition: string;
  bio: string;
};

export const studentProfile: StudentProfile = {
  id: "ST-2026-014",
  name: "Chinonso Adebayo",
  gender: "Male",
  dob: "April 18, 2011",
  age: 15,
  nationality: "Nigerian",
  stateOfOrigin: "Lagos State",
  religion: "Christianity",
  admissionYear: "2024/2025",
  classLevel: "SS2",
  classArm: "Green",
  section: "Science",
  department: "Senior Secondary",
  house: "Green House",
  formTeacher: "Mrs. Tola Ajayi",
  academicSession: "2025/2026",
  term: "First Term",
  attendance: 94,
  cgpa: "3.82",
  status: "Active",
  email: "chinonso.adebayo@elm-school.edu.ng",
  phone: "+234 808 345 1257",
  address: "17 Ojo Road, Surulere, Lagos",
  guardianName: "Mr. Bamidele Adebayo",
  guardianPhone: "+234 803 456 9912",
  guardianOccupation: "Civil Engineer",
  emergencyContactName: "Mrs. Ada Adebayo",
  emergencyContactPhone: "+234 816 781 4344",
  bloodGroup: "O+",
  medicalCondition: "No known medical condition",
  bio: "A bright and disciplined student with strong interest in mathematics, physics, and problem-solving. He is active in science club activities and consistently participates in class discussions.",
};
