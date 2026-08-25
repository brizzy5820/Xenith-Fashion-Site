"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface ClassFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
  activeFilterCount?: number;
}

export function ClassFilters({
  search,
  onSearchChange,
  onFilterClick,
  activeFilterCount = 0,
}: ClassFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search classes..."
          className="h-10 w-full rounded-lg bg-white pl-9 pr-3 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <button
        type="button"
        onClick={onFilterClick}
        className="flex h-10 min-w-[110px] items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
      >
        <SlidersHorizontal size={16} />
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}