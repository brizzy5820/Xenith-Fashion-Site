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

interface SubjectOutlineProps {
  topics: Topic[];
}

export function SubjectOutline({
  topics,
}: SubjectOutlineProps) {
  return (
    <div className="space-y-1">
      {topics.map((topic, index) => {
        const isCurrent = topic.current;

        return (
          <div
            key={topic.id}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
              isCurrent
                ? "bg-brand-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex shrink-0">
              {topic.completed ? (
                <CheckCircle2
                  size={18}
                  className="text-brand-600"
                />
              ) : isCurrent ? (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-brand-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                </div>
              ) : (
                <Circle
                  size={18}
                  className="text-gray-300"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm ${
                  isCurrent
                    ? "font-medium text-brand-800"
                    : topic.completed
                      ? "text-gray-700"
                      : "text-gray-500"
                }`}
              >
                {index + 1}. {topic.title}
              </p>

              {isCurrent && (
                <p className="mt-0.5 text-[11px] text-brand-600">
                  Currently learning
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}