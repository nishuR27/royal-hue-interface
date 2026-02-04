import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Cake,
  UserPlus,
  Activity,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/birthdays", label: "Birthdays", icon: Cake },
  { path: "/add", label: "Add Data", icon: UserPlus },
  { path: "/status", label: "Status", icon: Activity },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0",
        "bg-[rgba(0,0,0,0.4)] backdrop-blur-[30px]",
        "border-r border-[rgba(255,255,255,0.06)]",
        "transition-all duration-300 ease-spring",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(280,80%,45%)] flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold text-foreground tracking-tight">
              hbday
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const navLink = (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "text-muted-foreground transition-all duration-200",
                "hover:text-foreground hover:bg-[rgba(255,255,255,0.06)]",
                isActive && [
                  "text-foreground bg-primary/15",
                  "border border-primary/20",
                  "shadow-[0_0_20px_hsla(263,90%,65%,0.15)]",
                ],
                collapsed && "justify-center px-0"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive && "text-primary-glow"
                )}
              />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return navLink;
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl",
            "text-muted-foreground transition-all duration-200",
            "hover:text-foreground hover:bg-[rgba(255,255,255,0.06)]"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
