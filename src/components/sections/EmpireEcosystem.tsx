import React, { useState } from 'react';
import { Building2, ShoppingBag, Radio, History, ArrowRight, ShieldCheck, Check, DollarSign } from 'lucide-react';
import { MRBEAST_DATA, BusinessEntity } from '@/data/mrbeastData';

interface EmpireEcosystemProps {
  playClick?: () => void;
  playLaser?: () => void;
}

export const EmpireEcosystem: React.FC<EmpireEcosystemProps> = ({
  playClick,
  playLaser,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('holding');

  const entities = MRBEAST_DATA.businessEcosystem;
  const currentEntity = entities.find((e) => e.id === activeTabId) || entities[0];

  const getEntityIcon = (id: string) => {
    switch (id) {
      case 'holding':
        return <Building2 className="w-4 h-4 text-beast-gold" />;
      case 'feastables':
        return <ShoppingBag className="w-4 h-4 text-beast-cyan" />;
      case 'network':
        return <Radio className="w-4 h-4 text-beast-magenta" />;
      case 'ventures-history':
      default:
        return <History className="w-4 h-4 text-text-muted" />;
    }
  };

  return (
    <section
      id="empire"
      className="relative py-24 sm:py-32 bg-obsidian border-b border-border-hairline"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-beast-gold tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-beast-gold" />
              <span>LVL 04 // BEAST INDUSTRIES CORPORATE DECK</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] uppercase tracking-tight text-text-primary">
              THE $5 BILLION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-beast-gold via-beast-cyan to-beast-gold">
                CONSUMER ECOSYSTEM.
              </span>
            </h2>
          </div>

          <div className="p-3.5 bg-vault border border-border-hairline flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-beast-gold" />
            <div>
              <div className="font-mono text-[10px] text-text-muted uppercase">ESTIMATED NET WORTH (OCT 2026)</div>
              <div className="font-mono font-bold text-base text-beast-gold">$2,600,000,000 (~51% HOLDING)</div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {entities.map((entity: BusinessEntity) => {
            const isSelected = activeTabId === entity.id;
            return (
              <button
                key={entity.id}
                onClick={() => {
                  playClick?.();
                  playLaser?.();
                  setActiveTabId(entity.id);
                }}
                className={`p-4 text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-beast-gold bg-vault shadow-[0_0_20px_rgba(255,208,0,0.1)]'
                    : 'border-border-hairline bg-vault/50 hover:bg-vault/80 hover:border-text-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getEntityIcon(entity.id)}
                    <span className="font-mono text-xs font-bold text-text-primary uppercase">
                      {entity.name}
                    </span>
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 bg-beast-gold rounded-full" />}
                </div>

                <div className="mt-3 font-mono text-xs font-bold text-beast-gold tabular-nums">
                  {entity.valuationOrRevenue}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Entity Spatial Dossier (12 Columns) */}
        <div className="mt-8 p-6 sm:p-10 bg-vault border border-border-hairline crosshair-corner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative Lead (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-beast-cyan uppercase tracking-wider">
                <span className="w-2 h-2 bg-beast-cyan" />
                <span>ENTITY SPECIFICATION // {currentEntity.name.toUpperCase()}</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary uppercase tracking-tight">
                {currentEntity.name}
              </h3>

              <div className="text-beast-gold font-mono text-sm font-semibold">
                {currentEntity.tagline}
              </div>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed pt-2">
                {currentEntity.description}
              </p>

              {/* Verified Source Citation */}
              <div className="pt-4 flex items-center gap-2 font-mono text-xs text-text-muted">
                <ShieldCheck className="w-4 h-4 text-beast-cyan" />
                <span>SOURCE: {currentEntity.source}</span>
                <span className="text-text-muted/40">|</span>
                <span>VERIFIED: {currentEntity.asOfDate}</span>
              </div>
            </div>

            {/* Right Telemetry Metrics Grid (Cols 8-12) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentEntity.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-obsidian border border-border-hairline flex flex-col justify-between"
                >
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="font-mono font-bold text-sm sm:text-base text-beast-cyan mt-2 break-words">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Reinvestment Visualizer: CPG & Media Reinvestment Loop */}
        <div className="mt-12 p-6 sm:p-8 bg-obsidian border border-border-hairline">
          <div className="flex items-center justify-between pb-4 border-b border-border-hairline mb-6">
            <span className="font-mono text-xs font-bold text-beast-cyan uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-beast-cyan" />
              THE INFINITE REINVESTMENT ARCHITECTURE
            </span>
            <span className="font-mono text-[10px] text-text-muted hidden sm:inline">
              ZERO DIVIDENDS // 100% FREE CASH FLOW CONVERTED TO PRODUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 bg-vault border border-border-hairline">
              <div className="font-mono text-xs text-beast-gold uppercase font-bold">1. CONSUMER MONETIZATION</div>
              <div className="font-display font-extrabold text-xl text-text-primary mt-2">FEASTABLES &amp; AD REVENUE</div>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                $250M+ annual Feastables confection sales and brand deals generate substantial liquid capital.
              </p>
            </div>

            <div className="p-5 bg-vault border border-beast-cyan/50 relative">
              <div className="font-mono text-xs text-beast-cyan uppercase font-bold">2. CAPITAL CONVERTER</div>
              <div className="font-display font-extrabold text-xl text-text-primary mt-2">BEAST INDUSTRIES STUDIO</div>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                No private shareholder payouts. 100% of profit is routed into massive multi-million dollar soundstage sets.
              </p>
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-beast-cyan">
                →
              </div>
            </div>

            <div className="p-5 bg-vault border border-border-hairline">
              <div className="font-mono text-xs text-beast-magenta uppercase font-bold">3. ATTENTION COMPOUNDING</div>
              <div className="font-display font-extrabold text-xl text-text-primary mt-2">GLOBAL RETENTION LOCK</div>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                Unmatched spectacle drives 523M+ subscribers, reinforcing the distribution flywheel for the next business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
