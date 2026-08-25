"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, ImageIcon, CheckCircle2 } from "lucide-react";

const ACCEPTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg,.webp,.gif";

interface AssignmentSubmissionFormProps {
  assignmentId: string;
}

export function AssignmentSubmissionForm({
  assignmentId,
}: AssignmentSubmissionFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onFileSelect = useCallback(
    (next: File | null) => {
      setFile(next);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(false);

      const next = e.dataTransfer.files?.[0];
      if (next) {
        onFileSelect(next);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.files?.[0];
      if (next) {
        onFileSelect(next);
      }
    },
    [onFileSelect]
  );

  const handleRemove = () => {
    onFileSelect(null);
  };

  const handleSubmit = () => {
    if (!file || isSubmitting) return;

    setIsSubmitting(true);

    const timer = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);

    return () => clearTimeout(timer);
  };

  const isImage = file && file.type.startsWith("image/");
  const fileIcon = isImage ? (
    <ImageIcon className="h-6 w-6 text-brand-600" />
  ) : (
    <FileText className="h-6 w-6 text-brand-600" />
  );

  if (isSubmitted) {
    return (
      <div className="mt-6 rounded-lg bg-green-50 p-5 text-center">
        <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-green-600" />
        <p className="text-sm font-semibold text-green-800">
          Assignment submitted successfully
        </p>
        <p className="mt-1 text-xs text-green-700">
          Your file has been recorded as your submission.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Submit your work
      </h3>

      <p className="text-xs text-gray-500">
        Upload a PDF or image (PNG, JPG, WEBP) of your completed work.
      </p>

      <div
        role="button"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            document
              .getElementById(`assignment-file-input-${assignmentId}`)
              ?.click();
          }
        }}
        className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-gray-50 p-6 text-center transition ${
          isDragging
            ? "border-brand-600 bg-brand-50"
            : "border-gray-300 hover:border-brand-600 hover:bg-brand-50/50"
        }`}
      >
        <input
          id={`assignment-file-input-${assignmentId}`}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          className="sr-only"
          onChange={handleFileChange}
        />

        <Upload className="mb-3 h-7 w-7 text-gray-400" />

        <p className="text-sm font-medium text-gray-700">
          {isDragging
            ? "Drop your file here"
            : "Click to upload or drag and drop"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, PNG, JPG, WEBP (max 10MB)
        </p>
      </div>

      {file && (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5">
          <div className="flex items-center gap-2 truncate">
            {fileIcon}
            <span className="block max-w-[180px] truncate text-sm font-medium text-gray-700">
              {file.name}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {isImage && file && (
        <div className="max-w-[200px] rounded-lg border border-gray-200 p-1">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="h-auto w-full rounded"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!file || isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Submit Assignment
          </>
        )}
      </button>
    </div>
  );
}
