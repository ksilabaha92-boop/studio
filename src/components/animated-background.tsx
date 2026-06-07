'use client';

/**
 * AnimatedBackground Component
 * Provides a dynamic, moving background with orange bursts/bubbles.
 * The animation speed and visibility are optimized for a premium feel.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none bg-black">
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble" style={{ width: '800px', height: '800px', top: '10%', left: '30%', animationDuration: '25s' }}></div>
    </div>
  );
}
