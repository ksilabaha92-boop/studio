import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * TigraFINO Logo
 * A text-only logo with uniform height and size for all letters.
 * Optimized for the new slim header and premium aesthetic.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const sizeClasses = cn(
    {
      "h-6 md:h-7 w-auto": size === "small", // Tiny for footer
      "h-10 md:h-12 w-auto": size === "medium", // Perfect fit for the new slim header
      "h-32 md:h-40 w-auto": size === "large", // Prominent for splash screen
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
          <filter id="ink-stamp-refined" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.4" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
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
          fontSize="68"
          fill="currentColor"
          filter="url(#ink-stamp-refined)"
          style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          TIGRAFINO
        </text>
      </svg>
    </div>
  );
}
