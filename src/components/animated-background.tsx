'use client';

/**
 * AnimatedBackground Component
 * Implements the "Tiger Touch" with moving light stripes across the dark canvas.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none bg-black">
      {/* Moving Tiger Stripes (Dynamic Light Streaks) */}
      <div className="tiger-stripe" style={{ top: '0%' }}></div>
      <div className="tiger-stripe" style={{ top: '25%' }}></div>
      <div className="tiger-stripe" style={{ top: '50%' }}></div>
      <div className="tiger-stripe" style={{ top: '75%' }}></div>
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
