"use client";

import { useMemo } from "react";
import { BookOpen, FileText, type LucideIcon } from "lucide-react";
import { navigation, type UserRole } from "@/config/navigation";
import { classes } from "@/features/students/classes/data/Classes";
import { assignments } from "@/features/students/assignments/data/Assignment";

export interface SearchSuggestion {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  icon: LucideIcon;
  group: string;
  keywords: string;
}

/**
 * Builds a searchable index from the data that already exists across the site
 * (navigation routes, enrolled classes and assignment records). The index is
 * recomputed only when the active role changes so that the suggestions stay in
 * sync with whatever the user is allowed to reach.
 */
export function useSiteSearch(role: UserRole) {
  const index = useMemo<SearchSuggestion[]>(() => {
    const items: SearchSuggestion[] = [];

    navigation[role]?.forEach((item) => {
      items.push({
        id: `nav-${item.href}`,
        label: item.name,
        sublabel: "Go to page",
        href: item.href,
        icon: item.icon,
        group: "Navigation",
        keywords: `${item.name} ${item.href} page`.toLowerCase(),
      });
    });

    classes.forEach((item) => {
      items.push({
        id: `class-${item.id}`,
        label: item.name,
        sublabel: `${item.code} • ${item.teacher}`,
        href: `/students/classes/${item.id}`,
        icon: BookOpen,
        group: "My Classes",
        keywords: `${item.name} ${item.code} ${item.teacher} class subject lesson`.toLowerCase(),
      });
    });

    assignments.forEach((item) => {
      items.push({
        id: `assignment-${item.id}`,
        label: item.title,
        sublabel: `${item.subject} • Assignment`,
        href: `/students/assignments/${item.id}`,
        icon: FileText,
        group: "Assignments",
        keywords: `${item.title} ${item.subject} assignment homework submit`.toLowerCase(),
      });
    });

    return items;
  }, [role]);

  const search = useMemo(() => {
    return (query: string): SearchSuggestion[] => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return index
        .filter((item) => item.keywords.includes(q))
        .slice(0, 8);
    };
  }, [index]);

  return { search, index };
}
