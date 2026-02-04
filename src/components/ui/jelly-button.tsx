import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2, Check } from "lucide-react";

export interface JellyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  success?: boolean;
  fullWidth?: boolean;
}

const JellyButton = forwardRef<HTMLButtonElement, JellyButtonProps>(
  ({ className, variant = "primary", size = "md", loading, success, fullWidth, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          "relative overflow-hidden font-medium transition-all duration-200 ease-spring",
          "inline-flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          
          // Size variants
          size === "sm" && "h-9 px-4 text-sm rounded-lg",
          size === "md" && "h-11 px-6 text-base rounded-xl",
          size === "lg" && "h-14 px-8 text-lg rounded-xl",
          size === "icon" && "h-10 w-10 rounded-xl",
          
          // Variant styles
          variant === "primary" && [
            "bg-gradient-to-r from-primary to-[hsl(280,80%,45%)]",
            "text-primary-foreground",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_15px_hsla(263,90%,50%,0.3)]",
            "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200",
            "before:bg-gradient-to-r before:from-[rgba(255,255,255,0.2)] before:to-transparent",
            "hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_40px_hsla(263,90%,65%,0.5)]",
            "hover:before:opacity-100",
            "active:scale-[0.98]",
          ],
          variant === "secondary" && [
            "bg-[rgba(255,255,255,0.06)] backdrop-blur-sm",
            "border border-[rgba(255,255,255,0.1)]",
            "text-foreground",
            "hover:bg-[rgba(255,255,255,0.1)]",
            "hover:border-[rgba(255,255,255,0.15)]",
            "hover:scale-[1.02]",
            "active:scale-[0.98]",
          ],
          variant === "ghost" && [
            "bg-transparent",
            "text-muted-foreground",
            "hover:bg-[rgba(255,255,255,0.06)]",
            "hover:text-foreground",
          ],
          variant === "destructive" && [
            "bg-destructive/20",
            "border border-destructive/30",
            "text-destructive",
            "hover:bg-destructive/30",
            "hover:shadow-glow-error",
          ],
          
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : success ? (
          <Check className="h-5 w-5 animate-scale-in" />
        ) : (
          children
        )}
      </button>
    );
  }
);
JellyButton.displayName = "JellyButton";

export { JellyButton };
