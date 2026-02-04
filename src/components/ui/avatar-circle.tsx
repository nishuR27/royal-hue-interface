import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useMemo } from "react";

export interface AvatarCircleProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

// Generate consistent color based on name
const getColorFromName = (name: string): string => {
  const colors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-fuchsia-500 to-pink-600",
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const AvatarCircle = forwardRef<HTMLDivElement, AvatarCircleProps>(
  ({ className, name, image, size = "md", glow = false, ...props }, ref) => {
    const initials = useMemo(() => getInitials(name), [name]);
    const gradientColor = useMemo(() => getColorFromName(name), [name]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center rounded-full overflow-hidden",
          "font-semibold text-white",
          "ring-2 ring-[rgba(255,255,255,0.1)]",
          sizeClasses[size],
          glow && "shadow-glow-sm",
          className
        )}
        {...props}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "h-full w-full flex items-center justify-center",
              "bg-gradient-to-br",
              gradientColor
            )}
          >
            {initials}
          </div>
        )}
      </div>
    );
  }
);
AvatarCircle.displayName = "AvatarCircle";

export { AvatarCircle };
