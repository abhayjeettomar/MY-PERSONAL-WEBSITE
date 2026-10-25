import React, { useState, useEffect, useCallback } from 'react';
import { Preloader } from '@/components/layout/Preloader';
import { BroadcastHUD } from '@/components/layout/BroadcastHUD';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { BeastAttentionEngine } from '@/components/three/BeastAttentionEngine';
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
  const [currentLevelName, setCurrentLevelName] = useState('Overview');

  const reducedMotion = useReducedMotion();
  const { playClick, playHover, playBreach, playMilestone } = useSoundFX(sfxEnabled);
  const { scrollProgress, scrollTo } = useSmoothScroll(!reducedMotion && preloaderComplete);

  // Smooth Intersection Observer for Chapter detection
  useEffect(() => {
    if (!preloaderComplete) return;

    const sectionMap = [
      { id: 'arena', level: 0, name: 'Overview' },
      { id: 'origin', level: 1, name: 'Origin' },
      { id: 'timeline', level: 2, name: '500M' },
      { id: 'vault', level: 3, name: 'Productions' },
      { id: 'empire', level: 4, name: 'Empire' },
      { id: 'impact', level: 5, name: 'Impact' },
      { id: 'telemetry', level: 6, name: 'Data' },
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
      scrollTo(target, { offset: -70 });
    },
    [scrollTo]
  );

  return (
    <div className="min-h-screen bg-[#06080C] text-white selection:bg-[#00E5FF] selection:text-[#06080C] relative">
      {/* Preloader Countdown (Runs once per session unless skipped) */}
      {!preloaderComplete && (
        <Preloader
          onComplete={() => setPreloaderComplete(true)}
          playTick={playHover}
          playBreach={playBreach}
          playMilestone={playMilestone}
        />
      )}

      {/* Persistent 3D Deconstructible Beast Attention Engine */}
      <BeastAttentionEngine scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Custom Context-Aware Desktop Reticle Cursor */}
      <CustomCursor />

      {/* Floating Island HUD */}
      <BroadcastHUD
        currentLevel={currentLevel}
        currentLevelName={currentLevelName}
        scrollProgress={scrollProgress}
        sfxEnabled={sfxEnabled}
        onToggleSFX={() => setSfxEnabled(!sfxEnabled)}
        onOpenSources={() => setSourcesModalOpen(true)}
        onNavigate={handleNavigate}
        playClick={playClick}
      />

      {/* Main Single-Page Journey */}
      <main className="relative z-10">
        {/* Act 01: Hero Arena */}
        <HeroArena
          onEnterVault={() => handleNavigate('#origin')}
          onPlayShowreel={(v) => setActiveVideo(v)}
          playClick={playClick}
        />

        {/* Act 02: Origin Story (2012-2017) */}
        <OriginStory playClick={playClick} />

        {/* Act 03: Milestone Timeline (2012-2026) */}
        <MilestoneTimeline playClick={playClick} playMilestone={playMilestone} />

        {/* Act 04: Production Vault & Guinness Records */}
        <ProductionVault
          onSelectVideo={(v) => setActiveVideo(v)}
          playClick={playClick}
        />

        {/* Act 05: Beast Industries Ecosystem */}
        <EmpireEcosystem playClick={playClick} />

        {/* Act 06: Philanthropy & World Impact */}
        <PhilanthropyImpact playClick={playClick} />

        {/* Act 07: Telemetry Simulator */}
        <TelemetrySimulator
          onOpenSources={() => setSourcesModalOpen(true)}
          playClick={playClick}
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
