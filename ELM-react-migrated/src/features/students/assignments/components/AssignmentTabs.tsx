"use client";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

export type AssignmentTab =
  | "all"
  | "pending"
  | "submitted"
  | "overdue"
  | "graded";

interface AssignmentTabsProps {
  total: number;
  pending: number;
  submitted: number;
  overdue: number;
  graded: number;
  activeTab: AssignmentTab;
  onTabChange: (tab: AssignmentTab) => void;
}

export function AssignmentTabs({
  total,
  pending,
  submitted,
  overdue,
  graded,
  activeTab,
  onTabChange,
}: AssignmentTabsProps) {
  const tabs: {
    id: AssignmentTab;
    label: string;
    count: number;
    icon: React.ElementType;
  }[] = [
    { id: "all", label: "All", count: total, icon: ClipboardList },
    { id: "pending", label: "Pending", count: pending, icon: Clock3 },
    { id: "submitted", label: "Submitted", count: submitted, icon: CheckCircle2 },
    { id: "overdue", label: "Overdue", count: overdue, icon: AlertCircle },
    { id: "graded", label: "Graded", count: graded, icon: CheckSquare },
  ];

  return (
    <div className="border-b border-gray-200 bg-white rounded-xl ">
      <nav
        className="isolate -mb-px flex items-center gap-2 overflow-x-auto p-2"
        aria-label="Assignment filters"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-pressed={isActive}
              className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all outline-none ${
                isActive
                  ? "bg-brand-100 text-brand-700 shadow"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4" />

              <span>{tab.label}</span>

              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-brand-100 text-brand-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>

            </button>
          );
        })}
      </nav>
    </div>
  );
}

