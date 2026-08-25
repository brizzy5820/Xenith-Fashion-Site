interface AssignmentItemProps {
  subject: string;
  title: string;
  status: string;
}

export function AssignmentItem({
  subject,
  title,
  status,
}: AssignmentItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-xs text-muted-foreground">
          {subject}
        </p>

        <p className="mt-1 text-sm font-medium">
          {title}
        </p>
      </div>

      <span className="whitespace-nowrap text-xs text-muted-foreground">
        {status}
      </span>
    </div>
  );
}
