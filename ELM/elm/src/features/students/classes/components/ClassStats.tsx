import {
  BookOpen,
  FileText,
  GraduationCap,
} from "lucide-react";

interface ClassStatsProps {
  totalClasses: number;
  assignments: number;
  averageProgress: number;
}

export function ClassStats({
  totalClasses,
  assignments,
  averageProgress,
}: ClassStatsProps) {
  const stats = [
    {
      label: "Enrolled Classes",
      value: totalClasses,
      icon: BookOpen,
    },
    {
      label: "Pending Assignments",
      value: assignments,
      icon: FileText,
    },
    {
      label: "Average Progress",
      value: `${averageProgress}%`,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
              <Icon
                size={18}
                className="text-brand-600"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                {stat.label}
              </p>

              <p className="mt-0.5 text-lg font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}