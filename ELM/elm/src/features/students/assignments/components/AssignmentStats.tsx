import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface AssignmentStatsProps {
  total: number;
  pending: number;
  submitted: number;
  overdue: number;
}

export function AssignmentStats({
  total,
  pending,
  submitted,
  overdue,
}: AssignmentStatsProps) {
  const stats = [
    {
      label: "Total",
      value: total,
      icon: ClipboardList,
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
    },
    {
      label: "Submitted",
      value: submitted,
      icon: CheckCircle2,
    },
    {
      label: "Overdue",
      value: overdue,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-brand-100 shadow-sm bg-white p-5 transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                <Icon className="h-5 w-5 text-brand-600" />
              </span>
            </div>

            <p className="mt-3 text-2xl font-semibold text-brand-700">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}