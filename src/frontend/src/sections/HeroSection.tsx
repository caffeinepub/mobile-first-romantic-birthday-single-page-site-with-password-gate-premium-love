import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOpenMessage: () => void;
}

export default function HeroSection({ onOpenMessage }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/hero-bg.jpg)', // Replace with your own hero background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-romantic-pink/40 via-romantic-rose/30 to-romantic-gold/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-romantic-pink/50">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-romantic-rose">
            Happy Birthday My Woman 🧿 🎀 Bangaaaraaa 🫂 🫀 ❤️
          </h1>

          {/* Names List */}
          <div className="bg-gradient-to-br from-romantic-blush to-romantic-pink/20 rounded-2xl p-6 mb-6 space-y-2 text-center">
            <p className="text-lg font-semibold text-romantic-rose">Renu 🧿🎀👸🏻🫂</p>
            <p className="text-lg font-semibold text-romantic-rose">Bachha 🎀👸🏻🧿🌍</p>
            <p className="text-lg font-semibold text-romantic-rose">Idiotu ❤️🧿🫂👸🏻🌍🫀</p>
            <p className="text-lg font-semibold text-romantic-rose">Bangara 🤍👑🌍🥹💋🫂❤️‍🩹🍻🫶🏻</p>
            <p className="text-lg font-semibold text-romantic-rose">Pajili 🐶 👸🏻 🧿</p>
            <p className="text-lg font-semibold text-romantic-rose">Mine 🧿🍻❤️</p>
            <p className="text-lg font-semibold text-romantic-rose">Everything 🧿🎀💟🤍😘</p>
            <p className="text-lg font-semibold text-romantic-rose">Kuttu 🐶👸🏻🧿🌍</p>
            <p className="text-lg font-semibold text-romantic-rose">Forever 🧿 🎀 👸🏻</p>
            <p className="text-lg font-semibold text-romantic-rose">Wfy 🌍 💕 👑 🫂</p>
            <p className="text-lg font-semibold text-romantic-rose">Nannaki 🧿 🎀 👸🏻</p>
            <p className="text-lg font-semibold text-romantic-rose">Maa 🤌🏻🥺🫂</p>
          </div>

          {/* Subtext Box */}
          <div className="space-y-4 text-center">
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              You Are Mine 🧿 🎀 Today, My Tomorrow, My Forever 🛐🐶👑
            </p>
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              I Love You Endlessly Pajili Jaan Ammu Kuttu 🧿 🌹💕🧿🎀🐶👑
            </p>
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              You and Me Always And Forever 🧿 🎀
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={onOpenMessage}
              className="h-12 px-8 text-lg font-bold bg-gradient-to-r from-romantic-rose to-romantic-gold hover:from-romantic-gold hover:to-romantic-rose text-white shadow-xl transform hover:scale-105 transition-all"
            >
              Read Birthday Message 💕
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
