import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  variant?: "default" | "dark" | "accent";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, glow = false, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-[rgba(255,255,255,0.06)] backdrop-blur-[24px]",
          "border border-[rgba(255,255,255,0.08)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]",
          hover && [
            "transition-all duration-260 ease-spring cursor-pointer",
            "hover:bg-[rgba(255,255,255,0.1)]",
            "hover:translate-y-[-2px] hover:scale-[1.01]",
            "hover:shadow-[0_0_30px_hsla(263,90%,65%,0.3),0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
          ],
          glow && "shadow-glow-md",
          variant === "dark" && "bg-[rgba(0,0,0,0.3)]",
          variant === "accent" && "border-primary/20 bg-primary/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
