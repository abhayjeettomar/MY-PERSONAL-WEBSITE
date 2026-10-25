import React, { useState } from 'react';
import { BarChart3, Database, Scale, ShieldCheck, ChevronRight } from 'lucide-react';
import { MRBEAST_DATA, ScaleComparison } from '@/data/mrbeastData';

interface TelemetrySimulatorProps {
  onOpenSources: () => void;
  playClick?: () => void;
  playLaser?: () => void;
}

export const TelemetrySimulator: React.FC<TelemetrySimulatorProps> = ({
  onOpenSources,
  playClick,
  playLaser,
}) => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>('superbowl');

  const comparisons = MRBEAST_DATA.scaleComparisons;
  const currentComparison = comparisons.find((c) => c.id === selectedComparisonId) || comparisons[0];

  const counters = [
    {
      num: '523,000,000+',
      label: 'Main Channel Subscribers',
      sub: '#1 Channel on Earth (Crossed 500M on June 12, 2026)',
      accent: 'text-beast-cyan',
      tag: 'SUB_COUNT_OCT_2026',
    },
    {
      num: '144.2B+',
      label: 'Main Channel Views',
      sub: '177B+ Across Combined Network Channels',
      accent: 'text-beast-gold',
      tag: 'YT_VERIFIED_VIEW_INDEX',
    },
    {
      num: '141,200,000',
      label: 'Average Views Per Upload',
      sub: 'Exceeds Standard US Television Primetime 12x',
      accent: 'text-text-primary',
      tag: 'RETENTION_MEAN_BENCHMARK',
    },
    {
      num: '$5,000,000,000',
      label: 'Beast Industries Valuation',
      sub: 'Series C Round ($300M Alpha Wave / $200M Bitmine)',
      accent: 'text-beast-emerald',
      tag: 'CORP_EQUITY_VALUATION',
    },
    {
      num: '44',
      label: 'Guinness World Records Broken',
      sub: 'Adjudicated on Amazon Prime Video Beast Games',
      accent: 'text-beast-gold',
      tag: 'GWR_CERTIFIED_SERIES',
    },
    {
      num: '34,000,000+ LBS',
      label: 'Ocean Waste Cleared (#TeamSeas)',
      sub: 'Plus 25,000,000+ Trees Planted (#TeamTrees)',
      accent: 'text-beast-cyan',
      tag: 'VERIFIED_PLANETARY_RECOVERY',
    },
  ];

  return (
    <section
      id="telemetry"
      className="relative py-24 sm:py-32 bg-obsidian border-b border-border-hairline"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-beast-cyan tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-beast-cyan" />
              <span>LVL 06 // VERIFIED TELEMETRY DECK</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] uppercase tracking-tight text-text-primary">
              BY THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-beast-cyan via-beast-gold to-beast-magenta">
                NUMBERS.
              </span>
            </h2>
          </div>

          <button
            onClick={() => {
              playClick?.();
              onOpenSources();
            }}
            className="btn-chamfer px-4 py-2.5 bg-vault border border-beast-gold/50 hover:bg-beast-gold hover:text-obsidian text-beast-gold font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            <Database className="w-4 h-4" />
            <span>AUDIT RAW SOURCES [OCT 2026]</span>
          </button>
        </div>

        {/* 6 Odometer-Style Data Matrix Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counters.map((c, idx) => (
            <div
              key={idx}
              className="vault-card p-6 sm:p-8 flex flex-col justify-between crosshair-corner group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-hairline font-mono text-[10px] text-text-muted">
                  <span className="text-beast-cyan font-bold">[{c.tag}]</span>
                  <span>OCT 2026</span>
                </div>

                <div
                  className={`font-mono font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-4 tabular-nums ${c.accent}`}
                >
                  {c.num}
                </div>

                <div className="font-display font-bold text-lg text-text-primary uppercase tracking-tight mt-2">
                  {c.label}
                </div>

                <p className="mt-2 text-text-muted text-xs sm:text-sm leading-relaxed">
                  {c.sub}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border-hairline flex items-center justify-between font-mono text-[10px] text-text-muted">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-beast-cyan" />
                  <span>CENTRALIZED DATA NODE</span>
                </span>
                <span className="text-text-muted/60">data/mrbeastData.ts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Wow Moment #2: Interactive "Physical Scale Comparator" Widget */}
        <div className="mt-16 p-6 sm:p-10 bg-vault border border-border-hairline crosshair-corner">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-hairline">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-beast-gold uppercase tracking-wider font-bold">
                <Scale className="w-4 h-4 text-beast-gold" />
                <span>INTERACTIVE PHYSICAL SCALE COMPARATOR</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary uppercase tracking-tight mt-1">
                COMPREHENDING IMPOSSIBLE NUMBERS.
              </h3>
              <p className="mt-2 text-text-muted text-sm max-w-2xl leading-relaxed">
                Human brains are not wired to visualize half a billion subscribers or 144 billion views. Select a physical benchmark to contextualize MrBeast&apos;s metrics in the physical world.
              </p>
            </div>

            {/* Benchmark Switch Buttons */}
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              {comparisons.map((comp) => {
                const isSelected = selectedComparisonId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      playLaser?.();
                      setSelectedComparisonId(comp.id);
                    }}
                    className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wider border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-beast-gold bg-beast-gold text-obsidian font-bold shadow-[0_0_15px_rgba(255,208,0,0.3)]'
                        : 'border-border-hairline bg-obsidian text-text-muted hover:border-text-muted hover:text-text-primary'
                    }`}
                  >
                    {comp.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Comparison Bar Visualizer */}
          <div className="mt-8 p-6 bg-obsidian border border-border-hairline space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
              <span className="text-beast-cyan font-bold uppercase tracking-wider">
                {currentComparison.comparisonLabel}
              </span>
              <span className="text-beast-gold font-bold">
                RATIO: {currentComparison.ratio}x BENCHMARK
              </span>
            </div>

            {/* Visual Comparative Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="text-beast-cyan font-bold">MRBEAST TELEMETRY:</span>
                  <span className="text-text-primary font-bold tabular-nums">
                    {currentComparison.mrbeastStat}
                  </span>
                </div>
                <div className="h-4 w-full bg-vault border border-border-hairline overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-beast-cyan via-beast-gold to-beast-cyan w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="text-text-muted">BENCHMARK COMPARISON:</span>
                  <span className="text-text-muted tabular-nums">{currentComparison.benchmarkStat}</span>
                </div>
                <div className="h-3 w-full bg-vault border border-border-hairline overflow-hidden">
                  <div
                    className="h-full bg-text-muted/50 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        currentComparison.ratio > 1
                          ? (1 / currentComparison.ratio) * 100
                          : currentComparison.ratio * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Editorial Context Explainer */}
            <p className="pt-4 border-t border-border-hairline text-text-muted text-sm leading-relaxed">
              {currentComparison.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
