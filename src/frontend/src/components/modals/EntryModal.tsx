import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnter: () => void;
}

export default function EntryModal({ open, onOpenChange, onEnter }: EntryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white via-romantic-blush to-romantic-pink/30 border-2 border-romantic-pink/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-romantic-rose mb-4">
            Enter Our World 🌍 💕
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          <p className="text-xl font-semibold text-romantic-rose">
            Of Our Happiness
          </p>
          
          <div className="flex justify-center gap-3 text-3xl animate-pulse">
            <span>✨</span>
            <span>💖</span>
            <span>✨</span>
          </div>

          <Button
            onClick={onEnter}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-romantic-rose to-romantic-gold hover:from-romantic-gold hover:to-romantic-rose text-white shadow-xl transform hover:scale-105 transition-all"
          >
            Kuttu 🧿 🎀 🐶
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
