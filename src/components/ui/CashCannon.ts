import confetti from 'canvas-confetti';

export function fireCashCannon(origin?: { x: number; y: number }) {
  const count = 120;
  const defaults = {
    origin: origin || { y: 0.7, x: 0.5 },
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Golden coins, dollar bill emeralds, electric cyan, and diamond white
  const colors = ['#FFD700', '#00F5FF', '#00F076', '#FFFFFF', '#FFB700'];

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors,
    shapes: ['square'],
    scalar: 1.2,
  });

  fire(0.2, {
    spread: 60,
    colors,
    shapes: ['circle'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.4,
    colors,
    shapes: ['square'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors,
    shapes: ['circle'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors,
  });
}

// Multi-stage fireworks cannon for major milestones
export function fireMegaJackpot() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#00F5FF', '#00F076'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FF1E66', '#FFFFFF'],
    });
  }, 250);

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
