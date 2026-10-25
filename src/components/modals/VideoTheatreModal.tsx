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
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-[#06080C] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              OFFICIAL BROADCAST // {video.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#00E5FF] transition-colors"
            >
              <span>OPEN ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                playClick?.();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
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
        <div className="p-6 overflow-y-auto bg-black/50 border-t border-white/10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="max-w-2xl">
              <h2 id="theatre-title" className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {video.title}
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                {video.editorialNote}
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[280px]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#00E5FF] text-[11px] font-bold uppercase font-mono">
                  <Film className="w-3.5 h-3.5" />
                  <span>VIEWS</span>
                </div>
                <div className="font-display font-black text-sm text-white mt-1">
                  {video.views}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#FF1E66] text-[11px] font-bold uppercase font-mono">
                  <Award className="w-3.5 h-3.5" />
                  <span>BUDGET</span>
                </div>
                <div className="font-display font-black text-xs text-white mt-1 truncate">
                  {video.budgetOrStakes}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[#00F076] text-[11px] font-bold uppercase font-mono">
                  <Users className="w-3.5 h-3.5" />
                  <span>SCALE</span>
                </div>
                <div className="font-display font-black text-xs text-white mt-1 truncate">
                  {video.contestantsOrParticipants}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00F076]" />
              <span>VERIFIED OCT 2026 // {video.source}</span>
            </div>
            <div className="font-mono text-slate-500">
              {video.schematicTag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
