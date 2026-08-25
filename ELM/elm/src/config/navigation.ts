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
      name: "Dashboard",
      href: "/students",
      icon: Home,
    },
    {
      name: "Profile",
      href: "/students/profile",
      icon: User,
    },
    {
      name: "My Classes",
      href: "/students/classes",
      icon: Users,
    },
    {
      name: "Assignments",
      href: "/students/assignments",
      icon: FileText,
    },
     {
      name: "Timetable & Schedules",
      href: "/students/schedule",
      icon: CalendarDays,
    },
    {
      name: "Learning Materials",
      href: "/students/materials",
      icon: BookOpen,
    },
    {
      name: "Examination Results",
      href: "/students/results",
      icon: BarChart3,
    },
    {
      name: "Attendance",
      href: "/students/attendance",
      icon: ClipboardCheck,
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