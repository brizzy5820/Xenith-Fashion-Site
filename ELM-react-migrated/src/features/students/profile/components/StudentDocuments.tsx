import {
  CheckCircle2,
  FileText,
  FolderOpen,
} from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

export function StudentDocuments() {
  return (
    <ProfileSectionCard
      title="Documents"
      description="Documents associated with your student record"
      icon={FolderOpen}
    >
      <div className="space-y-2">
        {studentProfile.documents.map((document) => (
          <div
            key={document.id}
            className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600">
              <FileText size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {document.name}
              </p>

              <p className="mt-0.5 text-[11px] text-gray-400">
                {document.type} · {document.uploadedAt}
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
              <CheckCircle2 size={11} />
              {document.status}
            </span>
          </div>
        ))}
      </div>
    </ProfileSectionCard>
  );
}