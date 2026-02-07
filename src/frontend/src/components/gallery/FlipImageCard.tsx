import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useLocalMedia } from '@/hooks/useLocalMedia';

interface FlipImageCardProps {
  imageSrc: string;
  message: string;
  cardId: string;
}

export default function FlipImageCard({ imageSrc, message, cardId }: FlipImageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use IndexedDB for image persistence
  const { previewSrc, hasLocalOverride, saveMedia } = useLocalMedia(`image-${cardId}`, imageSrc);
  const currentImage = previewSrc || imageSrc;

  const handleImageReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    // Reset the input value to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setError(null);
      await saveMedia(file);
    } catch (err) {
      console.error('Failed to save image:', err);
      setError('Failed to save image. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative">
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''} cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className="flip-card-inner aspect-square">
          {/* Front */}
          <div className="flip-card-front rounded-2xl overflow-hidden shadow-lg border-2 border-romantic-pink/30 relative">
            <img
              src={currentImage}
              alt="Memory"
              className="w-full h-full object-cover"
              draggable={false}
            />
            
            {/* Add/Replace Button - Always visible */}
            <div className="absolute bottom-2 left-2 right-2 z-10">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageReplace}
                className="hidden"
                id={`file-input-${cardId}`}
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                size="sm"
                variant="outline"
                className="w-full bg-white/90 backdrop-blur-sm border-romantic-pink text-romantic-rose hover:bg-romantic-blush shadow-lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                {hasLocalOverride ? 'Replace Image' : 'Add Image'}
              </Button>
            </div>
          </div>

          {/* Back */}
          <div className="flip-card-back rounded-2xl overflow-hidden shadow-lg border-2 border-romantic-pink/30 bg-gradient-to-br from-romantic-rose to-romantic-gold p-6 flex items-center justify-center">
            <p className="text-white text-center font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-xs text-destructive text-center font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
