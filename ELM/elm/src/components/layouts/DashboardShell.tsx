'use client'
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { UserRole } from "./../../config/navigation";

interface DashboardShellProps {
  role: UserRole;
  children: React.ReactNode;
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/60 via-[#f4faf6] to-white">
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />

      <main
        className={`min-h-screen px-4 pb-24 pt-6 transition-[margin] duration-300 ease-in-out sm:px-6 md:pb-12 md:pt-10 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <div className="mx-auto w-full  max-w-4xl">{children}</div>
      </main>

      <MobileNav role={role} />
    </div>
  );
}
