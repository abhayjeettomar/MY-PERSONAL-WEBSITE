import React from 'react';
import { ArrowUp, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  playClick?: () => void;
}

const OFFICIAL_LINKS = [
  { name: 'YouTube @MrBeast', url: 'https://www.youtube.com/@MrBeast', category: 'MAIN CHANNEL' },
  { name: 'Feastables.com', url: 'https://feastables.com', category: 'CPG CHOCOLATE' },
  { name: 'BeastPhilanthropy.org', url: 'https://www.beastphilanthropy.org', category: '501(C)(3) AID' },
  { name: 'TeamTrees.org', url: 'https://teamtrees.org', category: 'ARBOR DAY' },
  { name: 'TeamSeas.org', url: 'https://teamseas.org', category: 'THE OCEAN CLEANUP' },
];

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, playClick }) => {
  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-24 pb-12 overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 pb-16 border-b border-white/10">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-mono font-bold text-[#FFD000] uppercase tracking-wider">
              OFFICIAL VERIFIED ECOSYSTEM
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              CONNECT WITH THE EMPIRE.
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Explore official digital channels, global humanitarian initiatives, and consumer snack products built by Jimmy Donaldson.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-[320px]">
            {OFFICIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick?.()}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5FF]/60 hover:bg-white/[0.08] text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {link.category}
                  </div>
                  <div className="font-display font-bold text-sm mt-0.5">
                    {link.name}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#00F5FF] transition-colors" />
              </a>
            ))}

            <button
              onClick={() => {
                playClick?.();
                onScrollToTop();
              }}
              className="p-4 rounded-2xl bg-gradient-to-r from-[#FFD000] to-[#FF9900] text-[#07080C] font-display font-extrabold text-sm uppercase flex items-center justify-between transition-all hover:scale-[1.02] cursor-pointer shadow-lg"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Colossal Kinetic MRBEAST Typography */}
        <div className="py-16 sm:py-24 text-center overflow-hidden">
          <div className="font-display font-black text-[clamp(4.5rem,18vw,19rem)] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/05 to-transparent hover:from-[#00F5FF]/40 hover:to-[#FFD000]/30 transition-all duration-700 uppercase select-none">
            MRBEAST
          </div>
        </div>

        {/* Tribute Disclaimer */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00F5FF] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-slate-400 leading-relaxed">
              <strong className="text-white font-bold uppercase tracking-wide block">
                UNOFFICIAL CREATIVE TRIBUTE:
              </strong>
              <p>
                This interactive experience is an independent design and engineering showcase created as an unofficial fan and editorial tribute. It is not affiliated with, endorsed by, or sponsored by Jimmy Donaldson (MrBeast), Beast Industries, Feastables, Beast Philanthropy, or Amazon MGM Studios. All statistical metrics are verified from public records as of October 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 border-t border-white/10 pt-6">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF1E66] fill-[#FF1E66]" />
            <span>using React 18, Three.js &amp; GSAP</span>
          </div>
          <div className="flex items-center gap-4">
            <span>GREENVILLE, NC // GLOBAL REACH</span>
            <span>OCTOBER 2026 ARCHIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
