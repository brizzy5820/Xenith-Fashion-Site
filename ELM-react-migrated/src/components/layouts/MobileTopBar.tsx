'use client'
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { getNotificationsHref, getProfileHref, UserRole } from "@/config/navigation";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { studentProfile } from "@/features/students/profile/data/studentProfile";
import { MobileSearch } from "@/components/search/GlobalSearch";

interface MobileTopBarProps {
  role: UserRole;
}

export function MobileTopBar({ role }: MobileTopBarProps) {
  const hidden = useHideOnScroll();

  const profileHref = getProfileHref(role);
  const notificationsHref = getNotificationsHref(role);

  const initials = studentProfile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur transition-transform duration-300 ease-in-out md:hidden ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
        <img
          src="/public/img/graduate.png"
          alt="ELM Logo"
          className="h-7 w-7 shrink-0 rounded-lg object-contain"
        />
        <span>ELM</span>
      </Link>

      <div className="flex items-center gap-1.5">
        <MobileSearch role={role} />

        <Link
          to={notificationsHref}
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
        >
          <Bell size={20} />
        </Link>

        <Link
          to={profileHref}
          aria-label="Profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          {studentProfile.photo ? (
            <img
              src={studentProfile.photo}
              alt={studentProfile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </Link>
      </div>
    </header>
  );
}
