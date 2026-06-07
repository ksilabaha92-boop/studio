import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * TigraFINO Logo
 * A high-end text logo that mimics a premium ink-stamp effect.
 * All letters are perfectly uniform in height and size (All Caps).
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const sizeClasses = cn(
    {
      "h-10 md:h-12 w-auto": size === "small",
      "h-20 md:h-24 w-auto": size === "medium",
      "h-32 md:h-40 w-auto": size === "large",
    },
    className
  );

  return (
    <div className={cn(sizeClasses, "relative flex items-center justify-center")}>
      <svg
        className="h-full w-full"
        viewBox="0 0 450 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 
            فلتر "ختم الحبر" ليعطي ملمساً طبيعياً وفخماً للحروف 
            يشبه الأسلوب الذي أعجبك في الصورة الأصلية.
          */}
          <filter id="ink-stamp" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.3" result="blurred" />
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
          fontSize="50"
          fill="hsl(var(--primary))"
          filter="url(#ink-stamp)"
          style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          TIGRAFINO
        </text>
      </svg>
    </div>
  );
}
