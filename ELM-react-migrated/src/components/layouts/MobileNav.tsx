'use client'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { CircleEllipsis , X } from "lucide-react";
import { navigation, UserRole } from "@/config/navigation";

interface MobileNavProps {
  role: UserRole;
}

export function MobileNav({ role }: MobileNavProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const items = navigation[role] || [];
  const primary = items.slice(0, 4);
  const more = items.slice(4);
  const moreActive = more.some((item) => item.href === pathname);

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drop-up menu for overflow routes */}
      {more.length > 0 && (
        <div
          className={`fixed inset-x-3 bottom-[4.5rem] z-50 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-1 flex items-center justify-between px-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              More
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>

          <ul className="grid grid-cols-3 gap-1">
            {more.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center text-[11px] leading-tight transition ${
                      isActive
                        ? "bg-brand-50 font-medium text-brand-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch justify-around border-t border-gray-200 bg-white">
        {primary.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[11px] transition ${
                isActive ? "text-brand-700" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              <span className="max-w-[72px] truncate">{item.name}</span>
            </Link>
          );
        })}

        {more.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="More"
            aria-expanded={open}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-[11px] transition ${
              open || moreActive ? "text-brand-700" : "text-gray-500"
            }`}
          >
            <CircleEllipsis  size={20} />
            <span>More</span>
          </button>
        )}
      </nav>
    </div>
  );
}
