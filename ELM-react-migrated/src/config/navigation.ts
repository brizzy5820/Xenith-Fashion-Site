import type { LucideIcon } from "lucide-react";
import {
  Home,
  FileText,
  BookOpen,
  BarChart3,
  ClipboardCheck,
  CalendarDays,
  Bell,
  Users,
  
  User,
  Book,
  BookText,
  Monitor,
  Settings,
} from "lucide-react";

export type UserRole = "student" | "teacher" | "admin";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navigation: Record<UserRole, NavigationItem[]> = {
  student: [
    {
      name: "Home",
      href: "/students",
      icon: Home,
    },
  
    {
      name: "My Classes",
      href: "/students/classes",
      icon: BookOpen,
    },
    {
      name: "Assignments",
      href: "/students/assignments",
      icon: FileText,
    },
     {
      name: "Timetable",
      href: "/students/schedule",
      icon: CalendarDays,
    },
     {
      name: "Results",
      href: "/students/results",
      icon: BarChart3,
    },
    {
      name: "Learning Materials",
      href: "/students/materials",
      icon: BookText,
    },
   
    {
      name: "Attendance",
      href: "/students/attendance",
      icon: ClipboardCheck,
    },
      {
      name: "Profile",
      href: "/students/profile",
      icon: User,
    },
    {
      name: "Notifications",
      href: "/students/notifications",
      icon: Bell,
    },
  ],

  teacher: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "My Classes",
      href: "/classes",
      icon: Users,
    },
    {
      name: "Students",
      href: "/students",
      icon: Users,
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Assignments",
      href: "/assignments",
      icon: FileText,
    },
    {
      name: "Learning Materials",
      href: "/materials",
      icon: BookOpen,
    },
    {
      name: "Results",
      href: "/results",
      icon: BarChart3,
    },
    {
      name: "CBT",
      href: "/cbt",
      icon: Monitor,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ],

  admin: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Students",
      href: "/students",
      icon: Users,
    },
    {
      name: "Teachers",
      href: "/teachers",
      icon: User,
    },
    {
      name: "Classes",
      href: "/classes",
      icon: Users,
    },
    {
      name: "Subjects",
      href: "/subjects",
      icon: Book,
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Assignments",
      href: "/assignments",
      icon: FileText,
    },
    {
      name: "Learning Materials",
      href: "/materials",
      icon: BookOpen,
    },
    {
      name: "Results",
      href: "/results",
      icon: BarChart3,
    },
    {
      name: "CBT",
      href: "/cbt",
      icon: Monitor,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ],
};

function findHref(role: UserRole, name: string): string {
  const items = navigation[role] ?? [];
  return items.find((item) => item.name === name)?.href ?? items[0]?.href ?? "/";
}

export function getProfileHref(role: UserRole): string {
  return findHref(role, "Profile");
}

export function getNotificationsHref(role: UserRole): string {
  return findHref(role, "Notifications");
}