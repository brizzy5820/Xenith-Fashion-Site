// Mock catalogue of downloadable learning materials (lecture handouts, etc.).
//
// Swap `fileUrl` for real teacher-uploaded files in production. The ids match
// the `material.href` values used on the class detail page so the links resolve.

export interface Material {
  id: string;
  title: string;
  subject: string;
  classId?: string;
  fileUrl: string;
}

export const materials: Record<string, Material> = {
  "functions-and-limits": {
    id: "functions-and-limits",
    title: "Functions and Limits — Handout",
    subject: "Mathematics",
    classId: "mathematics",
    fileUrl: "/materials/functions-and-limits.pdf",
  },
  differentiation: {
    id: "differentiation",
    title: "Differentiation — Formula Sheet",
    subject: "Mathematics",
    classId: "mathematics",
    fileUrl: "/materials/differentiation.pdf",
  },
  "techniques-differentiation-1": {
    id: "techniques-differentiation-1",
    title: "Techniques of Differentiation — Notes",
    subject: "Mathematics",
    classId: "mathematics",
    fileUrl: "/materials/techniques-differentiation-1.pdf",
  },
  "applications-differentiation-1": {
    id: "applications-differentiation-1",
    title: "Applications of Differentiation — Problem Set",
    subject: "Mathematics",
    classId: "mathematics",
    fileUrl: "/materials/applications-differentiation-1.pdf",
  },
};

export function getMaterial(id: string | undefined): Material | undefined {
  if (!id) return undefined;
  return materials[id];
}
