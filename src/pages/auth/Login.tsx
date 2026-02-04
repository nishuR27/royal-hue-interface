import { Link } from "react-router-dom";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { JellyButton } from "@/components/ui/jelly-button";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { FloatingBubbles } from "@/components/effects/floating-bubbles";
import { Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
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

        {/* Login Card */}
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-glow hover:text-primary transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <JellyButton
              type="submit"
              fullWidth
              loading={loading}
              success={success}
              className="h-12 text-base"
            >
              Sign In
            </JellyButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary-glow hover:text-primary transition-colors hover:underline"
            >
              Create one
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
