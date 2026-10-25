import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, FastForward } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  playTick?: () => void;
  playBreach?: () => void;
  playMilestone?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  playTick,
  playBreach,
  playMilestone,
}) => {
  const [count, setCount] = useState(1);
  const [subText, setSubText] = useState('THE 500,000,000 MILESTONE');
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const counterObjRef = useRef({ val: 1 });

  const completeSequence = () => {
    if (isDone) return;
    setIsDone(true);
    playBreach?.();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(numberRef.current, {
      scale: 1.25,
      opacity: 0,
      filter: 'blur(30px)',
      duration: 0.8,
      ease: 'power3.inOut',
    }).to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.4'
    );
  };

  useEffect(() => {
    const seen = sessionStorage.getItem('mrbeast_intro_seen');
    if (seen === 'true') {
      onComplete();
      return;
    }

    const counterAnim = gsap.to(counterObjRef.current, {
      val: 500000000,
      duration: 2.1,
      ease: 'power3.inOut',
      onUpdate: () => {
        const current = Math.floor(counterObjRef.current.val);
        setCount(current);

        if (current < 100000) {
          setSubText('GREENVILLE, NC // 40-HOUR CHAIR EXPERIMENT (2017)');
        } else if (current < 10000000) {
          setSubText('#TEAMTREES // 20,000,000 SAPLINGS IN 56 DAYS');
        } else if (current < 100000000) {
          setSubText('$456,000 SQUID GAME SOUNDSTAGES (2021)');
        } else if (current < 300000000) {
          setSubText('THE #1 CHANNEL IN YOUTUBE HISTORY (2024)');
        } else {
          setSubText('FIRST CREATOR IN HISTORY TO 500 MILLION SUBSCRIBERS');
        }
      },
      onComplete: () => {
        playMilestone?.();
        sessionStorage.setItem('mrbeast_intro_seen', 'true');
        setTimeout(() => {
          completeSequence();
        }, 300);
      },
    });

    const soundInterval = setInterval(() => {
      playTick?.();
    }, 160);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        counterAnim.kill();
        clearInterval(soundInterval);
        completeSequence();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      counterAnim.kill();
      clearInterval(soundInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050608] select-none pointer-events-auto"
    >
      {/* Ambient background glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00F5FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FFD000]/10 blur-[130px] translate-y-32 pointer-events-none" />

      {/* Top Controls */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00F5FF] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-[#00F5FF] uppercase font-bold">
            MRBEAST ARCHIVE
          </span>
        </div>

        <button
          onClick={completeSequence}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all text-xs font-mono tracking-wider uppercase cursor-pointer"
        >
          <span>SKIP</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Cinematic Counter */}
      <div ref={numberRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#FFD000] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ATTENTION CURVE ACCELERATION</span>
        </div>

        <div className="font-display font-extrabold text-5xl sm:text-7xl md:text-9xl tracking-tighter text-white tabular-nums drop-shadow-[0_0_60px_rgba(0,245,255,0.3)]">
          {count.toLocaleString('en-US')}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-md">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
            <div
              className="h-full bg-gradient-to-r from-[#00F5FF] via-[#FFD000] to-[#FF1E66] transition-all duration-75 rounded-full"
              style={{ width: `${Math.min(100, (count / 500000000) * 100)}%` }}
            />
          </div>
          <p className="font-mono text-xs text-white/60 tracking-wider uppercase mt-1 h-5 text-center">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
};
