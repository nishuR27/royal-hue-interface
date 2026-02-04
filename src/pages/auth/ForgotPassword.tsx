import { Link } from "react-router-dom";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { JellyButton } from "@/components/ui/jelly-button";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { FloatingBubbles } from "@/components/effects/floating-bubbles";
import { Mail, ArrowLeft, Sparkles, Check } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
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

        {/* Forgot Password Card */}
        <GlassCard className="p-8">
          {!success ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-foreground mb-2">
                  Reset password
                </h1>
                <p className="text-muted-foreground">
                  Enter your email and we'll send you a reset link
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

                <JellyButton
                  type="submit"
                  fullWidth
                  loading={loading}
                  className="h-12 text-base"
                >
                  Send Reset Link
                </JellyButton>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4 animate-scale-in">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Check your email
              </h2>
              <p className="text-muted-foreground mb-4">
                We've sent a password reset link to{" "}
                <span className="text-foreground">{email}</span>
              </p>
            </div>
          )}

          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
