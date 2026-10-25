import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Sparkles, Coins, Database } from 'lucide-react';
import { fireCashCannon } from '@/components/ui/CashCannon';

interface BroadcastHUDProps {
  currentLevel: number;
  currentLevelName: string;
  scrollProgress: number; // 0 to 1
  scrollVelocity: number;
  sfxEnabled: boolean;
  onToggleSFX: () => void;
  onOpenSources: () => void;
  onNavigate: (sectionId: string) => void;
  playClick?: () => void;
  playCash?: () => void;
}

const NAV_ITEMS = [
  { id: 'arena', label: 'Arena' },
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
  playCash,
}) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

  const handleCashRain = () => {
    playCash?.();
    fireCashCannon();
  };

  return (
    <>
      {/* Top Floating Glass Island Bar */}
      <header className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B0E14]/85 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
              : 'bg-[#0B0E14]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Logo & Status Indicator */}
          <button
            onClick={() => {
              playClick?.();
              onNavigate('#arena');
            }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Back to Top"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F5FF] via-[#FFD000] to-[#FF1E66] p-[1.5px] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#07080C] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#00F5FF] group-hover:text-[#FFD000] transition-colors" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-extrabold text-xs tracking-tight text-white group-hover:text-[#00F5FF] transition-colors">
                MRBEAST
              </span>
              <span className="text-[10px] text-white/50 font-medium">523M ARCHIVE</span>
            </div>
          </button>

          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
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
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="w-px h-5 bg-white/10" />

          {/* Crazy Feature: "MAKE IT RAIN $100M" Button */}
          <button
            onClick={handleCashRain}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFD000] to-[#FFB700] text-[#07080C] font-bold text-xs shadow-[0_0_20px_rgba(255,208,0,0.4)] hover:shadow-[0_0_30px_rgba(255,208,0,0.7)] transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Make it rain $100,000,000 cash particles!"
          >
            <Coins className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CASH CANNON</span>
            <span className="sm:hidden">$100M</span>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5">
            {/* Sources Button */}
            <button
              onClick={() => {
                playClick?.();
                onOpenSources();
              }}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Verified sources (Oct 2026)"
              aria-label="View sources"
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSFX();
                playClick?.();
              }}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={sfxEnabled ? 'Mute Sounds' : 'Enable Sounds'}
              aria-label="Toggle Sound"
            >
              {sfxEnabled ? <Volume2 className="w-4 h-4 text-[#00F5FF]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sleek Minimal Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00F5FF] via-[#FFD000] to-[#FF1E66] transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
        />
      </div>
    </>
  );
};
