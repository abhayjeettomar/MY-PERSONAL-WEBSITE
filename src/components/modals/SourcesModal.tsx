import React, { useEffect } from 'react';
import { X, ShieldCheck, Database, FileCode, CheckCircle2 } from 'lucide-react';
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
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-obsidian/90 backdrop-blur-xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-vault border border-border-hairline shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-hairline bg-obsidian/60">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-beast-gold" />
            <div>
              <h2 id="sources-title" className="font-mono text-sm font-bold text-text-primary tracking-wider uppercase">
                TELEMETRY SOURCES &amp; VERIFICATION LOG
              </h2>
              <div className="font-mono text-[10px] text-beast-cyan">
                AS OF {MRBEAST_DATA.meta.dataAsOf.toUpperCase()} // STATUS: VERIFIED
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-border-hairline transition-colors cursor-pointer"
            aria-label="Close sources dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Architecture Explainer Banner */}
        <div className="p-4 bg-obsidian/40 border-b border-border-hairline flex items-start gap-3">
          <FileCode className="w-5 h-5 text-beast-cyan flex-shrink-0 mt-0.5" />
          <div className="text-xs text-text-muted leading-relaxed font-mono">
            <span className="text-text-primary font-semibold">CENTRALIZED SOURCE OF TRUTH:</span> All statistical
            metrics, subscriber milestones, valuations, and humanitarian figures are mapped to{' '}
            <code className="text-beast-cyan bg-obsidian px-1 py-0.5 border border-border-hairline">
              src/data/mrbeastData.ts
            </code>
            . Any metric can be updated in this single location to re-render the entire platform synchronously.
          </div>
        </div>

        {/* Sources List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {MRBEAST_DATA.sourcesDirectory.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-obsidian/60 border border-border-hairline hover:border-beast-cyan/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-beast-emerald flex-shrink-0" />
                  <span className="font-mono text-xs font-bold text-text-primary">
                    {item.metric}
                  </span>
                </div>
                <div className="text-xs text-text-muted pl-5">
                  {item.verificationNote}
                </div>
              </div>

              <div className="sm:text-right pl-5 sm:pl-0 flex-shrink-0">
                <div className="font-mono text-[10px] text-beast-gold uppercase font-semibold">
                  {item.source}
                </div>
                <div className="font-mono text-[9px] text-text-muted/70">
                  VERIFIED: {item.asOf}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Disclaimer Bar */}
        <div className="p-4 bg-obsidian border-t border-border-hairline flex items-center justify-between font-mono text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-beast-cyan" />
            <span>UNOFFICIAL EDITORIAL &amp; DESIGN TRIBUTE ARCHIVE</span>
          </div>
          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="px-3 py-1 bg-vault border border-border-hairline hover:border-beast-gold text-text-primary hover:text-beast-gold transition-colors uppercase cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
