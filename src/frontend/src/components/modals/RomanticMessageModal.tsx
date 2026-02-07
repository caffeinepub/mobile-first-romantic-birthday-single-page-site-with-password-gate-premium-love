import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RomanticMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RomanticMessageModal({ open, onOpenChange }: RomanticMessageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white via-romantic-blush to-romantic-pink/20 border-2 border-romantic-pink/50 shadow-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-romantic-rose mb-4">
            Special Birthday Message 💕
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative py-4 px-2">
          {/* Floating hearts */}
          <div className="absolute top-0 left-4 text-2xl sparkle" style={{ animationDelay: '0s' }}>💖</div>
          <div className="absolute top-8 right-4 text-xl sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-8 left-8 text-xl sparkle" style={{ animationDelay: '1s' }}>💕</div>
          <div className="absolute bottom-0 right-8 text-2xl sparkle" style={{ animationDelay: '1.5s' }}>💫</div>
          
          <div className="text-center space-y-4 relative z-10">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              As Uh Are Completing Ur 19teen Age & U R Entering in 20s, So By This Birthday U R 20s so, 
              Wishing You A Lovely Birthday To My Life Partner 🥰 🫂 🫀 🎀 🧿 👸🏻
            </p>
            
            <div className="flex justify-center gap-2 text-3xl my-6">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💕</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
