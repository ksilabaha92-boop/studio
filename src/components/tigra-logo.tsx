import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * TORA Logo
 * Optimized for high-end luxury branding.
 * Uniform height for all letters, Serif font, Ink Stamp effect.
 * Size "Medium" is boosted for the Header.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const sizeClasses = cn(
    {
      "h-5 md:h-6": size === "small",   // Footer: Small & Elegant
      "h-20 md:h-24": size === "medium", // Header: Large & Powerful as requested
      "h-40 md:h-56": size === "large",  // Splash screen: Iconic
    },
    "w-auto",
    className
  );

  return (
    <div className={cn(sizeClasses, "relative flex items-center justify-center transition-all duration-500")}>
      <svg
        className="h-full w-full"
        viewBox="0 0 450 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="luxury-ink-stamp" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.4" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -8"
              result="sharpened"
            />
            <feComposite in="SourceGraphic" in2="sharpened" operator="atop" />
          </filter>
        </defs>
        <text
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          fontFamily='"Playfair Display", serif'
          fontWeight="900"
          fontSize="72"
          fill="currentColor"
          filter="url(#luxury-ink-stamp)"
          style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          TORA
        </text>
      </svg>
    </div>
  );
}
