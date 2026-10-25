import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Calendar } from 'lucide-react';
import { MRBEAST_DATA, Milestone } from '@/data/mrbeastData';

interface MilestoneTimelineProps {
  playClick?: () => void;
  playMilestone?: () => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  playClick,
  playMilestone,
}) => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones = MRBEAST_DATA.milestones;

  const scrollByCard = (direction: 'left' | 'right') => {
    playClick?.();
    if (!scrollTrackRef.current) return;
    const cardWidth = 420;
    const targetScroll =
      direction === 'left'
        ? scrollTrackRef.current.scrollLeft - cardWidth
        : scrollTrackRef.current.scrollLeft + cardWidth;
    scrollTrackRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const jumpToIndex = (idx: number) => {
    playMilestone?.();
    setActiveIndex(idx);
    if (!scrollTrackRef.current) return;
    const cards = scrollTrackRef.current.children;
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  return (
    <section
      id="timeline"
      className="relative py-28 sm:py-36 bg-[#06080C] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1E66]" />
              <span>THE 500,000,000 FLIGHT RECORDER (2012–2026)</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tight uppercase text-white">
              DECADE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF1E66]">
                DISRUPTION.
              </span>
            </h2>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              {String(activeIndex + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByCard('left')}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Previous milestone"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByCard('right')}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Next milestone"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Year Pills Navigation */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => jumpToIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                activeIndex === idx
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#06080C] shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{m.year}</span>
              <span className="text-[10px] ml-1.5 opacity-70">#{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Draggable Card Track */}
      <div
        ref={scrollTrackRef}
        data-cursor="drag"
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 py-6 cursor-grab active:cursor-grabbing select-none scrollbar-none"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {milestones.map((m: Milestone, idx: number) => {
          const isCurrent = activeIndex === idx;
          return (
            <div
              key={m.id}
              onClick={() => {
                setActiveIndex(idx);
                playMilestone?.();
              }}
              style={{ scrollSnapAlign: 'start' }}
              className={`w-[340px] sm:w-[420px] flex-shrink-0 glass-panel p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isCurrent
                  ? 'border-[#00E5FF]/60 bg-white/[0.08] shadow-[0_20px_60px_rgba(0,229,255,0.15)] -translate-y-2'
                  : 'hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                  <span className="text-[#00E5FF] font-bold flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#FF1E66]" />
                    {m.exactDate}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold text-[10px]">
                    {m.category}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="text-xs font-mono text-[#FF1E66] uppercase font-bold">
                    {m.subtitle}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                    {m.title}
                  </h3>
                </div>

                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-[#00E5FF]/30 font-mono text-xs font-bold text-[#00E5FF]">
                  {m.metricBadge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {m.asOfDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
