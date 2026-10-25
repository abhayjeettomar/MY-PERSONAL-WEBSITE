import React, { useState } from 'react';
import { Scale, Sparkles, Database, Sliders, Flame } from 'lucide-react';
import { MRBEAST_DATA } from '@/data/mrbeastData';

interface TelemetrySimulatorProps {
  onOpenSources: () => void;
  playClick?: () => void;
}

export const TelemetrySimulator: React.FC<TelemetrySimulatorProps> = ({
  onOpenSources,
  playClick,
}) => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>('superbowl');
  const [simulatedSubs, setSimulatedSubs] = useState<number>(523); // in millions

  const comparisons = MRBEAST_DATA.scaleComparisons;
  const currentComparison = comparisons.find((c) => c.id === selectedComparisonId) || comparisons[0];

  const counters = [
    {
      num: '523,000,000+',
      label: 'Main Channel Subscribers',
      sub: '#1 Channel on Earth (Crossed 500M on June 12, 2026)',
      accent: 'text-[#00E5FF]',
    },
    {
      num: '144.2B+',
      label: 'Main Channel Views',
      sub: '177B+ Across Combined Network Channels',
      accent: 'text-white',
    },
    {
      num: '141,200,000',
      label: 'Average Views Per Upload',
      sub: 'Exceeds Standard US Television Primetime 12x',
      accent: 'text-[#FF1E66]',
    },
    {
      num: '$5,000,000,000',
      label: 'Beast Industries Valuation',
      sub: 'Series C Round ($300M Alpha Wave / $200M Bitmine)',
      accent: 'text-[#00F076]',
    },
    {
      num: '44',
      label: 'Guinness World Records Broken',
      sub: 'Adjudicated on Amazon Prime Video Beast Games',
      accent: 'text-[#00E5FF]',
    },
    {
      num: '34,000,000+ LBS',
      label: 'Ocean Waste Cleared (#TeamSeas)',
      sub: 'Plus 25,000,000+ Trees Planted (#TeamTrees)',
      accent: 'text-[#00F076]',
    },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSimulatedSubs(val);
    playClick?.();
  };

  return (
    <section
      id="telemetry"
      className="relative py-28 sm:py-36 bg-[#06080C] border-b border-white/10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1E66]" />
              <span>VERIFIED TELEMETRY DECK</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight uppercase text-white">
              BY THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF1E66]">
                NUMBERS.
              </span>
            </h2>
          </div>

          <button
            onClick={() => {
              playClick?.();
              onOpenSources();
            }}
            className="luxury-pill px-6 py-3 bg-white/5 border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Database className="w-4 h-4 text-[#00E5FF]" />
            <span>AUDIT SOURCES [OCT 2026]</span>
          </button>
        </div>

        {/* 6 Luxury Glass Stat Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counters.map((c, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <span className="text-xs font-mono text-slate-400 font-semibold uppercase">
                  VERIFIED METRIC #{idx + 1}
                </span>

                <div
                  className={`font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-3 tabular-nums ${c.accent}`}
                >
                  {c.num}
                </div>

                <div className="font-display font-bold text-xl text-white uppercase tracking-tight mt-3">
                  {c.label}
                </div>

                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {c.sub}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                OCTOBER 2026 AUDITED
              </div>
            </div>
          ))}
        </div>

        {/* The Attention Reactor Subscriber Accelerator */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#00E5FF]/10 via-black to-[#FF1E66]/10 border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/20 text-xs font-bold text-[#00E5FF] uppercase font-mono">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE ATTENTION REACTOR</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-2">
                DRAG TO ACCELERATE AUDIENCE SCALE.
              </h3>
              <p className="mt-1 text-slate-300 text-sm">
                Slide through 14 years of exponential growth from Greenville bedroom to global streaming records.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono uppercase">Simulated Subscribers</span>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#00E5FF] tabular-nums">
                {simulatedSubs}M
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <input
              type="range"
              min="1"
              max="523"
              value={simulatedSubs}
              onChange={handleSliderChange}
              className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00E5FF]"
            />
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>1 SUBS (2012)</span>
              <span>100K (2017)</span>
              <span>100M (2022)</span>
              <span>300M (2024)</span>
              <span className="text-[#00E5FF] font-bold">523M PEAK (2026)</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-white font-medium">
              <Flame className="w-4 h-4 text-[#FF1E66]" />
              <span>
                {simulatedSubs < 50
                  ? 'Phase 1: The Greenville Bedroom Let\'s Play Era'
                  : simulatedSubs < 200
                  ? 'Phase 2: Viral Philanthropy & Real-Life Squid Game'
                  : simulatedSubs < 450
                  ? 'Phase 3: The World #1 Channel Overtaking T-Series'
                  : 'Phase 4: Half a Billion Humans on Earth Connected'}
              </span>
            </div>
            {simulatedSubs === 523 && (
              <span className="text-[#00F076] font-bold">ALL-TIME WORLD RECORD</span>
            )}
          </div>
        </div>

        {/* Physical Scale Comparator */}
        <div className="mt-14 glass-panel p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00E5FF] uppercase tracking-wider font-mono">
                <Scale className="w-4 h-4 text-[#FF1E66]" />
                <span>PHYSICAL SCALE BENCHMARK</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
                COMPREHENDING IMPOSSIBLE NUMBERS.
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {comparisons.map((comp) => {
                const isSelected = selectedComparisonId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      playClick?.();
                      setSelectedComparisonId(comp.id);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#06080C] shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {comp.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm font-bold font-mono">
              <span className="text-[#00E5FF] uppercase">
                {currentComparison.comparisonLabel}
              </span>
              <span className="text-[#FF1E66]">
                RATIO: {currentComparison.ratio}x BENCHMARK
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">MRBEAST METRIC:</span>
                  <span className="text-[#00E5FF] font-bold">{currentComparison.mrbeastStat}</span>
                </div>
                <div className="h-4 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00E5FF] via-white to-[#FF1E66] rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-400">BENCHMARK COMPARISON:</span>
                  <span className="text-slate-400">{currentComparison.benchmarkStat}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-slate-500 rounded-full transition-all duration-500"
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

            <p className="pt-4 border-t border-white/10 text-slate-300 text-sm leading-relaxed">
              {currentComparison.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
