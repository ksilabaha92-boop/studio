import { cn } from "@/lib/utils";

type TohfaLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

// This SVG has been completely redesigned to be a faithful recreation of the user's image.
// It uses a <text> element with the "Playfair Display" font (already in the project)
// to capture the correct serif style. It also applies an SVG filter to create the
// "coarse" and "rough" texture the user requested, making it look like a realistic ink stamp.
export function TohfaLogo({ size = "small", className }: TohfaLogoProps) {
  const sizeClasses = cn(
    {
      "h-8 md:h-10 w-auto": size === "small", // For header
      "h-20 md:h-24 w-auto": size === "medium", // For splash screen
      "h-28 md:h-32 w-auto": size === "large", // For larger displays if needed
    },
    className
  );

  return (
    <div className={cn(sizeClasses, "relative")}>
      <svg
        className="h-full w-full"
        viewBox="0 0 420 60" // Adjusted viewBox for text length
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 
            This filter creates a subtle, rough, ink-stamped effect.
            1. feGaussianBlur slightly blurs the text.
            2. feColorMatrix dramatically increases the alpha channel contrast,
               which makes the blurred edges sharp and irregular, mimicking ink bleed.
            3. feComposite is used to mask the effect to the original text shape.
          */}
          <filter id="ink-stamp-effect" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.4" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 19 -7"
              result="sharpened"
            />
             <feComposite in="SourceGraphic" in2="sharpened" operator="atop" />
          </filter>
        </defs>
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fontFamily='"Playfair Display", serif'
          fontWeight="700"
          fontSize="52"
          fill="hsl(var(--primary))"
          filter="url(#ink-stamp-effect)"
          style={{ letterSpacing: '0.02em' }}
        >
          TOHFAFINO
        </text>
      </svg>
    </div>
  );
}
