import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusDot } from "@/components/ui/status-dot";
import { GlowBadge } from "@/components/ui/glow-badge";
import { PageHeader } from "@/components/ui/page-header";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Activity,
  Server,
  Database,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock system data
const systemStats = {
  apiUptime: 99.97,
  lastHeartbeat: new Date(Date.now() - 15000), // 15 seconds ago
  dbStatus: "connected" as const,
  requestsToday: 1247,
  avgResponseTime: 42,
  errorRate: 0.02,
};

const recentEvents = [
  {
    id: 1,
    type: "success",
    message: "Birthday email sent successfully",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "success",
    message: "New profile added: Mike Chen",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "warning",
    message: "High API response time detected",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "success",
    message: "System backup completed",
    time: "3 hours ago",
  },
  {
    id: 5,
    type: "success",
    message: "Database optimization completed",
    time: "6 hours ago",
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function Status() {
  return (
    <DashboardLayout>
      <PageHeader
        title="System Status"
        description="Operational health and system metrics"
        action={
          <GlowBadge variant="success" icon={CheckCircle2}>
            All Systems Operational
          </GlowBadge>
        }
      />

      {/* Main Status Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* API Uptime */}
        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-success" />
            </div>
            <StatusDot status="online" size="md" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">API Uptime</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">
              <AnimatedNumber value={systemStats.apiUptime * 100} />
            </span>
            <span className="text-lg text-success">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </GlassCard>

        {/* Last Heartbeat */}
        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-glow" />
            </div>
            <StatusDot status="online" size="md" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Last Heartbeat</p>
          <p className="text-2xl font-bold text-foreground">
            {formatTimeAgo(systemStats.lastHeartbeat)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {systemStats.lastHeartbeat.toLocaleTimeString()}
          </p>
        </GlassCard>

        {/* Database */}
        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Database className="h-5 w-5 text-accent" />
            </div>
            <StatusDot
              status={systemStats.dbStatus === "connected" ? "online" : "offline"}
              size="md"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Database</p>
          <p className="text-2xl font-bold text-foreground capitalize">
            {systemStats.dbStatus}
          </p>
          <p className="text-xs text-muted-foreground mt-2">PostgreSQL</p>
        </GlassCard>

        {/* Requests Today */}
        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Requests Today</p>
          <p className="text-3xl font-bold text-foreground">
            <AnimatedNumber value={systemStats.requestsToday} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Avg {systemStats.avgResponseTime}ms response
          </p>
        </GlassCard>
      </div>

      {/* Secondary Metrics & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Performance Metrics
            </h2>
            
            <div className="space-y-6">
              {/* Response Time Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Avg Response Time
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {systemStats.avgResponseTime}ms
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-success to-success/70 transition-all duration-1000"
                    style={{ width: `${Math.min(systemStats.avgResponseTime / 2, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-success mt-1">Excellent</p>
              </div>

              {/* Error Rate Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Error Rate
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {systemStats.errorRate}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-success to-success/70 transition-all duration-1000"
                    style={{ width: `${systemStats.errorRate * 20}%` }}
                  />
                </div>
                <p className="text-xs text-success mt-1">Very Low</p>
              </div>

              {/* Uptime Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Monthly Uptime
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {systemStats.apiUptime}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
                    style={{ width: `${systemStats.apiUptime}%` }}
                  />
                </div>
                <p className="text-xs text-primary-glow mt-1">Target: 99.9%</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Events */}
        <div>
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl",
                    "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]",
                    "animate-fade-in-up",
                    `stagger-${Math.min(index + 1, 5)}`
                  )}
                  style={{ animationFillMode: "backwards" }}
                >
                  {event.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground leading-snug">
                      {event.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
