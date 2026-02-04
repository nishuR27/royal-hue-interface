import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusDot } from "@/components/ui/status-dot";
import { GlowBadge } from "@/components/ui/glow-badge";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { PageHeader } from "@/components/ui/page-header";
import {
  Server,
  Cake,
  Calendar,
  Users,
  Mail,
  PartyPopper,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Mock data
const mockTodaysBirthdays = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", age: 28 },
  { id: 2, name: "Mike Chen", email: "mike@example.com", age: 32 },
];

const mockUpcomingBirthdays = [
  { id: 3, name: "Emma Wilson", daysUntil: 2, date: "Feb 6" },
  { id: 4, name: "James Brown", daysUntil: 4, date: "Feb 8" },
  { id: 5, name: "Lisa Anderson", daysUntil: 6, date: "Feb 10" },
];

export default function Dashboard() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (mockTodaysBirthdays.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of your birthday system"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Server Status */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Server className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Server Status</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusDot status="online" size="sm" />
                <span className="text-sm font-medium text-success">Running</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Today's Birthdays Count */}
        <GlassCard className="p-4 relative overflow-visible">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center relative">
              <Cake className="h-5 w-5 text-primary-glow" />
              {showConfetti && (
                <div className="absolute -top-2 -right-2 animate-bounce-subtle">
                  <PartyPopper className="h-4 w-4 text-warning" />
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Today's Birthdays</p>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedNumber value={mockTodaysBirthdays.length} />
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Upcoming (7 days) */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Next 7 Days</p>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedNumber value={mockUpcomingBirthdays.length} />
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Total Profiles */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Profiles</p>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedNumber value={127} />
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Birthdays - Large Card */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(280,80%,45%)] flex items-center justify-center shadow-glow-sm">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Today's Birthdays
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {mockTodaysBirthdays.length > 0 && (
                <GlowBadge variant="success">
                  {mockTodaysBirthdays.length} celebration{mockTodaysBirthdays.length !== 1 && "s"}
                </GlowBadge>
              )}
            </div>

            {mockTodaysBirthdays.length > 0 ? (
              <div className="space-y-3">
                {mockTodaysBirthdays.map((person, index) => (
                  <GlassCard
                    key={person.id}
                    hover
                    className={cn(
                      "p-4 animate-fade-in-up",
                      `stagger-${index + 1}`
                    )}
                    style={{ animationFillMode: "backwards" }}
                  >
                    <div className="flex items-center gap-4">
                      <AvatarCircle name={person.name} size="lg" glow />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {person.name}
                        </h3>
                        <p className="text-sm text-primary-glow">
                          Turns {person.age} today! 🎉
                        </p>
                      </div>
                      <button
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center",
                          "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]",
                          "text-muted-foreground hover:text-primary-glow",
                          "hover:bg-primary/10 hover:border-primary/20",
                          "transition-all duration-200"
                        )}
                        title="Send birthday email"
                      >
                        <Mail className="h-5 w-5" />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Cake className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No birthdays today
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check back tomorrow for celebrations!
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Upcoming Birthdays */}
        <div>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Coming Up
                </h2>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </div>
            </div>

            <div className="space-y-3">
              {mockUpcomingBirthdays.map((person, index) => (
                <div
                  key={person.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl",
                    "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]",
                    "animate-fade-in-up",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: "backwards" }}
                >
                  <AvatarCircle name={person.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {person.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{person.date}</p>
                  </div>
                  <GlowBadge variant="muted" size="sm">
                    {person.daysUntil}d
                  </GlowBadge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
