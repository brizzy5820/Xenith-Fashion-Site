"use client";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import type { Material } from "@/features/students/classes/data/materials";

export function MaterialViewer({ material }: { material: Material }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (material.classId) navigate(`/students/classes/${material.classId}`);
    else navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50/60 via-[#f4faf6] to-white">
      {/* Top bar with download */}
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back to class"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
              <FileText size={16} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-brand-900">
                {material.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {material.subject} • PDF
              </p>
            </div>
          </div>

          <a
            href={material.fileUrl}
            download
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </header>

      {/* Document */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
          <iframe
            title={material.title}
            src={`${material.fileUrl}#view=FitH`}
            className="h-[calc(100vh-9rem)] w-full"
          />
        </div>

        {/* Bottom download */}
        <div className="mt-5 flex justify-center">
          <a
            href={material.fileUrl}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            <Download size={18} />
            Download this PDF
          </a>
        </div>
      </main>
    </div>
  );
}
