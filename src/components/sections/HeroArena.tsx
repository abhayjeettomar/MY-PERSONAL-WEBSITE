import React from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { MRBEAST_DATA, VideoDossier } from '@/data/mrbeastData';

interface HeroArenaProps {
  onEnterVault: () => void;
  onPlayShowreel: (video: VideoDossier) => void;
  playClick?: () => void;
}

export const HeroArena: React.FC<HeroArenaProps> = ({
  onEnterVault,
  onPlayShowreel,
  playClick,
}) => {
  const flagshipVideo = MRBEAST_DATA.productionVideos[0];

  return (
    <section
      id="arena"
      className="relative min-h-[100dvh] pt-36 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient Radial Auroras */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00E5FF]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF1E66]/10 blur-[180px] pointer-events-none" />

      {/* Main Hero Stage */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 my-auto text-center flex flex-col items-center">
        {/* Subtle Brand DNA Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF1E66]" />
          <span>JAMES STEPHEN DONALDSON // 523M+ WORLD #1 ARCHIVE</span>
        </div>

        {/* Colossal Kinetic Typography */}
        <h1 className="font-display font-black text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.88] tracking-tighter uppercase text-white max-w-6xl">
          ARCHITECT OF <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF1E66]">
            ATTENTION.
          </span>
        </h1>

        {/* Editorial Sub-copy */}
        <p className="mt-8 text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-normal">
          From a 13-year-old's bedroom in Greenville, North Carolina to half a billion subscribers,
          44 Guinness World Records on Amazon Prime's <em>Beast Games</em>, and a $5 billion business empire.
        </p>

        {/* Minimal Hero Stats Line */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center">
          <div>
            <div className="font-display font-black text-3xl sm:text-5xl text-white tabular-nums">
              523M+
            </div>
            <div className="text-xs text-[#00E5FF] font-bold uppercase tracking-wider mt-1">
              Main Subscribers
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10" />

          <div>
            <div className="font-display font-black text-3xl sm:text-5xl text-white tabular-nums">
              177B+
            </div>
            <div className="text-xs text-[#FF1E66] font-bold uppercase tracking-wider mt-1">
              Network Views
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10" />

          <div>
            <div className="font-display font-black text-3xl sm:text-5xl text-white tabular-nums">
              $5.0B
            </div>
            <div className="text-xs text-white/70 font-bold uppercase tracking-wider mt-1">
              Beast Industries
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              playClick?.();
              onEnterVault();
            }}
            className="luxury-pill px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#06080C] font-extrabold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.7)] cursor-pointer group"
          >
            <span>SCROLL TO DECONSTRUCT</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              playClick?.();
              onPlayShowreel(flagshipVideo);
            }}
            className="luxury-pill px-6 py-4 bg-white/5 border border-white/15 hover:border-white/30 text-white font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FF1E66] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>WATCH 60s SHOWREEL</span>
          </button>
        </div>
      </div>

      {/* Modern Velocity Ticker */}
      <div className="relative z-10 mt-16 py-4 border-y border-white/10 bg-[#06080C]/60 backdrop-blur-md overflow-hidden select-none">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="inline-flex items-center gap-10 animate-marquee font-display font-black text-sm tracking-wider text-slate-300 uppercase">
            <span>523M+ SUBSCRIBERS</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>144.2B+ MAIN CHANNEL VIEWS</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>FIRST CREATOR IN HISTORY TO 500M (JUNE 12, 2026)</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>$5B BEAST INDUSTRIES VALUATION</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>44 GUINNESS WORLD RECORDS ON BEAST GAMES</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
          </div>
          <div className="inline-flex items-center gap-10 animate-marquee font-display font-black text-sm tracking-wider text-slate-300 uppercase">
            <span>523M+ SUBSCRIBERS</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>144.2B+ MAIN CHANNEL VIEWS</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>FIRST CREATOR IN HISTORY TO 500M (JUNE 12, 2026)</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>$5B BEAST INDUSTRIES VALUATION</span>
            <span className="w-2 h-2 rounded-full bg-[#FF1E66]" />
            <span>44 GUINNESS WORLD RECORDS ON BEAST GAMES</span>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
          </div>
        </div>
      </div>
    </section>
  );
};
