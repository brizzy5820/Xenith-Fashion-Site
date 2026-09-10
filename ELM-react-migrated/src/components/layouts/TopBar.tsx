"use client";

import { Link } from "react-router-dom";
import clsx from "clsx";
import { Bell } from "lucide-react";
import {
  getNotificationsHref,
  getProfileHref,
  type UserRole,
} from "@/config/navigation";
import { studentProfile } from "@/features/students/profile/data/studentProfile";
import { GlobalSearch } from "@/components/search/GlobalSearch";

interface TopBarProps {
  role: UserRole;
  collapsed: boolean;
}

const notificationCount = 3;

export function TopBar({ role, collapsed }: TopBarProps) {
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
      className={clsx(
        "fixed top-0 right-0 z-40  hidden h-16 items-center gap-4 border-b border-brand-100 bg-white/95 px-4 backdrop-blur transition-[left] duration-300 ease-in-out md:flex",
        collapsed ? "md:left-20" : "md:left-64"
      )}
    >
      <div className="flex flex-1 justify-center px-2">
        <GlobalSearch role={role} />
      </div>

      <div className="flex items-center gap-1.5">
        <Link
          to={notificationsHref}
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
              {notificationCount}
            </span>
          )}
        </Link>

        <Link
          to={profileHref}
          aria-label="Profile"
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
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
