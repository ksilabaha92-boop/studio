import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * TigraFINO Logo
 * A text-only logo with uniform height and size for all letters.
 * Matches the premium "ink stamp" style requested.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const sizeClasses = cn(
    {
      "h-8 md:h-10 w-auto": size === "small", // Shrunk for Footer
      "h-20 md:h-24 w-auto": size === "medium", // Enlarged for Header
      "h-36 md:h-44 w-auto": size === "large", // Large for Splash
    },
    className
  );

  return (
    <div className={cn(sizeClasses, "relative flex items-center justify-center")}>
      <svg
        className="h-full w-full"
        viewBox="0 0 450 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ink-stamp" x="-5%" y="-5%" width="110%" height="110%">
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
          fontWeight="800"
          fontSize="65"
          fill="currentColor"
          filter="url(#ink-stamp)"
          style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          TIGRAFINO
        </text>
      </svg>
    </div>
  );
}
