import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Award, ShieldCheck, Play, MoveRight } from 'lucide-react';
import { MRBEAST_DATA, VideoDossier } from '@/data/mrbeastData';
import { WatchStyleScrollyEngine } from '@/components/three/WatchStyleScrollyEngine';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollyHeroStageProps {
  onPlayShowreel: (video: VideoDossier) => void;
  playClick?: () => void;
}

export const ScrollyHeroStage: React.FC<ScrollyHeroStageProps> = ({
  onPlayShowreel,
  playClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageProgress, setStageProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const flagshipVideo = MRBEAST_DATA.productionVideos[0];

  // Track mouse position across window for interactive tilt parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dedicated GSAP ScrollTrigger for pinned 5-act deconstruction
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          setStageProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Programmatic jump to a specific act within the 550vh track
  const jumpToAct = (targetProgress: number) => {
    playClick?.();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const trackHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = scrollTop + trackHeight * targetProgress;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Determine active act
  const isAct1 = stageProgress < 0.2;
  const isAct2 = stageProgress >= 0.2 && stageProgress < 0.45;
  const isAct3 = stageProgress >= 0.45 && stageProgress < 0.7;
  const isAct4 = stageProgress >= 0.7 && stageProgress < 0.88;
  const isAct5 = stageProgress >= 0.88;

  return (
    <div id="arena" ref={containerRef} className="relative w-full">
      {/* 550vh Pinned Scrollytelling Track */}
      <div className="relative h-[550vh]">
        {/* Sticky Fullscreen 3D Viewport & HUD */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-12 pointer-events-none select-none z-10 overflow-hidden">
          {/* Pinned 3D Attention Calibre Canvas Background */}
          <WatchStyleScrollyEngine progress={stageProgress} interactiveRotation={mousePos} />

          {/* Top Stage Header (Luxury Timepiece Calibre Bar) */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-white font-bold tracking-wider">
                {isAct1 && 'ACT 01 // ASSEMBLED ATTENTION CALIBRE'}
                {isAct2 && 'ACT 02 // DECONSTRUCTED CASING & ALGORITHM HOOK'}
                {isAct3 && 'ACT 03 // 500,000,000 GYROSCOPIC TIMELINE'}
                {isAct4 && 'ACT 04 // $100M ARENA & 44 GUINNESS RECORDS'}
                {isAct5 && 'ACT 05 // $5B EMPIRE & EMERALD BIOSPHERE'}
              </span>
            </div>

            {/* Act Quick-Scrub Pills */}
            <div className="pointer-events-auto flex items-center gap-1.5 bg-[#06080C]/80 backdrop-blur-md p-1 rounded-full border border-white/10">
              {[
                { label: '01', name: 'Monolith', progress: 0.05 },
                { label: '02', name: 'Exploded', progress: 0.32 },
                { label: '03', name: '500M', progress: 0.58 },
                { label: '04', name: 'Arena', progress: 0.78 },
                { label: '05', name: 'Biosphere', progress: 0.94 },
              ].map((act, i) => {
                const isActive =
                  (i === 0 && isAct1) ||
                  (i === 1 && isAct2) ||
                  (i === 2 && isAct3) ||
                  (i === 3 && isAct4) ||
                  (i === 4 && isAct5);
                return (
                  <button
                    key={act.label}
                    onClick={() => jumpToAct(act.progress)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00E5FF] text-[#06080C] shadow-[0_0_15px_rgba(0,229,255,0.6)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {act.label} {act.name}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 font-mono text-slate-400">
              <span>EXPLODED VECTOR:</span>
              <span className="text-[#00E5FF] font-bold tabular-nums">
                {Math.round(stageProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Central Layer 1: Act 01 Assembled Monolith (0% - 20%) */}
          <div
            className={`relative z-20 transition-all duration-700 max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-auto ${
              isAct1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-8 pointer-events-none absolute inset-x-0 top-1/3'
            }`}
          >
            {/* Jimmy's Official Studio Portrait (Steven Khan / Wikimedia Commons CC BY 4.0) */}
            <div className="relative mb-6 group cursor-pointer">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-tr from-[#00E5FF] via-white to-[#FF1E66] shadow-[0_0_50px_rgba(0,229,255,0.45)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/MrBeast_2023.jpg/800px-MrBeast_2023.jpg"
                  alt="Jimmy Donaldson (MrBeast)"
                  className="w-full h-full rounded-full object-cover object-top filter brightness-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Jimmy_Donaldson_2021.jpg/800px-Jimmy_Donaldson_2021.jpg';
                  }}
                />
              </div>
              <div className="absolute -bottom-2.5 inset-x-0 flex justify-center">
                <span className="px-3 py-0.5 rounded-full bg-[#06080C] border border-[#00E5FF]/50 text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-wider shadow-md">
                  JIMMY DONALDSON
                </span>
              </div>
            </div>

            <h1 className="font-display font-black text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.88] tracking-tighter uppercase text-white">
              ARCHITECT OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF1E66]">
                ATTENTION.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Scroll down to watch the 3D Attention Calibre smoothly decouple into its mechanical layers:
              the bedroom obsession, the 500M milestone timeline, the $100M arena, and global aid.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => jumpToAct(0.32)}
                className="luxury-pill px-6 py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#06080C] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.7)] transition-all cursor-pointer"
              >
                <span>SCROLL DOWN TO DECONSTRUCT</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={() => {
                  playClick?.();
                  onPlayShowreel(flagshipVideo);
                }}
                className="luxury-pill px-5 py-3.5 bg-white/5 border border-white/15 hover:border-white/30 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#FF1E66] text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>WATCH 60s SHOWREEL</span>
              </button>
            </div>
          </div>

          {/* Central Layer 2: Act 02 Deconstructed Casing & Algorithm Lab (20% - 45%) */}
          <div
            className={`relative z-20 transition-all duration-700 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pointer-events-auto ${
              isAct2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute inset-x-6 top-1/4'
            }`}
          >
            {/* Left Technical Narrative Card */}
            <div className="glass-panel p-8 text-left space-y-4">
              <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF1E66]" />
                CALIBRE DECOUPLING // 2012–2017
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                FIVE YEARS IN THE DARK.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Observe the titanium Beast Cyan shells separating outward on the X-axis: exposing the silicon core where Jimmy Donaldson
                and his peer mastermind group analyzed thousands of video frames every day—reverse-engineering first-5-second retention hooks and pacing.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#00E5FF]">40-HOUR CHAIR INFLECTION</span>
                <span className="text-white font-bold">100% REINVESTED</span>
              </div>
            </div>

            {/* Right Mechanical Telemetry & Leader Lines */}
            <div className="hidden md:flex flex-col space-y-4 text-left font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#06080C]/85 border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">PART 01 // OUTER CHASSIS</span>
                  <span className="text-white font-bold text-sm">Beast Cyan Titanium Shells</span>
                </div>
                <span className="text-[#00E5FF] font-bold">[OFFSET: 2.4 UNITS]</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080C]/85 border border-[#FF1E66]/40 backdrop-blur-xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">PART 02 // TOURBILLON SPINE</span>
                  <span className="text-white font-bold text-sm">Hot Laser Pink Lightning Strike</span>
                </div>
                <span className="text-[#FF1E66] font-bold">[ELEVATION: 1.6 UNITS]</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080C]/85 border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">PART 03 // BEZEL</span>
                  <span className="text-white font-bold text-sm">Refractive Sapphire Crystal Ring</span>
                </div>
                <span className="text-white font-bold">[IOR: 1.77]</span>
              </div>
            </div>
          </div>

          {/* Central Layer 3: Act 03 The 500M Gyroscopic Timeline (45% - 70%) */}
          <div
            className={`relative z-20 transition-all duration-700 max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-auto ${
              isAct3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute inset-x-6 top-1/4'
            }`}
          >
            <span className="text-xs font-mono font-bold text-[#FF1E66] uppercase tracking-wider mb-2">
              GYROSCOPIC CALIBRE TIMELINE // 2012–2026
            </span>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              523,000,000 STRONG.
            </h2>

            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              The 3 concentric balance rings spin on orthogonal axes: tracking the historical trajectory from PewDiePie in 2022 to surpassing T-Series on June 1, 2024,
              and breaking the half-billion subscriber barrier on June 12, 2026.
            </p>

            {/* Milestone Cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
              <div className="glass-panel p-4 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">FEB 2012</span>
                <span className="font-display font-bold text-base text-white">MRBEAST6000</span>
              </div>
              <div className="glass-panel p-4 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">NOV 2021</span>
                <span className="font-display font-bold text-base text-[#00E5FF]">SQUID GAME</span>
              </div>
              <div className="glass-panel p-4 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">JUNE 2024</span>
                <span className="font-display font-bold text-base text-[#FF1E66]">#1 CHANNEL</span>
              </div>
              <div className="glass-panel p-4 text-center border-[#00E5FF]/40">
                <span className="text-[10px] text-[#00E5FF] font-mono block">JUNE 2026</span>
                <span className="font-display font-black text-base text-white">500M+ SUBS</span>
              </div>
            </div>
          </div>

          {/* Central Layer 4: Act 04 The $100M Arena & 44 Guinness Records (70% - 88%) */}
          <div
            className={`relative z-20 transition-all duration-700 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pointer-events-auto ${
              isAct4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute inset-x-6 top-1/4'
            }`}
          >
            <div className="glass-panel p-8 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1E66]/15 border border-[#FF1E66]/30 text-xs font-bold text-[#FF1E66]">
                <Award className="w-4 h-4" />
                <span>AMAZON PRIME BROADCAST // 44 GUINNESS RECORDS</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                BEAST GAMES: $100M ARENA.
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Laser magenta spotlights illuminate the elevated tourbillon core: tracking across 2,000 contestants,
                1,107 simultaneous cameras, and a $5,000,000 physical cash pyramid on set.
              </p>

              <button
                onClick={() => {
                  playClick?.();
                  onPlayShowreel(flagshipVideo);
                }}
                className="luxury-pill px-5 py-2.5 bg-white text-[#06080C] font-extrabold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-lg hover:bg-[#00E5FF] transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>LAUNCH OFFICIAL SHOWREEL</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs text-left">
              <div className="glass-panel p-4 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px]">GUINNESS RECORD #01</span>
                  <div className="font-display font-bold text-white text-base">Largest Reality Prize Pool</div>
                </div>
                <span className="font-display font-black text-xl text-[#00E5FF]">$10,000,000</span>
              </div>

              <div className="glass-panel p-4 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px]">GUINNESS RECORD #02</span>
                  <div className="font-display font-bold text-white text-base">Simultaneous Cameras</div>
                </div>
                <span className="font-display font-black text-xl text-[#FF1E66]">1,107</span>
              </div>

              <div className="glass-panel p-4 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px]">GUINNESS RECORD #03</span>
                  <div className="font-display font-bold text-white text-base">Contestants in Season</div>
                </div>
                <span className="font-display font-black text-xl text-white">2,000</span>
              </div>
            </div>
          </div>

          {/* Central Layer 5: Act 05 Global Emerald Biosphere (88% - 100%) */}
          <div
            className={`relative z-20 transition-all duration-700 max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-auto ${
              isAct5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none absolute inset-x-6 top-1/4'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F076]/15 border border-[#00F076]/30 text-xs font-bold text-[#00F076] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>GLOBAL HUMANITARIAN BIOSPHERE</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              25M TREES. 34M LBS SEAS.
            </h2>

            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              The calibre dissolves into pure emerald radiance: funding 100 clean water wells across Africa,
              cataract surgeries for 1,000 blind individuals, and 100% of Beast Philanthropy income committed to global relief.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-mono">
              <span className="px-4 py-2 rounded-full bg-black/70 border border-[#00F076]/40 text-[#00F076] font-bold">
                100 SOLAR WELLS // 500,000 PEOPLE
              </span>
              <span className="px-4 py-2 rounded-full bg-black/70 border border-[#00E5FF]/40 text-[#00E5FF] font-bold">
                1,000 SIGHT RESTORATIONS
              </span>
              <span className="px-4 py-2 rounded-full bg-black/70 border border-[#FF1E66]/40 text-white font-bold">
                BEAST INDUSTRIES $5B VALUATION
              </span>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-[#00E5FF]">GREENVILLE, NC</span>
              <span className="text-white/40">|</span>
              <span>OCTOBER 2026 ARCHIVE</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F076]" />
              <span className="text-slate-300">SCROLL TO INSPECT ALL LAYERS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
