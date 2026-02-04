import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
          "mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]",
          className
        )}
        {...props}
      >
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div className="mt-4 sm:mt-0">{action}</div>}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
