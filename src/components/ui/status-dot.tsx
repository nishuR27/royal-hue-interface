import { cn } from "@/lib/utils";

export interface StatusDotProps {
  status: "online" | "offline" | "degraded" | "unknown";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

const statusColors = {
  online: "bg-success",
  offline: "bg-destructive",
  degraded: "bg-warning",
  unknown: "bg-muted-foreground",
};

const statusPulseColors = {
  online: "bg-success/50",
  offline: "bg-destructive/50",
  degraded: "bg-warning/50",
  unknown: "bg-muted-foreground/50",
};

const sizeClasses = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function StatusDot({ status, size = "md", pulse = true, className }: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "rounded-full",
          sizeClasses[size],
          statusColors[status]
        )}
      />
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping",
            statusPulseColors[status]
          )}
          style={{ animationDuration: "2s" }}
        />
      )}
    </span>
  );
}
