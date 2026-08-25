"use client";

import { useState, useRef } from "react";
import {
  CalendarDays,
  BookOpen,
  Download,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import {
  assignments,
  type Assignment,
} from "@/features/students/assignments/data/Assignment";

interface AssignmentSubmissionModalProps {
  open: boolean;
  onClose: () => void;
}

export function AssignmentSubmissionModal({
  open,
  onClose,
}: AssignmentSubmissionModalProps) {
  const pending = assignments.filter(
    (item) => item.status === "pending" || item.status === "overdue"
  );

  const availableSubjects = [...new Set(pending.map((item) => item.subject))];

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjectAssignments = selectedSubject
    ? pending.filter((item) => item.subject === selectedSubject)
    : [];

  const selected = pending.find(
    (item) => item.id === selectedId && item.subject === selectedSubject
  );

  const getAssignmentNumber = (assignment: Assignment) => {
    const match = assignment.id.match(/(\d+)$/);
    return match ? match[1].padStart(2, "0") : "—";
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF or image files (JPG, PNG, WEBP) are allowed.");
      return;
    }
    if (selectedFile.size > maxSize) {
      alert("File size must be 2MB or less.");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setNotice(null);
    setFile(null);

    if (!value) {
      setSelectedId("");
      return;
    }

    const nextAssignments = pending.filter((item) => item.subject === value);
    if (nextAssignments.length === 0) {
      setSelectedId("");
      setNotice("No pending assignments are available for this subject.");
      return;
    }

    setSelectedId(nextAssignments[0].id);
  };

  const handleAssignmentChange = (value: string) => {
    if (!selectedSubject) {
      const message = "Please select a subject before choosing an assignment.";
      setNotice(message);
      alert(message);
      return;
    }

    setNotice(null);
    setSelectedId(value);
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleSubmit = async () => {
    if (!selected || !file) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFile(null);
      onClose();
    }, 1200);
  };

  const statusColor =
    selected?.status === "overdue"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-brand-50 text-brand-700 border-brand-200";

  if (pending.length === 0) {
    return (
      <Modal open={open} onClose={onClose} title="Submit Assignment">
        <div className="py-10 text-center">
          <BookOpen className="mx-auto mb-3 h-9 w-9 text-brand-300" />
          <p className="text-sm font-medium text-gray-800">
            No pending assignments
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            You currently have no unsubmitted assignments.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Assignment Submission">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="subject-select"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Subject
            </label>
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">Select subject</option>
              {availableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="assignment-select"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Assignment
            </label>
            <select
              id="assignment-select"
              value={selectedId}
              disabled={!selectedSubject}
              onChange={(e) => handleAssignmentChange(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {!selectedSubject ? (
                <option value="">Select subject first</option>
              ) : (
                <>
                  {subjectAssignments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {getAssignmentNumber(item)} — {item.title}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>

        {notice && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
          >
            {notice}
          </div>
        )}

        {selected && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Status
              </label>
              <div
                className={`inline-flex h-10 items-center rounded-lg border px-3 text-sm font-medium ${statusColor}`}
              >
                {selected.status === "overdue" ? "Overdue" : "Pending"}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Submission Period
              </label>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700">
                <CalendarDays className="h-4 w-4 text-brand-600" />
                <span>
                  Due {selected.submissionEnd}
                  {selected.status === "overdue" && (
                    <span className="ml-1.5 text-red-600">(Late)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {selected && (
          <button
            type="button"
            onClick={() => {
              alert(`Downloading question paper for: ${selected.title}`);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800 active:scale-[0.99]"
          >
            <Download className="h-4 w-4" />
            Download Assignment Question
          </button>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Upload Assignment File{" "}
            <span className="font-normal text-gray-400">
              (.pdf or image · Max 2MB)
            </span>
          </label>

          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition ${
                isDragging
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-300 bg-gray-50/50 hover:border-brand-400 hover:bg-brand-50/40"
              }`}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Click to upload or drag & drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF, JPG, PNG or WEBP (max. 2MB)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50/70 p-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                {file.type === "application/pdf" ? (
                  <FileText className="h-5 w-5 text-brand-600" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-brand-600" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                className="rounded-md p-1.5 text-gray-400 transition hover:bg-white hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* ===== Footer Actions ===== */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file || isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}