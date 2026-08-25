"use client";

import {
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Topic {
  id: string;
  title: string;
  completed: boolean;
  current?: boolean;
}

interface TermOutlineProps {
  topics: Topic[];
}

export function TermOutline({
  topics,
}: TermOutlineProps) {
  const completed = topics.filter(
    (topic) => topic.completed
  ).length;

  const currentIndex = topics.findIndex(
    (topic) => topic.current
  );

  return (
    <section className="rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Term Outline
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Follow what you&apos;ve covered and what&apos;s
            coming next.
          </p>
        </div>

        <span className="text-xs font-medium text-gray-500">
          {completed} of {topics.length} completed
        </span>
      </div>

      {/* Topics */}
      <div className="p-3">
        {topics.map((topic, index) => {
          const isCurrent = topic.current;

          return (
            <div
              key={topic.id}
              className={`relative flex gap-3 rounded-lg px-3 py-3 ${
                isCurrent
                  ? "bg-brand-50"
                  : "transition hover:bg-gray-50"
              }`}
            >
              {/* Connector */}
              {index < topics.length - 1 && (
                <div className="absolute left-[20px] top-[38px] h-[calc(100%-20px)] w-px bg-gray-100" />
              )}

              {/* Status */}
              <div className="relative z-10 shrink-0 bg-inherit">
                {topic.completed ? (
                  <CheckCircle2
                    size={18}
                    className="text-brand-600"
                  />
                ) : isCurrent ? (
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-brand-500 bg-white">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </div>
                ) : (
                  <Circle
                    size={18}
                    className="text-gray-300"
                  />
                )}
              </div>

              {/* Topic */}
              <div className="min-w-0">
                <p
                  className={`text-sm ${
                    isCurrent
                      ? "font-semibold text-brand-800"
                      : topic.completed
                        ? "font-medium text-gray-700"
                        : "text-gray-500"
                  }`}
                >
                  {topic.title}
                </p>

                {isCurrent && (
                  <p className="mt-0.5 text-[11px] font-medium text-brand-600">
                    Currently learning
                  </p>
                )}

                {topic.completed && (
                  <p className="mt-0.5 text-[11px] text-gray-400">
                    Completed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            Term progress
          </span>

          <span className="text-xs font-semibold text-gray-700">
            {Math.round((completed / topics.length) * 100)}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{
              width: `${(completed / topics.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}