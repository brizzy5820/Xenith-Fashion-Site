import { Mail, MapPin, Phone, Siren } from "lucide-react";

import { studentProfile } from "../data/studentProfile";
import { ProfileSectionCard } from "./ProfileSectionCard";

export function ContactInformation() {
  const { contact, emergencyContact } = studentProfile;

  return (
    <ProfileSectionCard
      title="Contact & emergency"
      description="Your registered communication details"
      icon={Phone}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-3.5">
          <div className="flex items-center gap-2 text-brand-600">
            <Mail size={15} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Email
            </span>
          </div>
          <p className="mt-2 break-words text-sm font-medium text-gray-800">
            {contact.email}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5">
          <div className="flex items-center gap-2 text-brand-600">
            <Phone size={15} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Phone
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-800">
            {contact.phone}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3.5 sm:col-span-2">
          <div className="flex items-center gap-2 text-brand-600">
            <MapPin size={15} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Residential address
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-800">
            {contact.address}
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-3.5 sm:col-span-2">
          <div className="flex items-center gap-2 text-amber-700">
            <Siren size={15} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Emergency contact
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-gray-900">
              {emergencyContact.name}
            </span>
            <span className="text-gray-500">
              {emergencyContact.relationship}
            </span>
            <span className="font-medium text-gray-700">
              {emergencyContact.phone}
            </span>
          </div>
        </div>
      </div>
    </ProfileSectionCard>
  );
}