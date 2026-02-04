import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { JellyButton } from "@/components/ui/jelly-button";
import { PageHeader } from "@/components/ui/page-header";
import { User, Mail, Calendar, UserPlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AddData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    dob?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!dob) {
      newErrors.dob = "Date of birth is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
    
    // Reset form after animation
    setTimeout(() => {
      setName("");
      setEmail("");
      setDob("");
      setSuccess(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Add Birthday"
        description="Add a new person to the birthday database"
      />

      <div className="max-w-xl mx-auto">
        <GlassCard className="p-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(280,80%,45%)] flex items-center justify-center shadow-glow-sm">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                New Birthday Entry
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details below
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <GlassInput
              label="Full Name"
              type="text"
              icon={User}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
              success={!errors.name && name.length > 2}
            />

            <GlassInput
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              success={!errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            />

            {/* Custom Date Input */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-foreground">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                    dob ? "text-primary-glow" : "text-muted-foreground"
                  )}
                />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    if (errors.dob) setErrors({ ...errors, dob: undefined });
                  }}
                  className={cn(
                    "w-full rounded-xl py-3 pl-11 pr-4 text-foreground",
                    "bg-[rgba(255,255,255,0.04)] backdrop-blur-[10px]",
                    "border border-[rgba(255,255,255,0.08)]",
                    "transition-all duration-200",
                    "focus:outline-none focus:bg-[rgba(255,255,255,0.06)]",
                    "focus:border-primary/50",
                    "focus:shadow-[0_0_0_3px_hsla(263,70%,50%,0.15),inset_0_0_20px_hsla(263,70%,50%,0.1)]",
                    errors.dob && "border-destructive/50 shadow-glow-error",
                    dob && !errors.dob && "border-success/50 shadow-glow-success",
                    "[color-scheme:dark]"
                  )}
                />
              </div>
              {errors.dob && (
                <p className="mt-2 text-sm text-destructive animate-fade-in">
                  {errors.dob}
                </p>
              )}
            </div>

            <JellyButton
              type="submit"
              fullWidth
              loading={loading}
              success={success}
              className="h-12 text-base mt-8"
            >
              {success ? (
                <>
                  <Check className="h-5 w-5" />
                  Added Successfully!
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Add Birthday
                </>
              )}
            </JellyButton>
          </form>
        </GlassCard>

        {/* Tips */}
        <div className="mt-6 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-glow font-medium">Pro tip:</span>{" "}
            Birthday reminders will be sent automatically based on system
            settings. Make sure email addresses are correct.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
