import React, { useState } from 'react';
import { Building2, ShoppingBag, Radio, History, Sparkles, DollarSign, ArrowRight } from 'lucide-react';
import { MRBEAST_DATA, BusinessEntity } from '@/data/mrbeastData';

interface EmpireEcosystemProps {
  playClick?: () => void;
}

export const EmpireEcosystem: React.FC<EmpireEcosystemProps> = ({
  playClick,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('holding');

  const entities = MRBEAST_DATA.businessEcosystem;
  const currentEntity = entities.find((e) => e.id === activeTabId) || entities[0];

  const getEntityIcon = (id: string) => {
    switch (id) {
      case 'holding':
        return <Building2 className="w-5 h-5 text-[#FFD000]" />;
      case 'feastables':
        return <ShoppingBag className="w-5 h-5 text-[#00F5FF]" />;
      case 'network':
        return <Radio className="w-5 h-5 text-[#FF1E66]" />;
      case 'ventures-history':
      default:
        return <History className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section
      id="empire"
      className="relative py-28 sm:py-36 bg-[#050608] border-b border-white/10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD000]/10 border border-[#FFD000]/20 text-xs font-bold text-[#FFD000] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE $5 BILLION BUSINESS EMPIRE</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight uppercase text-white">
              BEAST <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD000] via-[#00F5FF] to-[#00F076]">
                INDUSTRIES.
              </span>
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FFD000] to-[#FF9900] flex items-center justify-center text-[#07080C] shadow-lg">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">ESTIMATED NET WORTH (OCT 2026)</span>
              <div className="font-display font-black text-xl text-white">$2,600,000,000 (~51% STAKE)</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {entities.map((entity: BusinessEntity) => {
            const isSelected = activeTabId === entity.id;
            return (
              <button
                key={entity.id}
                onClick={() => {
                  playClick?.();
                  setActiveTabId(entity.id);
                }}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-[#00F5FF]/60 shadow-[0_10px_30px_rgba(0,245,255,0.15)] -translate-y-1'
                    : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {getEntityIcon(entity.id)}
                    <span className="font-display font-bold text-sm text-white uppercase">
                      {entity.name}
                    </span>
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />}
                </div>

                <div className="mt-4 font-display font-extrabold text-lg text-[#FFD000]">
                  {entity.valuationOrRevenue}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Entity Showcase Card */}
        <div className="mt-8 glass-card p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-[#00F5FF] uppercase tracking-wider">
                CORPORATE ENTITY PROFILE
              </span>

              <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                {currentEntity.name}
              </h3>

              <div className="text-lg font-semibold text-[#FFD000]">
                {currentEntity.tagline}
              </div>

              <p className="text-slate-300 text-base leading-relaxed pt-2">
                {currentEntity.description}
              </p>

              <div className="pt-4 text-xs font-mono text-slate-400">
                SOURCE: {currentEntity.source} // VERIFIED {currentEntity.asOfDate}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentEntity.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
                >
                  <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                  <div className="font-display font-black text-lg sm:text-xl text-white mt-2 break-words">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Infinite Reinvestment Engine Diagram */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent border border-white/10">
          <div className="pb-6 border-b border-white/10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#00F5FF] uppercase tracking-wider">
                THE CAPITAL ENGINE
              </span>
              <h4 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight mt-1">
                INFINITE REINVESTMENT ARCHITECTURE.
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              ZERO DIVIDENDS // 100% COMMITTED TO SCALE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">1. LIQUID CAPITAL</span>
              <h5 className="font-display font-bold text-xl text-white">CPG &amp; FEASTABLES</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                $250M+ revenue generated across 30,000+ retail doors funds multi-million dollar cash reserves.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#00F5FF]/10 to-transparent border border-[#00F5FF]/40 space-y-2 relative">
              <span className="text-xs font-mono text-[#00F5FF] uppercase font-bold">2. CONVERSION ENGINE</span>
              <h5 className="font-display font-bold text-xl text-white">100% SOUNDSTAGE BUDGET</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                No personal shareholder payouts. All cash is routed directly into soundstages, sets, and prizes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-[#FF1E66] uppercase font-bold">3. ATTENTION LOCK</span>
              <h5 className="font-display font-bold text-xl text-white">523M+ AUDIENCE FLYWHEEL</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unprecedented production scale locks in global retention, powering the next brand launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
