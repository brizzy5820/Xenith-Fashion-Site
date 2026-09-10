"use client";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { getMaterial } from "@/features/students/classes/data/materials";
import { MaterialViewer } from "@/features/students/classes/components/MaterialViewer";

export default function MaterialViewerPage() {
  const { materialId } = useParams();
  const material = getMaterial(materialId);

  if (!material) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-sm font-medium text-brand-600">Material not found</p>
          <h1 className="mt-2 text-2xl font-semibold text-brand-900">
            This document isn't available
          </h1>
          <Link
            to="/students/classes"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <FileText size={16} />
            Back to my classes
          </Link>
        </div>
      </main>
    );
  }

  return <MaterialViewer material={material} />;
}
