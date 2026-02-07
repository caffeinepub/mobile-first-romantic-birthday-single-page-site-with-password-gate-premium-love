import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const fadeIntervalRef = useRef<number | null>(null);
  
  // Target volume for fade-in (0.0 to 1.0)
  const TARGET_VOLUME = 0.7;
  const FADE_DURATION_MS = 2000; // 2 seconds fade-in
  const FADE_STEP_MS = 50; // Update every 50ms

  // Clear any active fade interval
  const clearFadeInterval = () => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  // Perform smooth fade-in from near-silent to target volume
  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval();

    // Start from near-silent
    audio.volume = 0.01;
    
    const steps = FADE_DURATION_MS / FADE_STEP_MS;
    const volumeIncrement = (TARGET_VOLUME - 0.01) / steps;
    
    fadeIntervalRef.current = window.setInterval(() => {
      if (!audio) {
        clearFadeInterval();
        return;
      }

      const newVolume = Math.min(audio.volume + volumeIncrement, TARGET_VOLUME);
      audio.volume = newVolume;

      // Stop fading when we reach target
      if (newVolume >= TARGET_VOLUME) {
        clearFadeInterval();
      }
    }, FADE_STEP_MS);
  };

  // Handle loop restart with fade-in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // When track ends naturally, restart with fade-in
      audio.currentTime = 0;
      fadeIn();
      audio.play().catch(() => {
        // Handle play error silently
      });
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      clearFadeInterval();
    };
  }, []);

  useEffect(() => {
    // Attempt autoplay muted on mount (best-effort for mobile compatibility)
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.volume = 0.01; // Start near-silent
      audio.play().then(() => {
        setIsPlaying(true);
        fadeIn(); // Fade in on autoplay
      }).catch(() => {
        // Autoplay blocked, user will need to interact
        setIsPlaying(false);
      });
    }

    return () => {
      clearFadeInterval();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      clearFadeInterval();
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeIn(); // Fade in when user presses play
      }).catch(() => {
        // Handle play error
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Audio element with loop disabled (we handle looping manually for fade-in) */}
      <audio ref={audioRef}>
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-xl border-2 border-romantic-pink/50 p-2 flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={togglePlay}
          className="rounded-full hover:bg-romantic-blush"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-romantic-rose" />
          ) : (
            <Play className="h-5 w-5 text-romantic-rose" />
          )}
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleMute}
          className="rounded-full hover:bg-romantic-blush"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-romantic-rose" />
          ) : (
            <Volume2 className="h-5 w-5 text-romantic-rose" />
          )}
        </Button>
      </div>
    </div>
  );
}
