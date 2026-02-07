import { useState, useRef } from 'react';
import { videoGalleryData } from '../content/mediaPlaceholders';
import { useLocalMedia } from '@/hooks/useLocalMedia';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface VideoCardProps {
  videoSrc: string;
  index: number;
  editMode: boolean;
}

function VideoCard({ videoSrc, index, editMode }: VideoCardProps) {
  const mediaId = `video-${index}`;
  const { previewSrc, isLoading, saveMedia } = useLocalMedia(mediaId, videoSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      try {
        await saveMedia(file);
      } catch (error) {
        console.error('Failed to save video:', error);
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-romantic-pink/30 bg-romantic-blush/20">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-romantic-blush/20">
            <p className="text-romantic-rose">Loading...</p>
          </div>
        ) : (
          <video
            src={previewSrc || videoSrc}
            className="w-full h-full object-cover"
            controls
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
        
        {editMode && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <p className="text-white text-sm font-medium">Edit Mode</p>
          </div>
        )}
      </div>

      {editMode && (
        <div className="mt-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="sm"
            variant="outline"
            className="w-full border-romantic-pink text-romantic-rose hover:bg-romantic-blush"
          >
            <Upload className="h-4 w-4 mr-2" />
            Replace Video
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VideoMemorySection() {
  const [editMode, setEditMode] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-romantic-pink/10 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-romantic-rose mb-4">
            Video Memories 🎥
          </h2>
          <p className="text-lg text-muted-foreground">
            Our special moments captured in motion 💕
          </p>
        </div>

        {/* Edit Mode Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto">
          <Switch
            id="video-edit-mode"
            checked={editMode}
            onCheckedChange={setEditMode}
          />
          <Label htmlFor="video-edit-mode" className="cursor-pointer font-medium">
            Edit Mode
          </Label>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoGalleryData.map((video, index) => (
            <VideoCard
              key={index}
              videoSrc={video.src}
              index={index}
              editMode={editMode}
            />
          ))}
        </div>

        {/* Instructions */}
        {editMode && (
          <div className="mt-8 text-center text-sm text-muted-foreground bg-white/60 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto">
            <p className="font-medium mb-2">📝 How to replace videos:</p>
            <p>Click "Replace Video" on any tile to select a video from your device</p>
            <p>Videos are saved locally in your browser and will persist after refresh</p>
          </div>
        )}
      </div>
    </section>
  );
}
