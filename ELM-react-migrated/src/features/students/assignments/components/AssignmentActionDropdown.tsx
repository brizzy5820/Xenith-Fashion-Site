"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FileText, Upload } from "lucide-react";

import { AssignmentSubmissionModal } from "./AssignmentSubmissionModal";

export function AssignmentActionDropdown() {
  const [open, setOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setShowSubmitModal(false);
      }
    };

    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openSubmit = () => {
    setOpen(false);
    setShowSubmitModal(true);
  };

  return (
    <>
      <div ref={containerRef} className="relative inline-block">
        <button
          type="button"
            onClick={openSubmit}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2"
        >
          <Upload size={16} />
          <span>Submit Asssignment</span>
        </button>

        {open && (
          <div
            className="absolute top-full right-0 mt-2 w-52 rounded-xl bg-white shadow-xl ring-1 ring-black/5"
            role="menu"
          >
            <div className="py-1">
              <button
                type="button"
                onClick={openSubmit}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-700"
                role="menuitem"
              >
                <Upload size={15} />
                <span>Submit Assignment</span>
              </button>

              <Link
                to="/students/assignments"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-brand-50 hover:text-brand-700"
                role="menuitem"
              >
                <FileText size={15} />
                <span>Manage Assignment</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <AssignmentSubmissionModal
        open={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
      />
    </>
  );
}
