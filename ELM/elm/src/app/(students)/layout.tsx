import { DashboardShell } from "./../../components/layouts/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="student">{children}</DashboardShell>;
}
