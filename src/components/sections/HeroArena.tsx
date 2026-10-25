import React from 'react';
import { ArrowDown, Play, Sparkles, Coins, Flame } from 'lucide-react';
import { PrizeVaultCanvas } from '@/components/three/PrizeVaultCanvas';
import { MRBEAST_DATA, VideoDossier } from '@/data/mrbeastData';
import { fireCashCannon, fireMegaJackpot } from '@/components/ui/CashCannon';

interface HeroArenaProps {
  onEnterVault: () => void;
  onPlayShowreel: (video: VideoDossier) => void;
  playClick?: () => void;
  playCash?: () => void;
  playBreach?: () => void;
  reducedMotion?: boolean;
}

export const HeroArena: React.FC<HeroArenaProps> = ({
  onEnterVault,
  onPlayShowreel,
  playClick,
  playCash,
  playBreach,
  reducedMotion = false,
}) => {
  const handleVaultBreach = () => {
    playCash?.();
    playBreach?.();
    fireMegaJackpot();
    onEnterVault();
  };

  const flagshipVideo = MRBEAST_DATA.productionVideos[0];

  return (
    <section
      id="arena"
      className="relative min-h-[100dvh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#050608]"
    >
      {/* Ambient Aurora Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00F5FF]/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FFD000]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#FF1E66]/05 blur-[160px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column: Bold Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          {/* Top Pill Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00F5FF]">
              <Sparkles className="w-3.5 h-3.5" />
              JIMMY DONALDSON // ARCHIVE
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD000]/10 border border-[#FFD000]/20 text-xs font-bold text-[#FFD000]">
              <Flame className="w-3.5 h-3.5" />
              523M+ SUBSCRIBERS (#1 WORLD)
            </span>
          </div>

          {/* Colossal Minimalist Headline */}
          <h1 className="font-display font-extrabold text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] tracking-tighter uppercase text-white">
            ARCHITECT OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#FFD000] to-[#FF1E66]">
              ATTENTION.
            </span>
          </h1>

          {/* Editorial Lead Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-normal">
            From counting to 100,000 in a North Carolina bedroom as MrBeast6000 to commanding half a billion subscribers,
            44 Guinness World Records on Amazon Prime's <em>Beast Games</em>, and a $5 billion business empire. Every single dollar is reinvested into the next frame.
          </p>

          {/* Luxury Floating Glass Stats Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-2xl">
            <div className="glass-card p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-medium">Main Channel</span>
              <div className="font-display font-black text-2xl sm:text-3xl text-white mt-1 tabular-nums">
                523M+
              </div>
              <span className="text-[11px] text-[#00F5FF] font-semibold mt-1">#1 in Human History</span>
            </div>

            <div className="glass-card p-4 sm:p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-medium">Combined Views</span>
              <div className="font-display font-black text-2xl sm:text-3xl text-[#FFD000] mt-1 tabular-nums">
                177B+
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-1">18 Global Channels</span>
            </div>

            <div className="glass-card p-4 sm:p-5 flex flex-col justify-between col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 font-medium">Beast Industries</span>
              <div className="font-display font-black text-2xl sm:text-3xl text-[#00F076] mt-1 tabular-nums">
                $5.0B
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-1">Series C Valuation</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                playClick?.();
                onEnterVault();
              }}
              className="btn-pill px-8 py-4 bg-gradient-to-r from-[#FFD000] to-[#FF9900] text-[#07080C] font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(255,208,0,0.4)] hover:shadow-[0_0_50px_rgba(255,208,0,0.8)] cursor-pointer group"
            >
              <span>EXPLORE THE ARCHIVE</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playClick?.();
                onPlayShowreel(flagshipVideo);
              }}
              className="btn-pill px-6 py-4 bg-white/5 border border-white/10 hover:border-white/30 text-white font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-[#00F5FF] text-[#07080C] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>WATCH 60s SHOWREEL</span>
            </button>

            <button
              onClick={() => {
                playCash?.();
                fireCashCannon();
              }}
              className="btn-pill px-5 py-4 bg-white/5 border border-[#FFD000]/30 hover:border-[#FFD000] text-[#FFD000] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
              title="Shoot gold & currency particles"
            >
              <Coins className="w-4 h-4" />
              <span>MAKE IT RAIN</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Centerpiece in Liquid Glass Vessel */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full max-w-[540px] aspect-square relative rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-2 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <PrizeVaultCanvas onBreach={handleVaultBreach} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>

      {/* Infinite Smooth Velocity Marquee Ticker */}
      <div className="relative z-10 mt-12 py-3 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden select-none">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="inline-flex items-center gap-8 animate-marquee font-display font-extrabold text-sm tracking-wider text-slate-300 uppercase">
            <span>523M+ MAIN CHANNEL SUBSCRIBERS</span>
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
            <span>144.2B+ MAIN CHANNEL VIEWS</span>
            <span className="w-2 h-2 rounded-full bg-[#FFD000]" />
            <span>FIRST CREATOR TO 500M SUBS (JUNE 12, 2026)</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>$5,000,000,000 BEAST INDUSTRIES VALUATION</span>
            <span className="w-2 h-2 rounded-full bg-[#00F076]" />
            <span>44 GUINNESS WORLD RECORDS ON BEAST GAMES</span>
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
          </div>
          <div className="inline-flex items-center gap-8 animate-marquee font-display font-extrabold text-sm tracking-wider text-slate-300 uppercase">
            <span>523M+ MAIN CHANNEL SUBSCRIBERS</span>
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
            <span>144.2B+ MAIN CHANNEL VIEWS</span>
            <span className="w-2 h-2 rounded-full bg-[#FFD000]" />
            <span>FIRST CREATOR TO 500M SUBS (JUNE 12, 2026)</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>$5,000,000,000 BEAST INDUSTRIES VALUATION</span>
            <span className="w-2 h-2 rounded-full bg-[#00F076]" />
            <span>44 GUINNESS WORLD RECORDS ON BEAST GAMES</span>
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
          </div>
        </div>
      </div>
    </section>
  );
};
