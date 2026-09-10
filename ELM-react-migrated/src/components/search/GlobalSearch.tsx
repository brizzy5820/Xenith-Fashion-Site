"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import { type UserRole } from "@/config/navigation";
import {
  useSiteSearch,
  type SearchSuggestion,
} from "./useSiteSearch";

interface SearchFieldProps {
  role: UserRole;
  onNavigate?: () => void;
  autoFocus?: boolean;
}

/**
 * The shared search input + suggestion dropdown. It is reused by the desktop
 * header (always visible) and the mobile top bar (revealed inside a panel).
 */
function SearchField({ role, onNavigate, autoFocus }: SearchFieldProps) {
  const navigate = useNavigate();
  const { search } = useSiteSearch(role);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchSuggestion[]>(
    () => (query.trim() ? search(query) : []),
    [query, search]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, SearchSuggestion[]>();
    results.forEach((item) => {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    });
    return Array.from(map.entries());
  }, [results]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setActive(-1);
  }, [query]);

  const go = (href: string) => {
    navigate(href);
    setQuery("");
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      if (active >= 0 && results[active]) {
        event.preventDefault();
        go(results[active].href);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  let flatIndex = -1;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search classes, assignments, pages…"
          aria-label="Search the site"
          className="w-full rounded-xl border border-brand-100 bg-gray-50/60 py-2.5 pl-10 pr-9 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:border-none focus:ring-brand-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-brand-400 transition hover:bg-brand-100 hover:text-brand-700"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-80 overflow-y-auto rounded-xl border border-brand-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              No matches for “{query}”.
            </p>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-1 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                  {group}
                </p>
                <ul>
                  {items.map((item) => {
                    flatIndex += 1;
                    const isActive = flatIndex === active;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(flatIndex)}
                          onClick={() => go(item.href)}
                          className={clsx(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition",
                            isActive ? "bg-brand-50" : "hover:bg-brand-50/60"
                          )}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700">
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-brand-900">
                              {item.label}
                            </span>
                            {item.sublabel && (
                              <span className="block truncate text-xs text-muted-foreground">
                                {item.sublabel}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/** Desktop header search — shown inline next to the icons. */
export function GlobalSearch({ role }: { role: UserRole }) {
  return (
    <div className="relative w-full max-w-xl">
      <SearchField role={role} />
    </div>
  );
}

/** Mobile search — an icon that gently reveals the field below the top bar. */
export function MobileSearch({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Search"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
      >
        <Search size={20} />
      </button>

      <div
        className={clsx(
          "absolute inset-x-0 top-14 z-50 border-t border-gray-200 bg-white/95 pb-2 backdrop-blur transition-all duration-300 ease-in-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        )}
      >
        <div className="px-3 pt-3 shadow-lg">
          <SearchField role={role} autoFocus={open} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
