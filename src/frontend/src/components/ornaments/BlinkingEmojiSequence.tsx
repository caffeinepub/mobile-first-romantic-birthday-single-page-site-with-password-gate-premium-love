import { useEffect, useState } from 'react';

const EMOJIS = ['🐶', '🧿', '🎀', '👸🏻', '🫂', '👑', '😘', '🍻', '🌍'];

export default function BlinkingEmojiSequence() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EMOJIS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border-2 border-romantic-pink/30">
      <div className="flex gap-2 items-center">
        {EMOJIS.map((emoji, index) => (
          <span
            key={index}
            className="text-2xl transition-all duration-300"
            style={{
              opacity: index === activeIndex ? 1 : 0.3,
              transform: index === activeIndex ? 'scale(1.2)' : 'scale(0.9)',
              filter: index === activeIndex ? 'blur(0)' : 'blur(1px)',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
