import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { JellyButton } from "@/components/ui/jelly-button";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      
      <GlassCard className="p-8 max-w-md text-center animate-fade-in-up">
        <div className="text-8xl font-bold text-primary-glow mb-4">404</div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard">
            <JellyButton variant="primary">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </JellyButton>
          </Link>
          <JellyButton variant="secondary" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </JellyButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
