export default function RomanticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className={i % 2 === 0 ? 'floating-heart' : 'floating-heart-alt'}
          style={{
            position: 'absolute',
            left: `${(i * 15) % 100}%`,
            fontSize: `${20 + (i % 3) * 10}px`,
            animationDelay: `${i * 2}s`,
            opacity: 0.6,
          }}
        >
          💕
        </div>
      ))}
      
      {/* Rose petals */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="floating-petal"
          style={{
            position: 'absolute',
            left: `${(i * 20) % 100}%`,
            fontSize: `${15 + (i % 2) * 8}px`,
            animationDelay: `${i * 3}s`,
            opacity: 0.5,
          }}
        >
          🌸
        </div>
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            position: 'absolute',
            top: `${(i * 10) % 100}%`,
            left: `${(i * 13) % 100}%`,
            fontSize: '16px',
            animationDelay: `${i * 0.5}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}
