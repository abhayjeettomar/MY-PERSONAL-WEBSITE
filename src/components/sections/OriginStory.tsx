import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Clock, Award, TrendingUp } from 'lucide-react';
import { MRBEAST_DATA } from '@/data/mrbeastData';

interface OriginStoryProps {
  playClick?: () => void;
}

export const OriginStory: React.FC<OriginStoryProps> = ({ playClick }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters = MRBEAST_DATA.originChapters;

  const getCurveProgress = (index: number) => {
    switch (index) {
      case 0:
        return { spike: 15, budget: '$0 / upload', label: '240p Bedroom Let\'s Plays (2012)' };
      case 1:
        return { spike: 35, budget: '$100 / upload', label: 'Daily Algorithm Mastermind (2016)' };
      case 2:
        return { spike: 75, budget: '$10,000 / upload', label: '40-Hour Chair Inflection (2017)' };
      case 3:
      default:
        return { spike: 100, budget: '$100,000,000 Season', label: 'Infinite Reinvestment Loop (2025)' };
    }
  };

  const currentCurve = getCurveProgress(activeChapterIndex);

  return (
    <section
      id="origin"
      className="relative py-28 sm:py-36 bg-[#050608] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-xs font-bold text-[#00F5FF] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN STORY (2012–2017)</span>
          </div>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight uppercase text-white">
            FIVE YEARS OF <br />
            <span className="text-slate-500">NOBODY WATCHING.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-lg leading-relaxed">
            Before breaking every global record on streaming television, Jimmy Donaldson spent half a decade posting into the void, reverse-engineering retention curves, and establishing the most aggressive reinvestment model in media.
          </p>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Left Interactive Visualizer (Cols 1-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glass-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-extrabold text-[#FFD000] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#FFD000]" />
                  RETENTION &amp; SCALE GRAPH
                </span>
                <span className="text-xs text-slate-400 font-mono">2012 &rarr; 2026</span>
              </div>

              {/* Dynamic Glowing SVG Curve */}
              <div className="h-52 w-full rounded-2xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>SCALE FACTOR</span>
                  <span className="text-[#00F5FF]">{currentCurve.label}</span>
                </div>

                <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00F5FF" />
                      <stop offset="70%" stopColor="#FFD000" />
                      <stop offset="100%" stopColor="#FF1E66" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                  <path
                    d={`M 10 100 Q 120 95, 170 85 T 220 ${100 - currentCurve.spike * 0.7} T 290 ${
                      110 - currentCurve.spike
                    }`}
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  <circle
                    cx="290"
                    cy={110 - currentCurve.spike}
                    r="6"
                    fill="#FFD000"
                    className="animate-ping"
                  />
                  <circle
                    cx="290"
                    cy={110 - currentCurve.spike}
                    r="4.5"
                    fill="#FFD000"
                  />
                </svg>

                <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                  <span>2012 (BEDROOM)</span>
                  <span>2017 (100K)</span>
                  <span className="text-[#FFD000] font-bold">2026 (523M)</span>
                </div>
              </div>

              {/* Dynamic Budget Metric */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 font-medium">PRODUCTION BUDGET SCALING</span>
                <div className="font-display font-extrabold text-2xl text-white mt-1">
                  {currentCurve.budget}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  100% of sponsorship income was recycled back into the next frame: bigger prizes, larger sets, and impossible stakes.
                </p>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playClick?.();
                      setActiveChapterIndex(idx);
                    }}
                    className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                      activeChapterIndex === idx
                        ? 'bg-[#FFD000] shadow-[0_0_12px_#FFD000]'
                        : 'bg-white/10 hover:bg-white/30'
                    }`}
                    aria-label={`Step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Narrative Cards (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            {chapters.map((chapter, idx) => {
              const isSelected = activeChapterIndex === idx;
              return (
                <div
                  key={chapter.step}
                  onMouseEnter={() => setActiveChapterIndex(idx)}
                  className={`glass-card p-6 sm:p-8 cursor-pointer relative ${
                    isSelected
                      ? 'border-[#00F5FF]/60 shadow-[0_10px_40px_rgba(0,245,255,0.15)] bg-white/[0.06]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#00F5FF]">
                          PHASE {chapter.step}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          // {chapter.year}
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                        {chapter.title}
                      </h3>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="mt-2 text-sm font-semibold text-[#FFD000]">
                    {chapter.subtitle}
                  </div>

                  <p className="mt-3 text-slate-300 text-base leading-relaxed">
                    {chapter.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">{chapter.metric}</span>
                    <span className="text-[#00F5FF] font-semibold">VERIFIED MILESTONE</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
