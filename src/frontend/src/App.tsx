import { useState, useEffect } from 'react';
import PasscodeGate from './components/gate/PasscodeGate';
import EntryModal from './components/modals/EntryModal';
import RomanticBackground from './components/ambient/RomanticBackground';
import HeroSection from './sections/HeroSection';
import ImageMemorySection from './sections/ImageMemorySection';
import VideoMemorySection from './sections/VideoMemorySection';
import SurpriseSection from './sections/SurpriseSection';
import BackgroundMusicPlayer from './components/media/BackgroundMusicPlayer';
import BlinkingEmojiSequence from './components/ornaments/BlinkingEmojiSequence';
import RomanticMessageModal from './components/modals/RomanticMessageModal';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem('romantic-unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('romantic-unlocked', 'true');
    setIsUnlocked(true);
    setShowEntryModal(true);
  };

  const handleEnterWorld = () => {
    setShowEntryModal(false);
    // Smooth scroll to hero section
    setTimeout(() => {
      document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Show only passcode gate when locked - no decorative elements
  if (!isUnlocked) {
    return <PasscodeGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <RomanticBackground />
      
      <EntryModal 
        open={showEntryModal} 
        onOpenChange={setShowEntryModal}
        onEnter={handleEnterWorld}
      />

      <RomanticMessageModal 
        open={showMessageModal}
        onOpenChange={setShowMessageModal}
      />

      <BackgroundMusicPlayer />

      <main className="relative z-10">
        <BlinkingEmojiSequence />
        
        <HeroSection onOpenMessage={() => setShowMessageModal(true)} />
        
        <ImageMemorySection />
        
        <VideoMemorySection />
        
        <SurpriseSection />

        <footer className="py-8 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 flex-wrap px-4">
            © 2026. Built with <span className="text-romantic-rose">❤️</span> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-romantic-pink transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
