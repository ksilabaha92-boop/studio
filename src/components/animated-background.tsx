'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="animated-bubble" style={{ width: '300px', height: '300px', top: '10%', left: '10%' }}></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
      <div className="animated-bubble"></div>
    </div>
  );
}
