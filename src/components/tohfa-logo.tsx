import { cn } from "@/lib/utils";

type TohfaLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

// This SVG is a vector representation of the "TOHFAFINO" logotype,
// created to match the user-provided image. The cup icon has been omitted as requested.
// The letterforms, especially the stylized 'A', are designed to replicate the source image.
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
        viewBox="0 0 740 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(1px 2px 2px rgb(0 0 0 / 0.15))" }}
      >
        <g fill="hsl(var(--primary))">
            {/* T */}
            <path d="M47.7 0H11.4V23.6H24.6V99.5H36.6V23.6H47.7V0Z" />
            {/* O */}
            <path fillRule="evenodd" clipRule="evenodd" d="M116.9 49.8c0 22.8-16.7 41.3-37.2 41.3s-37.2-18.5-37.2-41.3S62.2 8.5 82.7 8.5s34.2 18.5 34.2 41.3zM104.1 49.8c0 15.7-10.9 28.5-24.4 28.5s-24.4-12.8-24.4-28.5 10.9-28.5 24.4-28.5 24.4 12.8 24.4 28.5z" />
            {/* H */}
            <path d="M170.7 0h-12v41.7h-28V0h-12v99.5h12v-44.5h28v44.5h12V0z" />
            {/* F */}
            <path d="M224.7 0h-52v99.5h12v-38.1h27v-12.5h-27V23.6h38.2v-12h-38.2v-1.9h40.1V0z" />
            {/* A */}
            <path d="M278.1 99.5l-21.2-76.2h-11.6L224.1 99.5h12.2l4.9-14.4h18.6l5 14.4h13.3zm-32-48.2l7.2 23.3h-14.3l7.1-23.3z" />
            {/* F */}
            <path d="M340.7 0h-52v99.5h12v-38.1h27v-12.5h-27V23.6h38.2v-12h-38.2v-1.9h40.1V0z" />
            {/* I */}
            <path d="M355.7 23.6v75.9h12V23.6h-12zM367.7 0v13.7h-12V0h12z" />
            {/* N */}
            <path d="M434.7 99.5h-12l-40-58.8v58.8h-12V0h14l38.4 58.3V0h11.6v99.5z" />
            {/* O */}
            <path fillRule="evenodd" clipRule="evenodd" d="M508.9 49.8c0 22.8-16.7 41.3-37.2 41.3s-37.2-18.5-37.2-41.3 16.5-41.3 37.2-41.3 37.2 18.5 37.2 41.3zM496.1 49.8c0 15.7-10.9 28.5-24.4 28.5s-24.4-12.8-24.4-28.5 10.9-28.5 24.4-28.5 24.4 12.8 24.4 28.5z" />
            {/* Final O */}
            <path fillRule="evenodd" clipRule="evenodd" d="M580.9 49.8c0 22.8-16.7 41.3-37.2 41.3s-37.2-18.5-37.2-41.3 16.5-41.3 37.2-41.3 37.2 18.5 37.2 41.3zM568.1 49.8c0 15.7-10.9 28.5-24.4 28.5s-24.4-12.8-24.4-28.5 10.9-28.5 24.4-28.5 24.4 12.8 24.4 28.5z" />
        </g>
      </svg>
    </div>
  );
}
