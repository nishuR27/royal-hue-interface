import { Link } from "react-router-dom";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { JellyButton } from "@/components/ui/jelly-button";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { FloatingBubbles } from "@/components/effects/floating-bubbles";
import { Mail, Lock, User, Sparkles } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    
    // Navigate after success animation
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <FloatingBubbles count={12} />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(280,80%,45%)] flex items-center justify-center shadow-glow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground tracking-tight">
            hbday
          </span>
        </div>

        {/* Signup Card */}
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Create account
            </h1>
            <p className="text-muted-foreground">
              Start managing birthdays effortlessly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <GlassInput
              label="Full Name"
              type="text"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <GlassInput
              label="Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <GlassInput
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <JellyButton
              type="submit"
              fullWidth
              loading={loading}
              success={success}
              className="h-12 text-base"
            >
              Create Account
            </JellyButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-glow hover:text-primary transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
