import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBadge } from "@/components/ui/glow-badge";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { PageHeader } from "@/components/ui/page-header";
import { JellyButton } from "@/components/ui/jelly-button";
import { GlassInput } from "@/components/ui/glass-input";
import { Mail, Search, Filter, Check, Cake } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Mock data for today's birthdays
const mockBirthdays = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    age: 28,
    wishSent: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    age: 32,
    wishSent: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    age: 25,
    wishSent: false,
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@example.com",
    age: 41,
    wishSent: true,
  },
  {
    id: 5,
    name: "Amanda Foster",
    email: "amanda.f@example.com",
    age: 29,
    wishSent: false,
  },
];

export default function Birthdays() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "sent">("all");

  const filteredBirthdays = mockBirthdays.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "sent" && person.wishSent) ||
      (filter === "pending" && !person.wishSent);
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Today's Birthdays"
        description={`${mockBirthdays.length} people celebrating today`}
        action={
          <JellyButton variant="primary" size="sm">
            <Mail className="h-4 w-4" />
            Send All Wishes
          </JellyButton>
        }
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <GlassInput
            placeholder="Search by name..."
            icon={Search}
            floatingLabel={false}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "sent"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                filter === f
                  ? "bg-primary/15 text-primary-glow border border-primary/20"
                  : "bg-[rgba(255,255,255,0.04)] text-muted-foreground border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.08)]"
              )}
            >
              {f === "all" && "All"}
              {f === "pending" && "Pending"}
              {f === "sent" && "Sent"}
            </button>
          ))}
        </div>
      </div>

      {/* Birthday Cards */}
      {filteredBirthdays.length > 0 ? (
        <div className="space-y-3">
          {filteredBirthdays.map((person, index) => (
            <GlassCard
              key={person.id}
              hover
              className={cn(
                "p-5 animate-fade-in-up",
                `stagger-${Math.min(index + 1, 5)}`
              )}
              style={{ animationFillMode: "backwards" }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <AvatarCircle name={person.name} size="xl" glow />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {person.name}
                    </h3>
                    {person.wishSent && (
                      <GlowBadge variant="success" size="sm" icon={Check}>
                        Wish Sent
                      </GlowBadge>
                    )}
                  </div>
                  <p className="text-sm text-primary-glow mb-1">
                    🎂 Turns {person.age} today!
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {person.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!person.wishSent && (
                    <JellyButton variant="primary" size="sm">
                      <Mail className="h-4 w-4" />
                      <span className="hidden sm:inline">Send Wish</span>
                    </JellyButton>
                  )}
                  <JellyButton variant="secondary" size="icon">
                    <Mail className="h-4 w-4" />
                  </JellyButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard className="p-12">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Cake className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              {searchQuery || filter !== "all"
                ? "No matches found"
                : "No birthdays today"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filters"
                : "Check back tomorrow for celebrations!"}
            </p>
          </div>
        </GlassCard>
      )}
    </DashboardLayout>
  );
}
