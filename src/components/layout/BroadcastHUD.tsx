import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Database } from 'lucide-react';

interface BroadcastHUDProps {
  currentLevel: number;
  currentLevelName: string;
  scrollProgress: number; // 0 to 1
  sfxEnabled: boolean;
  onToggleSFX: () => void;
  onOpenSources: () => void;
  onNavigate: (sectionId: string) => void;
  playClick?: () => void;
}

const CHAPTERS = [
  { id: 'arena', label: 'Overview' },
  { id: 'origin', label: 'Origin' },
  { id: 'timeline', label: '500M' },
  { id: 'vault', label: 'Productions' },
  { id: 'empire', label: 'Empire' },
  { id: 'impact', label: 'Impact' },
  { id: 'telemetry', label: 'Data' },
];

export const BroadcastHUD: React.FC<BroadcastHUDProps> = ({
  currentLevelName,
  scrollProgress,
  sfxEnabled,
  onToggleSFX,
  onOpenSources,
  onNavigate,
  playClick,
}) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    playClick?.();
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
      {/* Top Floating Glass Navigation Island */}
      <header className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-[#06080C]/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.8)]'
              : 'bg-[#06080C]/50 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* MrBeast Official Panther Icon & Title */}
          <button
            onClick={() => {
              playClick?.();
              onNavigate('#arena');
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="Back to top"
          >
            {/* Custom SVG Official MrBeast Panther Silhouette with Lightning Strike */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#FF1E66] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#06080C] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#00E5FF]">
                  <polygon points="50,6 92,26 92,74 50,94 8,74 8,26" fill="none" stroke="#00E5FF" strokeWidth="6" />
                  <path d="M28,36 L50,66 L72,36 M50,66 L50,22" stroke="#FF1E66" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-extrabold text-xs tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
                MRBEAST
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                523M ARCHIVE
              </span>
            </div>
          </button>

          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Chapter Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {CHAPTERS.map((item) => {
              const isActive = currentLevelName.toLowerCase().includes(item.label.toLowerCase());
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClick?.();
                    onNavigate(`#${item.id}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#FF1E66]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="w-px h-5 bg-white/10" />

          {/* Action Icons */}
          <div className="flex items-center gap-1.5">
            {/* Sources Fact Sheet Button */}
            <button
              onClick={() => {
                playClick?.();
                onOpenSources();
              }}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Verified telemetry sources (As of Oct 2026)"
              aria-label="View sources"
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Apple-style Soft Audio Toggle */}
            <button
              onClick={() => {
                onToggleSFX();
                playClick?.();
              }}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={sfxEnabled ? 'Mute Audio' : 'Enable Audio'}
              aria-label="Toggle Sound"
            >
              {sfxEnabled ? <Volume2 className="w-4 h-4 text-[#00E5FF]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Toggle Color Theme"
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Top Precision Brand Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00E5FF] via-[#FF1E66] to-[#00E5FF] transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
        />
      </div>
    </>
  );
};
