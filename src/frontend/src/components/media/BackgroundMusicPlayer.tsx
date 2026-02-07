import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
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
      audio.play().catch((err) => {
        console.warn('Loop playback failed:', err);
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      setHasError(true);
      setShowHelper(true);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
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
        setShowHelper(false);
        fadeIn(); // Fade in on autoplay
      }).catch((err) => {
        // Autoplay blocked, user will need to interact
        console.info('Autoplay blocked:', err);
        setIsPlaying(false);
        setShowHelper(true);
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
        setShowHelper(false);
        fadeIn(); // Fade in when user presses play
      }).catch((err) => {
        console.warn('Play failed:', err);
        setIsPlaying(false);
        setShowHelper(true);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Audio element with loop disabled (we handle looping manually for fade-in) */}
      <audio ref={audioRef} preload="auto">
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Helper message when playback cannot start */}
      {showHelper && !isPlaying && (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-romantic-pink/30 px-3 py-2 text-xs text-romantic-rose animate-in fade-in slide-in-from-bottom-2 duration-300">
          {hasError ? 'Music unavailable' : 'Tap Play to start music'}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-xl border-2 border-romantic-pink/50 p-2 flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={togglePlay}
          className="rounded-full hover:bg-romantic-blush"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
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
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
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
