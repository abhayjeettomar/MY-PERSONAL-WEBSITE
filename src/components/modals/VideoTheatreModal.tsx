import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Film, Award, Users } from 'lucide-react';
import { VideoDossier } from '@/data/mrbeastData';

interface VideoTheatreModalProps {
  video: VideoDossier | null;
  onClose: () => void;
  playClick?: () => void;
}

export const VideoTheatreModal: React.FC<VideoTheatreModalProps> = ({
  video,
  onClose,
  playClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theatre-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-obsidian/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-vault border border-border-hairline shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border-hairline bg-obsidian/60">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-beast-magenta animate-ping" />
            <span className="font-mono text-xs font-bold text-beast-cyan tracking-wider uppercase">
              OFFICIAL BROADCAST STREAM // {video.category}
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-text-muted">
              YT_ID: {video.youtubeId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-beast-gold transition-colors"
            >
              <span>OPEN ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                playClick?.();
                onClose();
              }}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-border-hairline transition-colors cursor-pointer"
              aria-label="Close theatre modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player 16:9 Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Production Telemetry Log Footer */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-obsidian/40 border-t border-border-hairline">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h2 id="theatre-title" className="font-display font-extrabold text-xl sm:text-2xl text-text-primary uppercase tracking-tight">
                {video.title}
              </h2>
              <p className="mt-2 text-text-muted text-sm sm:text-base leading-relaxed">
                {video.editorialNote}
              </p>
            </div>

            {/* Telemetry Badges Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 min-w-[280px]">
              <div className="p-2.5 bg-vault border border-border-hairline">
                <div className="flex items-center gap-1.5 text-beast-gold font-mono text-[10px] uppercase">
                  <Film className="w-3 h-3" />
                  <span>VIEWS (OCT 2026)</span>
                </div>
                <div className="font-mono font-bold text-sm text-text-primary mt-1">
                  {video.views}
                </div>
              </div>

              <div className="p-2.5 bg-vault border border-border-hairline">
                <div className="flex items-center gap-1.5 text-beast-cyan font-mono text-[10px] uppercase">
                  <Award className="w-3 h-3" />
                  <span>BUDGET / STAKES</span>
                </div>
                <div className="font-mono font-bold text-xs text-text-primary mt-1 truncate">
                  {video.budgetOrStakes}
                </div>
              </div>

              <div className="p-2.5 bg-vault border border-border-hairline col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-beast-magenta font-mono text-[10px] uppercase">
                  <Users className="w-3 h-3" />
                  <span>SCALE</span>
                </div>
                <div className="font-mono font-bold text-xs text-text-primary mt-1 truncate">
                  {video.contestantsOrParticipants}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-hairline flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-beast-cyan" />
              <span>VERIFIED AS OF: {video.asOfDate}</span>
              <span className="opacity-40">|</span>
              <span>SOURCE: {video.source}</span>
            </div>
            <div className="text-[10px] text-text-muted/60">
              {video.schematicTag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
