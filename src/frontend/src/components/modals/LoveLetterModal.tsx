import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LoveLetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoveLetterModal({ open, onOpenChange }: LoveLetterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-white via-romantic-blush to-romantic-pink/20 border-2 border-romantic-pink/50 shadow-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-romantic-rose mb-2">
            A Love Letter For You 💌
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] px-4">
          <div className="space-y-4 text-base leading-relaxed text-foreground py-4">
            <p className="font-semibold text-romantic-rose text-lg">
              Hey! Listen Kuttu 🐶 👸🏻 🧿 🌍
            </p>
            
            <p>
              No Matter What, I'll be always with uh & I Will Never Ever Leave Ur Hand In Any Situation, 
              I Promise Uh To Keep Always Happy And Smiling As U R My Bachha 🎀 👸🏻 🧿 And I Can Go At 
              Extent For Uh And Ur Happiness 😘 😘
            </p>
            
            <p>
              I Hope I Can Make You Feel As Valued And Loved As You Deserve. You're The Best Partner 
              Anyone Could Ever Ask For. The Most Beautiful Girl In The World Genuinely And I Hope You 
              Believe That Coz I Mean It With My Whole Heart And I Can't Wait To Marry You And Make Cute 
              Little People With You.
            </p>
            
            <p className="font-semibold text-romantic-rose">
              You're Perfect For Me In Every Way, My Love 🐶🫀🌍
            </p>
            
            <p>
              Thank You For Taking The Risk🤌🏻 Of Loving 🤌🏻Me 🙇🏻🫂When It Wasn't Easy. You Stepped Into 
              My World With Patience, Softness, And An Open Heart 😚. You Saw My Walls🥺, My Doubts🥺, 
              My Quiet Fears🥺, And Still Chose To Stay🙇🏻.
            </p>
            
            <p>
              Your Love Feels Like Something Steady 🥰When My Mind Isn't🛐. It Reaches The Parts Of Me I 
              Never Knew How To Explain🥺🤌🏻. I'm Grateful That You Chose Me, Even On The Days I Struggle 
              To Choose Myself 🙇🏻
            </p>
            
            <div className="flex justify-center gap-3 text-3xl my-6">
              <span>💕</span>
              <span>🫂</span>
              <span>💖</span>
              <span>🧿</span>
              <span>🎀</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
