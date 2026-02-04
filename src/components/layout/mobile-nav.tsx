import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Cake, UserPlus, Activity } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/birthdays", label: "Birthdays", icon: Cake },
  { path: "/add", label: "Add", icon: UserPlus },
  { path: "/status", label: "Status", icon: Activity },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-[rgba(0,0,0,0.6)] backdrop-blur-[30px]",
        "border-t border-[rgba(255,255,255,0.06)]",
        "safe-area-inset-bottom"
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl",
                "transition-all duration-200",
                isActive
                  ? "text-primary-glow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "relative p-2 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/15 shadow-glow-sm"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
