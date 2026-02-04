import { Link } from "react-router-dom";
import { StatusDot } from "@/components/ui/status-dot";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { Menu, Sparkles, Bell, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TopNavProps {
  serverStatus?: "online" | "offline" | "degraded" | "unknown";
  userName?: string;
}

export function TopNav({ serverStatus = "online", userName = "Demo User" }: TopNavProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-6",
        "bg-[rgba(0,0,0,0.4)] backdrop-blur-[30px]",
        "border-b border-[rgba(255,255,255,0.06)]"
      )}
    >
      {/* Left: Mobile menu + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 md:hidden">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-[hsl(280,80%,45%)] flex items-center justify-center shadow-glow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-foreground">hbday</span>
        </Link>
      </div>

      {/* Center: Server Status */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
        <StatusDot status={serverStatus} size="sm" />
        <span className="text-xs font-medium text-muted-foreground">
          Server{" "}
          <span
            className={cn(
              serverStatus === "online" && "text-success",
              serverStatus === "offline" && "text-destructive",
              serverStatus === "degraded" && "text-warning"
            )}
          >
            {serverStatus === "online" && "Running"}
            {serverStatus === "offline" && "Down"}
            {serverStatus === "degraded" && "Degraded"}
            {serverStatus === "unknown" && "Unknown"}
          </span>
        </span>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className={cn(
            "relative h-10 w-10 rounded-xl flex items-center justify-center",
            "text-muted-foreground transition-all duration-200",
            "hover:text-foreground hover:bg-[rgba(255,255,255,0.06)]"
          )}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-glow-sm" />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-colors">
              <AvatarCircle name={userName} size="sm" />
              <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                {userName}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[rgba(20,20,30,0.95)] backdrop-blur-[30px] border-[rgba(255,255,255,0.1)]"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-[rgba(255,255,255,0.06)]">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />
            <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
