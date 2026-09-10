'use client'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft,PanelLeft, PanelRight } from "lucide-react";
import { navigation, getProfileHref, UserRole } from "@/config/navigation";

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
  const { pathname } = useLocation();
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
   

      {/* Logo */}
      <div className={`flex h-16 justify-between items-center ${collapsed ? "justify-center px-0 flex-col gap-3 mt-3" : "px-6"}`}>
        <Link to="/" className={`flex items-center gap-2 text-xl font-bold text-white ${collapsed ? ' order-2': 'order' }`}>
          <img
            src="/public/img/graduate.png"
            alt="ELM Logo"
            className="h-8 w-8 shrink-0 rounded-lg object-contain "
          />
          {!collapsed && <span>ELM</span>}
        </Link>
           {/* Collapse / expand toggle pinned to the edge */}
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="  items-center justify-center  text-gray-100 shadow-md transition "
      >
        <PanelLeft
          size={16}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180 order-1" : ""}`}
        />
      </button>
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
                  to={item.href}
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
        <Link
          to={getProfileHref(role)}
          title={collapsed ? "Profile" : undefined}
          className={`flex items-center gap-3 rounded-lg bg-brand-900/40 py-2.5 transition-colors hover:bg-brand-700/60 ${
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
              <p className="truncate text-xs text-brand-300">View profile</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
