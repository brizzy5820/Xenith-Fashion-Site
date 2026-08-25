'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { navigation, UserRole } from "./../../config/navigation";

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  teacher: "Teacher",
  student: "Student",
};

export function Sidebar({ role, collapsed: collapsedProp, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Controlled when props are provided (inside DashboardShell), else self-managed.
  const collapsed = collapsedProp ?? internalCollapsed;
  const toggle = onToggle ?? (() => setInternalCollapsed((value) => !value));

  const items = navigation[role] || [];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen flex-col bg-brand-900 shadow-md transition-[width] duration-300 ease-in-out md:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse / expand toggle pinned to the edge */}
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-16 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-brand-700 bg-white text-brand-700 shadow-md transition hover:bg-brand-50"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      {/* Logo */}
      <div className={`flex h-16 items-center ${collapsed ? "justify-center px-0" : "px-6"}`}>
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <img
            src="/graduate.png"
            alt="ELM Logo"
            className="h-8 w-8 shrink-0 rounded-lg object-contain"
          />
          {!collapsed && <span>ELM</span>}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={`group flex items-center gap-3 rounded-lg py-2.5 text-sm transition-colors ${
                    collapsed ? "justify-center px-0" : "px-3"
                  } ${
                    isActive
                      ? "bg-brand-700 font-medium text-white"
                      : "text-brand-200 hover:bg-brand-700/60 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
                      isActive
                        ? "bg-brand-500 text-white"
                        : "bg-brand-900/40 text-brand-300 group-hover:bg-brand-600 group-hover:text-white"
                    }`}
                  >
                    <Icon width={16} height={16} />
                  </span>
                  {!collapsed && <span className="truncate">{item.name}</span>}
                  {!collapsed && isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-300" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Role footer */}
      <div className="border-t border-brand-700 p-3">
        <div
          className={`flex items-center gap-3 rounded-lg bg-brand-900/40 py-2.5 ${
            collapsed ? "justify-center px-0" : "px-3"
          }`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
            {(roleLabels[role] ?? role).charAt(0).toUpperCase()}
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {roleLabels[role] ?? role}
              </p>
              <p className="truncate text-xs text-brand-300">Signed in</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
