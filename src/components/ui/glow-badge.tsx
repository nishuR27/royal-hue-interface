import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

export interface GlowBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "muted";
  icon?: LucideIcon;
  size?: "sm" | "md";
}

const variantStyles = {
  default: [
    "bg-primary/15 border-primary/30 text-primary-glow",
    "shadow-[0_0_15px_hsla(263,90%,65%,0.2)]",
  ],
  success: [
    "bg-success/15 border-success/30 text-success",
    "shadow-[0_0_15px_hsla(142,76%,45%,0.2)]",
  ],
  warning: [
    "bg-warning/15 border-warning/30 text-warning",
    "shadow-[0_0_15px_hsla(38,92%,50%,0.2)]",
  ],
  destructive: [
    "bg-destructive/15 border-destructive/30 text-destructive",
    "shadow-[0_0_15px_hsla(0,72%,51%,0.2)]",
  ],
  muted: [
    "bg-muted border-muted-foreground/20 text-muted-foreground",
    "shadow-none",
  ],
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

const GlowBadge = forwardRef<HTMLSpanElement, GlowBadgeProps>(
  ({ className, variant = "default", icon: Icon, size = "md", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium border",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-3 w-3" />}
        {children}
      </span>
    );
  }
);
GlowBadge.displayName = "GlowBadge";

export { GlowBadge };
