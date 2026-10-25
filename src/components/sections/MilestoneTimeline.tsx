import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Calendar, ExternalLink } from 'lucide-react';
import { MRBEAST_DATA, Milestone } from '@/data/mrbeastData';

interface MilestoneTimelineProps {
  playClick?: () => void;
  playMilestone?: () => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  playClick,
  playMilestone,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const milestones = MRBEAST_DATA.milestones;

  const updateScrollButtons = () => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollTrackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scrollByCard = (direction: 'left' | 'right') => {
    playClick?.();
    if (!scrollTrackRef.current) return;
    const cardWidth = 380;
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
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-obsidian border-b border-border-hairline overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mb-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-beast-gold tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-beast-gold" />
              <span>LVL 02 // CHRONOLOGICAL FLIGHT RECORDER</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] uppercase tracking-tight text-text-primary">
              2012 TO 2026: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-beast-gold via-beast-cyan to-beast-gold">
                THE 500M TIMELINE.
              </span>
            </h2>
          </div>

          {/* Filmstrip Controls */}
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-text-muted hidden sm:block">
              MILESTONE {String(activeIndex + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                className="p-3 border border-border-hairline bg-vault hover:border-beast-gold text-text-muted hover:text-beast-gold disabled:opacity-30 disabled:hover:border-border-hairline transition-all cursor-pointer"
                aria-label="Scroll timeline backwards"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                className="p-3 border border-border-hairline bg-vault hover:border-beast-gold text-text-muted hover:text-beast-gold disabled:opacity-30 disabled:hover:border-border-hairline transition-all cursor-pointer"
                aria-label="Scroll timeline forward"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Quick-Jump Year Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => jumpToIndex(idx)}
              className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                activeIndex === idx
                  ? 'bg-beast-gold text-obsidian font-bold border-beast-gold'
                  : 'bg-vault/80 text-text-muted hover:text-text-primary border-border-hairline hover:border-text-muted'
              }`}
            >
              <span>{m.year}</span>
              <span className="text-[10px] ml-1 opacity-70">#{String(idx + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Filmstrip Telemetry Track */}
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
              className={`w-[320px] sm:w-[380px] flex-shrink-0 vault-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isCurrent
                  ? 'border-beast-gold bg-vault shadow-[0_0_35px_rgba(255,208,0,0.12)] -translate-y-1'
                  : 'border-border-hairline hover:border-beast-cyan/50 bg-vault/70'
              }`}
            >
              {/* Card Top Marker */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-hairline font-mono text-xs">
                  <span className="text-beast-gold font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {m.exactDate}
                  </span>
                  <span className="px-2 py-0.5 bg-obsidian border border-border-hairline text-[10px] text-text-muted">
                    {m.category}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-beast-cyan uppercase tracking-widest font-semibold">
                    {m.subtitle}
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary uppercase tracking-tight mt-1">
                    {m.title}
                  </h3>
                </div>

                <p className="mt-3 text-text-muted text-xs sm:text-sm leading-relaxed">
                  {m.description}
                </p>
              </div>

              {/* Card Bottom Verified Telemetry Badge */}
              <div className="mt-6 pt-4 border-t border-border-hairline space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-obsidian border border-beast-gold/40 font-mono text-[11px] font-bold text-beast-gold">
                    {m.metricBadge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                    <Award className="w-3 h-3 text-beast-cyan" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-text-muted/60 truncate flex items-center justify-between">
                  <span>SRC: {m.source}</span>
                  <span>{m.asOfDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
