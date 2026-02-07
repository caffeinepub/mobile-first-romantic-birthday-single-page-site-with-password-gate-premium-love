import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoveLetterModal from '../components/modals/LoveLetterModal';

export default function SurpriseSection() {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-romantic-rose/10 to-romantic-gold/10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-romantic-rose mb-4">
            A Special Surprise 💌
          </h2>
          <p className="text-lg text-muted-foreground">
            Something from the heart, just for you
          </p>
        </div>

        {/* Love Letter Card */}
        <div className="bg-gradient-to-br from-white via-romantic-blush to-romantic-pink/20 rounded-3xl p-8 shadow-2xl border-2 border-romantic-pink/50 text-center">
          <div className="text-6xl mb-6">💌</div>
          
          <h3 className="text-2xl font-bold text-romantic-rose mb-4">
            Open My Heart
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8">
            I've written something special for you...
          </p>

          <Button
            onClick={() => setShowLetter(true)}
            className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-romantic-rose to-romantic-gold hover:from-romantic-gold hover:to-romantic-rose text-white shadow-xl transform hover:scale-105 transition-all"
          >
            Read Love Letter 💕
          </Button>
        </div>

        {/* Closing Message */}
        <div className="mt-12 text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-romantic-pink/30">
          <p className="text-2xl font-bold text-romantic-rose leading-relaxed">
            I'm Forever Your's, Always Your's and Endlessly Yours 💯 🫂 🧿 🥺 🐶 🙇🏻 ❤️
          </p>
          
          <div className="flex justify-center gap-3 text-3xl mt-6">
            <span className="animate-pulse">💖</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>🫂</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🧿</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>🎀</span>
            <span className="animate-pulse" style={{ animationDelay: '0.8s' }}>💕</span>
          </div>
        </div>
      </div>

      <LoveLetterModal open={showLetter} onOpenChange={setShowLetter} />
    </section>
  );
}
