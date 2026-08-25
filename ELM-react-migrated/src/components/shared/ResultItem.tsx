interface ResultItemProps {
  subject: string;
  score: string;
}

export function ResultItem({
  subject,
  score,
}: ResultItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
      <p className="text-sm font-medium">
        {subject}
      </p>

      <p className="text-sm font-semibold">
        {score}
      </p>
    </div>
  );
}
