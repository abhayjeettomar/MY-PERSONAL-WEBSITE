import React, { useState } from 'react';
import { Trees, Waves, Droplet, HeartHandshake, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MRBEAST_DATA } from '@/data/mrbeastData';

interface PhilanthropyImpactProps {
  playClick?: () => void;
  playLaser?: () => void;
}

export const PhilanthropyImpact: React.FC<PhilanthropyImpactProps> = ({
  playClick,
  playLaser,
}) => {
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>('team-trees');

  const initiatives = MRBEAST_DATA.philanthropy.initiatives;
  const currentInitiative = initiatives.find((i) => i.id === selectedInitiativeId) || initiatives[0];

  const getInitiativeIcon = (id: string) => {
    switch (id) {
      case 'team-trees':
        return <Trees className="w-5 h-5 text-beast-emerald" />;
      case 'team-seas':
        return <Waves className="w-5 h-5 text-beast-cyan" />;
      case 'wells-africa':
        return <Droplet className="w-5 h-5 text-beast-gold" />;
      case 'medical-restoration':
      default:
        return <HeartHandshake className="w-5 h-5 text-beast-magenta" />;
    }
  };

  // Map coordinates (Mercator projection approximation for SVG viewBox 0 0 800 450)
  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 450;
    return { x, y };
  };

  return (
    <section
      id="impact"
      className="relative py-24 sm:py-32 bg-obsidian border-b border-border-hairline transition-colors duration-500"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header with High-Contrast Emerald Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-beast-emerald tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-beast-emerald animate-pulse" />
              <span>LVL 05 // GLOBAL HUMANITARIAN TELEMETRY</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] uppercase tracking-tight text-text-primary">
              MAKING KINDNESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-beast-emerald via-beast-cyan to-beast-emerald">
                VIRAL &amp; MEASURABLE.
              </span>
            </h2>
          </div>

          <div className="p-3.5 bg-vault border border-beast-emerald/40 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-beast-emerald" />
            <div>
              <div className="font-mono text-[10px] text-text-muted uppercase">BEAST PHILANTHROPY 501(C)(3)</div>
              <div className="font-mono font-bold text-sm sm:text-base text-beast-emerald">
                100% REVENUE COMMITTED TO AID
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Initiative Pillars */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initiatives.map((init) => {
            const isSelected = selectedInitiativeId === init.id;
            return (
              <button
                key={init.id}
                onClick={() => {
                  playClick?.();
                  playLaser?.();
                  setSelectedInitiativeId(init.id);
                }}
                className={`p-5 text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-beast-emerald bg-vault shadow-[0_0_25px_rgba(0,230,118,0.15)] -translate-y-1'
                    : 'border-border-hairline bg-vault/60 hover:bg-vault hover:border-text-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-obsidian border border-border-hairline">
                    {getInitiativeIcon(init.id)}
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-beast-emerald" />}
                </div>

                <div className="mt-4">
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                    {init.title}
                  </div>
                  <div className="font-mono font-extrabold text-2xl text-beast-emerald mt-1 tabular-nums">
                    {init.metric}
                  </div>
                  <div className="font-mono text-[11px] text-text-primary mt-0.5">
                    {init.unit}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border-hairline font-mono text-[10px] text-text-muted/70 truncate">
                  {init.partner}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive SVG World Impact Map with Pulsing Coordinate Pins */}
        <div className="mt-10 p-6 sm:p-8 bg-vault border border-border-hairline crosshair-corner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-hairline mb-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-beast-emerald font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>GLOBAL DEPLOYMENT SCHEMATIC // {currentInitiative.title}</span>
            </div>
            <div className="text-text-muted text-[11px]">
              CLICK PINS FOR VERIFIED GPS COORDINATES
            </div>
          </div>

          {/* World Vector Blueprint Map Container */}
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] bg-[#050609] border border-border-hairline overflow-hidden p-2">
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full text-border-hairline"
              fill="none"
              stroke="currentColor"
            >
              {/* Simplified Geometric Continents Blueprint */}
              {/* North America */}
              <polygon
                points="120,60 220,60 260,110 240,160 170,180 130,120 100,80"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* South America */}
              <polygon
                points="210,210 270,230 290,320 250,380 220,340 190,260"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* Europe */}
              <polygon
                points="390,70 470,80 480,130 420,150 380,120"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* Africa */}
              <polygon
                points="380,160 480,160 510,240 480,340 430,340 370,240"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* Asia */}
              <polygon
                points="490,70 680,80 720,180 640,240 520,200 480,140"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* Australia */}
              <polygon
                points="630,280 720,290 710,360 620,350"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />

              {/* Equator & Meridian Grid Lines */}
              <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
              <line x1="400" y1="0" x2="400" y2="450" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />

              {/* Pulsing GPS Coordinate Pins for Active Initiative */}
              {currentInitiative.coordinates.map((coord, idx) => {
                const pt = projectCoords(coord.lat, coord.lng);
                return (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={pt.x} cy={pt.y} r="12" fill="none" stroke="#00E676" strokeWidth="1" className="animate-ping" opacity="0.6" />
                    <circle cx={pt.x} cy={pt.y} r="4" fill="#00E676" />
                    <text
                      x={pt.x + 8}
                      y={pt.y - 6}
                      fill="#F4F6FA"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      fontWeight="bold"
                    >
                      {coord.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Micro Details on bottom */}
            <div className="absolute bottom-3 left-3 bg-obsidian/80 px-2.5 py-1 border border-border-hairline font-mono text-[9px] text-text-muted">
              COORDINATES: {currentInitiative.coordinates.length} ACTIVE CLUSTERS PINNED
            </div>
          </div>

          {/* Active Humanitarian Summary Note */}
          <div className="mt-6 p-4 bg-obsidian border border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="text-text-muted">
              <span className="text-beast-emerald font-bold">{currentInitiative.title}</span>:{' '}
              {currentInitiative.description}
            </div>
            <div className="text-beast-gold whitespace-nowrap">
              PARTNER: {currentInitiative.partner}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
