interface UpcomingItemProps {
  subject: string;
  time: string;
}

export function UpcomingItem({
  subject,
  time,
}: UpcomingItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium">
          {subject}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Class
        </p>
      </div>

      <span className="text-sm font-medium">
        {time}
      </span>
    </div>
  );
}
