import React, { useState } from 'react';
import { Trees, Waves, Droplet, HeartHandshake, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { MRBEAST_DATA } from '@/data/mrbeastData';

interface PhilanthropyImpactProps {
  playClick?: () => void;
  playCash?: () => void;
}

export const PhilanthropyImpact: React.FC<PhilanthropyImpactProps> = ({
  playClick,
  playCash,
}) => {
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>('team-trees');

  const initiatives = MRBEAST_DATA.philanthropy.initiatives;
  const currentInitiative = initiatives.find((i) => i.id === selectedInitiativeId) || initiatives[0];

  const getInitiativeIcon = (id: string) => {
    switch (id) {
      case 'team-trees':
        return <Trees className="w-5 h-5 text-[#00F076]" />;
      case 'team-seas':
        return <Waves className="w-5 h-5 text-[#00F5FF]" />;
      case 'wells-africa':
        return <Droplet className="w-5 h-5 text-[#FFD000]" />;
      case 'medical-restoration':
      default:
        return <HeartHandshake className="w-5 h-5 text-[#FF1E66]" />;
    }
  };

  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 450;
    return { x, y };
  };

  return (
    <section
      id="impact"
      className="relative py-28 sm:py-36 bg-[#050608] border-b border-white/10 overflow-hidden"
    >
      {/* Ambient Emerald Aurora Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00F076]/08 blur-[180px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F076]/10 border border-[#00F076]/20 text-xs font-bold text-[#00F076] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL HUMANITARIAN IMPACT</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight uppercase text-white">
              MAKING KINDNESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F076] via-[#00F5FF] to-[#FFD000]">
                MEASURABLE.
              </span>
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-[#00F076]/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#00F076]" />
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">BEAST PHILANTHROPY 501(C)(3)</span>
              <div className="font-display font-black text-lg text-[#00F076]">100% REVENUE COMMITTED TO AID</div>
            </div>
          </div>
        </div>

        {/* 4 Initiative Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initiatives.map((init) => {
            const isSelected = selectedInitiativeId === init.id;
            return (
              <button
                key={init.id}
                onClick={() => {
                  playClick?.();
                  playCash?.();
                  setSelectedInitiativeId(init.id);
                }}
                className={`p-6 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#00F076]/20 to-transparent border-[#00F076] shadow-[0_10px_30px_rgba(0,240,118,0.2)] -translate-y-1.5'
                    : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    {getInitiativeIcon(init.id)}
                  </div>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#00F076] animate-pulse" />}
                </div>

                <div className="mt-5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {init.title}
                  </span>
                  <div className="font-display font-black text-3xl text-white mt-1 tabular-nums">
                    {init.metric}
                  </div>
                  <span className="text-xs text-[#00F076] font-semibold mt-1 block">
                    {init.unit}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-400 truncate">
                  {init.partner}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Holographic SVG World Map */}
        <div className="mt-10 glass-card p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 text-[#00F076] font-bold text-sm uppercase tracking-wide">
              <MapPin className="w-4 h-4" />
              <span>GLOBAL DEPLOYMENT SCHEMATIC // {currentInitiative.title}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              PULSING GPS CLUSTERS VERIFIED ACTIVE
            </span>
          </div>

          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-2xl bg-black/70 border border-white/10 overflow-hidden p-3 shadow-inner">
            <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
              {/* Minimal Geometric Continents */}
              <polygon points="120,60 220,60 260,110 240,160 170,180 130,120 100,80" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="210,210 270,230 290,320 250,380 220,340 190,260" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="390,70 470,80 480,130 420,150 380,120" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="380,160 480,160 510,240 480,340 430,340 370,240" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="490,70 680,80 720,180 640,240 520,200 480,140" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="630,280 720,290 710,360 620,350" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

              {/* Equator */}
              <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="400" y1="0" x2="400" y2="450" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Pulsing Coordinates */}
              {currentInitiative.coordinates.map((coord, idx) => {
                const pt = projectCoords(coord.lat, coord.lng);
                return (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="#00F076" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#00F076" />
                    <text
                      x={pt.x + 10}
                      y={pt.y - 6}
                      fill="#FFFFFF"
                      fontSize="10"
                      fontFamily="Plus Jakarta Sans"
                      fontWeight="bold"
                    >
                      {coord.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono text-slate-300">
              DEPLOYED SITES: {currentInitiative.coordinates.length} CONTINENTAL CLUSTERS
            </div>
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
            <div className="text-slate-300">
              <strong className="text-white font-bold">{currentInitiative.title}:</strong> {currentInitiative.description}
            </div>
            <div className="text-[#00F076] font-bold whitespace-nowrap">
              PARTNER: {currentInitiative.partner}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
