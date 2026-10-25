import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<'default' | 'video' | 'button' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="video"]')) {
        setCursorMode('video');
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorMode('drag');
      } else if (target.closest('button, a, input, select, [role="button"]')) {
        setCursorMode('button');
      } else {
        setCursorMode('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden hidden md:block">
      {/* Center Precision Glow Dot */}
      <div
        className="fixed w-2.5 h-2.5 rounded-full bg-[#00F5FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#00F5FF] transition-opacity duration-150"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          opacity: cursorMode === 'video' ? 0 : 1,
        }}
      />

      {/* Lagging Frosted Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200"
      >
        {cursorMode === 'default' && (
          <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 backdrop-blur-[2px]" />
        )}

        {cursorMode === 'button' && (
          <div className="w-12 h-12 rounded-full border border-[#00F5FF]/50 bg-[#00F5FF]/10 backdrop-blur-sm scale-110 shadow-[0_0_20px_rgba(0,245,255,0.2)]" />
        )}

        {cursorMode === 'video' && (
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFD000] to-[#FF9900] text-[#07080C] font-display font-black text-xs tracking-wider flex items-center justify-center shadow-[0_0_40px_rgba(255,208,0,0.6)] animate-pulse">
            PLAY ▶
          </div>
        )}

        {cursorMode === 'drag' && (
          <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] tracking-widest uppercase">
            DRAG ↔
          </div>
        )}
      </div>
    </div>
  );
};
