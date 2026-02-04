import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";
import { AnimatedBackground } from "@/components/effects/animated-background";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showBubbles?: boolean;
}

export function DashboardLayout({ children, showBubbles = false }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">
      <AnimatedBackground />
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav />
        
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}
