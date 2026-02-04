import { useMemo } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

export interface FloatingBubblesProps {
  count?: number;
}

export function FloatingBubbles({ count = 15 }: FloatingBubblesProps) {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 50, // 50-200px
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 20, // 0-20s delay
      duration: Math.random() * 20 + 25, // 25-45s duration
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: "-200px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
            animation: `float-up ${bubble.duration}s linear infinite`,
            animationDelay: `${bubble.delay}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
