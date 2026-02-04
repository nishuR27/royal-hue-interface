import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { LucideIcon } from "lucide-react";

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: LucideIcon;
  floatingLabel?: boolean;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, success, icon: Icon, floatingLabel = true, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const showFloatingLabel = floatingLabel && label && (isFocused || hasValue);

    return (
      <div className="relative w-full">
        {/* Floating Label */}
        {floatingLabel && label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none z-10",
              Icon && "left-11",
              showFloatingLabel
                ? "top-1 text-xs text-primary-glow"
                : "top-1/2 -translate-y-1/2 text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}

        {/* Non-floating Label */}
        {!floatingLabel && label && (
          <label className="block mb-2 text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Icon */}
          {Icon && (
            <Icon
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                isFocused ? "text-primary-glow" : "text-muted-foreground"
              )}
            />
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full rounded-xl text-foreground placeholder:text-muted-foreground",
              "bg-[rgba(255,255,255,0.04)] backdrop-blur-[10px]",
              "border border-[rgba(255,255,255,0.08)]",
              "transition-all duration-200",
              "focus:outline-none focus:bg-[rgba(255,255,255,0.06)]",
              "focus:border-primary/50",
              "focus:shadow-[0_0_0_3px_hsla(263,70%,50%,0.15),inset_0_0_20px_hsla(263,70%,50%,0.1)]",
              floatingLabel && label ? "pt-5 pb-2 px-4" : "py-3 px-4",
              Icon && (floatingLabel && label ? "pl-11" : "pl-11"),
              error && "border-destructive/50 shadow-glow-error",
              success && "border-success/50 shadow-glow-success",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            placeholder={floatingLabel ? "" : props.placeholder}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm text-destructive animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);
GlassInput.displayName = "GlassInput";

export { GlassInput };
