import React, { useEffect } from 'react';
import { X, Database, FileCode, CheckCircle2 } from 'lucide-react';
import { MRBEAST_DATA } from '@/data/mrbeastData';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClick?: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  playClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sources-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#06080C] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#00B4D8] flex items-center justify-center text-[#06080C] shadow-md">
              <Database className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 id="sources-title" className="font-display font-black text-lg text-white uppercase tracking-tight">
                VERIFIED TELEMETRY SOURCES
              </h2>
              <div className="text-xs text-[#00E5FF] font-semibold font-mono">
                AS OF {MRBEAST_DATA.meta.dataAsOf.toUpperCase()} // STATUS: VERIFIED
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Central Architecture Explainer Banner */}
        <div className="p-5 bg-white/[0.03] border-b border-white/10 flex items-start gap-3">
          <FileCode className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed font-mono">
            <strong className="text-white">CENTRALIZED ARCHITECTURE:</strong> Every single metric, milestone, and business valuation is centrally indexed in{' '}
            <code className="text-[#00E5FF] bg-black/60 px-1.5 py-0.5 rounded border border-white/10 font-mono">
              src/data/mrbeastData.ts
            </code>
            . Modifying any number in that file updates all counters and visualizations synchronously across the application.
          </div>
        </div>

        {/* Sources List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {MRBEAST_DATA.sourcesDirectory.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F076] flex-shrink-0" />
                  <span className="font-display font-bold text-sm text-white">
                    {item.metric}
                  </span>
                </div>
                <div className="text-xs text-slate-400 pl-6">
                  {item.verificationNote}
                </div>
              </div>

              <div className="sm:text-right pl-6 sm:pl-0">
                <span className="text-xs font-mono font-bold text-[#00E5FF] block">
                  {item.source}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  AS OF {item.asOf}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
