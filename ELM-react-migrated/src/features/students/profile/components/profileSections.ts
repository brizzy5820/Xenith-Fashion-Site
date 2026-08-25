import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  FolderOpen,
  HeartPulse,
  Phone,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";

import { AcademicInformation } from "./AcademicInformation";
import { ContactInformation } from "./ContactInformation";
import { GuardianInformation } from "./GuardianInformation";
import { HealthWelfare } from "./HealthWelfare";
import { PersonalInformation } from "./PersonalInformation";
import { StudentActivities } from "./StudentActivities";
import { StudentDocuments } from "./StudentDocuments";

export interface ProfileSection {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  Component: ComponentType;
}

export const profileSections: ProfileSection[] = [
  {
    key: "personal",
    title: "Personal information",
    description: "Basic identity and personal details",
    icon: UserRound,
    Component: PersonalInformation,
  },
  {
    key: "academic",
    title: "Academic information",
    description: "Current academic placement and enrollment",
    icon: BookOpenCheck,
    Component: AcademicInformation,
  },
  {
    key: "guardians",
    title: "Family & guardians",
    description: "Registered parent and guardian information",
    icon: UsersRound,
    Component: GuardianInformation,
  },
  {
    key: "contact",
    title: "Contact & emergency",
    description: "Your registered communication details",
    icon: Phone,
    Component: ContactInformation,
  },
  {
    key: "health",
    title: "Health & welfare",
    description: "Health information maintained by the school",
    icon: HeartPulse,
    Component: HealthWelfare,
  },
  {
    key: "documents",
    title: "Documents",
    description: "Documents associated with your student record",
    icon: FolderOpen,
    Component: StudentDocuments,
  },
  {
    key: "activities",
    title: "Activities & achievements",
    description: "Clubs, sports, leadership and other school activities",
    icon: Trophy,
    Component: StudentActivities,
  },
];

export function getProfileSection(key: string | undefined): ProfileSection | undefined {
  return profileSections.find((section) => section.key === key);
}
