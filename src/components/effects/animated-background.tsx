export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, hsl(263, 60%, 18%) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 85% 50%, hsl(280, 50%, 12%) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 15% 80%, hsl(250, 40%, 10%) 0%, transparent 50%),
          hsl(248, 20%, 4%)
        `,
      }}
    >
      {/* Slow animated overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 40% 30% at 30% 30%, hsl(263, 70%, 20%) 0%, transparent 60%),
            radial-gradient(ellipse 30% 25% at 70% 70%, hsl(280, 60%, 15%) 0%, transparent 60%)
          `,
          animation: "gradient-shift 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
