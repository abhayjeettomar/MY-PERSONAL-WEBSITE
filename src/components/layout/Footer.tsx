import React from 'react';
import { ArrowUp, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  playClick?: () => void;
}

const OFFICIAL_LINKS = [
  { name: 'YouTube @MrBeast', url: 'https://www.youtube.com/@MrBeast', category: 'MAIN BROADCAST' },
  { name: 'Feastables.com', url: 'https://feastables.com', category: 'CPG CHOCOLATE' },
  { name: 'BeastPhilanthropy.org', url: 'https://www.beastphilanthropy.org', category: '501(C)(3) CHARITY' },
  { name: 'TeamTrees.org', url: 'https://teamtrees.org', category: 'ARBOR DAY FOUNDATION' },
  { name: 'TeamSeas.org', url: 'https://teamseas.org', category: 'OCEAN CONSERVANCY' },
];

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, playClick }) => {
  return (
    <footer className="relative bg-obsidian border-t border-border-hairline pt-20 pb-12 overflow-hidden select-none">
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 telemetry-grid opacity-20 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Top Destination Matrix */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 pb-16 border-b border-border-hairline">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-beast-gold uppercase tracking-widest font-bold">
              <span className="w-2 h-2 bg-beast-gold" />
              <span>OFFICIAL VERIFIED DESTINATIONS</span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
              CONNECT WITH THE ECOSYSTEM.
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Explore official digital channels, global non-profit initiatives, and consumer retail products built by Jimmy Donaldson and Beast Industries.
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
                className="p-3.5 bg-vault border border-border-hairline hover:border-beast-cyan text-text-primary hover:text-beast-cyan transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                    {link.category}
                  </div>
                  <div className="font-mono text-xs font-bold mt-0.5">
                    {link.name}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-beast-cyan transition-colors" />
              </a>
            ))}

            {/* Jump to top button */}
            <button
              onClick={() => {
                playClick?.();
                onScrollToTop();
              }}
              className="p-3.5 bg-beast-gold text-obsidian font-mono text-xs font-bold hover:bg-beast-cyan transition-colors flex items-center justify-between uppercase cursor-pointer"
            >
              <span>RETURN TO ARENA [TOP]</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Oversized Kinetic MRBEAST SVG Wordmark */}
        <div className="py-12 sm:py-16 text-center overflow-hidden">
          <div className="font-display font-extrabold text-[clamp(4.5rem,17vw,17rem)] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary/20 via-text-primary/10 to-transparent hover:from-beast-cyan/30 hover:to-beast-gold/20 transition-all duration-700 uppercase select-none">
            MRBEAST
          </div>
        </div>

        {/* Mandatory Legal & Tribute Disclaimer (Render clearly) */}
        <div className="p-6 bg-vault/80 border border-border-hairline crosshair-corner">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-beast-cyan flex-shrink-0 mt-0.5" />
            <div className="space-y-1 font-mono text-xs text-text-muted leading-relaxed">
              <span className="text-text-primary font-bold uppercase tracking-wider block">
                UNOFFICIAL CREATIVE TRIBUTE:
              </span>
              <p>
                This interactive experience is an independent design and engineering showcase created as an unofficial fan and editorial tribute. It is not affiliated with, endorsed by, or sponsored by Jimmy Donaldson (MrBeast), Beast Industries, Feastables, Beast Philanthropy, or Amazon MGM Studios. All statistical metrics are verified from public records as of October 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Micro Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-text-muted/60 border-t border-border-hairline pt-6">
          <div>
            ENGINEERED WITH REACT 18 + THREE.JS + GSAP + LENIS // PRODUCTION GRADE
          </div>
          <div className="flex items-center gap-4">
            <span>GREENVILLE, NC // GLOBAL BROADCAST</span>
            <span>DATA AS OF: OCTOBER 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
