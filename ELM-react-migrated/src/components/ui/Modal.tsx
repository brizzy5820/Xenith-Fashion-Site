"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  }[size];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className={`relative flex w-full flex-col ${sizeClass} max-h-[calc(100vh-1.5rem)] overflow-hidden rounded-xl bg-white shadow-xl sm:max-h-[calc(100vh-2rem)]`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-brand-700 border-b border-gray-100 px-5 py-4">
          {title ? (
            <h2 className="text-base font-semibold text-white">{title}</h2>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
