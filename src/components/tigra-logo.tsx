import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * A refined, text-only logo for TigraFINO.
 * Uses the "Playfair Display" font for a premium, luxury feel.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    {
      "scale-75": size === "small",
      "scale-100": size === "medium",
      "scale-125": size === "large",
    },
    className
  );

  return (
    <div className={containerClasses}>
      <div className="flex items-baseline font-headline tracking-tight">
        <span className="text-primary text-4xl font-bold italic">Tigra</span>
        <span className="text-primary text-4xl font-black uppercase">FINO</span>
      </div>
      <div className="h-0.5 w-full bg-primary/30 mt-1"></div>
    </div>
  );
}
