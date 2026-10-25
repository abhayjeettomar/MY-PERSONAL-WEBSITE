import React, { useState, useEffect, useCallback } from 'react';
import { Preloader } from '@/components/layout/Preloader';
import { BroadcastHUD } from '@/components/layout/BroadcastHUD';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { HeroArena } from '@/components/sections/HeroArena';
import { OriginStory } from '@/components/sections/OriginStory';
import { MilestoneTimeline } from '@/components/sections/MilestoneTimeline';
import { ProductionVault } from '@/components/sections/ProductionVault';
import { EmpireEcosystem } from '@/components/sections/EmpireEcosystem';
import { PhilanthropyImpact } from '@/components/sections/PhilanthropyImpact';
import { TelemetrySimulator } from '@/components/sections/TelemetrySimulator';
import { Footer } from '@/components/layout/Footer';
import { VideoTheatreModal } from '@/components/modals/VideoTheatreModal';
import { SourcesModal } from '@/components/modals/SourcesModal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useSoundFX } from '@/hooks/useSoundFX';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VideoDossier } from '@/data/mrbeastData';

export function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoDossier | null>(null);
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLevelName, setCurrentLevelName] = useState('ARENA STAGE');

  const reducedMotion = useReducedMotion();
  const { playClick, playHover, playBreach, playMilestone, playLaser } = useSoundFX(sfxEnabled);
  const { scrollProgress, velocity, scrollTo } = useSmoothScroll(!reducedMotion && preloaderComplete);

  // Section level detection via IntersectionObserver
  useEffect(() => {
    if (!preloaderComplete) return;

    const sectionMap = [
      { id: 'arena', level: 0, name: 'ARENA STAGE' },
      { id: 'origin', level: 1, name: 'THE BEDROOM LAB' },
      { id: 'timeline', level: 2, name: '500M TIMELINE' },
      { id: 'vault', level: 3, name: 'PRODUCTION VAULT' },
      { id: 'empire', level: 4, name: 'EMPIRE DECK' },
      { id: 'impact', level: 5, name: 'PHILANTHROPY' },
      { id: 'telemetry', level: 6, name: 'BY THE NUMBERS' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sectionMap.find((s) => s.id === entry.target.id);
            if (found) {
              setCurrentLevel(found.level);
              setCurrentLevelName(found.name);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionMap.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [preloaderComplete]);

  const handleNavigate = useCallback(
    (target: string) => {
      scrollTo(target, { offset: -56 });
    },
    [scrollTo]
  );

  return (
    <div className="min-h-screen bg-obsidian text-text-primary selection:bg-beast-cyan selection:text-obsidian relative">
      {/* Preloader Countdown (Runs once per session unless skipped) */}
      {!preloaderComplete && (
        <Preloader
          onComplete={() => setPreloaderComplete(true)}
          playTick={playHover}
          playBreach={playBreach}
          playMilestone={playMilestone}
        />
      )}

      {/* Custom Context-Aware Desktop Reticle Cursor */}
      <CustomCursor />

      {/* Persistent Broadcast HUD */}
      <BroadcastHUD
        currentLevel={currentLevel}
        currentLevelName={currentLevelName}
        scrollProgress={scrollProgress}
        scrollVelocity={velocity}
        sfxEnabled={sfxEnabled}
        onToggleSFX={() => setSfxEnabled(!sfxEnabled)}
        onOpenSources={() => setSourcesModalOpen(true)}
        onNavigate={handleNavigate}
        playClick={playClick}
      />

      {/* Main Single-Page Journey */}
      <main className="relative z-10">
        {/* Level 00: Hero Arena */}
        <HeroArena
          onEnterVault={() => handleNavigate('#origin')}
          onPlayShowreel={(v) => setActiveVideo(v)}
          playClick={playClick}
          playBreach={playBreach}
          reducedMotion={reducedMotion}
        />

        {/* Level 01: Origin Story (2012-2017) */}
        <OriginStory playClick={playClick} />

        {/* Level 02: Milestone Timeline (2012-2026) */}
        <MilestoneTimeline playClick={playClick} playMilestone={playMilestone} />

        {/* Level 03: Production Vault & Guinness Records */}
        <ProductionVault
          onSelectVideo={(v) => setActiveVideo(v)}
          playClick={playClick}
          playLaser={playLaser}
        />

        {/* Level 04: Beast Industries Ecosystem */}
        <EmpireEcosystem playClick={playClick} playLaser={playLaser} />

        {/* Level 05: Philanthropy & World Impact */}
        <PhilanthropyImpact playClick={playClick} playLaser={playLaser} />

        {/* Level 06: Telemetry Simulator */}
        <TelemetrySimulator
          onOpenSources={() => setSourcesModalOpen(true)}
          playClick={playClick}
          playLaser={playLaser}
        />
      </main>

      {/* Footer Wordmark & Tribute Disclaimer */}
      <Footer onScrollToTop={() => handleNavigate('#arena')} playClick={playClick} />

      {/* Modals */}
      <VideoTheatreModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        playClick={playClick}
      />

      <SourcesModal
        isOpen={sourcesModalOpen}
        onClose={() => setSourcesModalOpen(false)}
        playClick={playClick}
      />
    </div>
  );
}

export default App;
