import { ArrowRight, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ProfileSectionCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: ReactNode;
  onView?: () => void;
  className?: string;
}

export function ProfileSectionCard({
  title,
  description,
  icon: Icon,
  children,
  onView,
  className = "",
}: ProfileSectionCardProps) {
  return (
    <section
      className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon size={17} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {title}
            </h2>

            {description && (
              <p className="mt-0.5 text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>

        {onView && (
          <button
            type="button"
            onClick={onView}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700 transition hover:text-brand-800"
          >
            View
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}