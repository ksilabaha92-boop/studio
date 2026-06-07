import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * A refined, text-only logo for TigraFINO.
 * Uses "Playfair Display" for a premium feel.
 * No underline, consistent baseline.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const containerClasses = cn(
    "flex items-baseline font-headline tracking-tight",
    {
      "scale-75": size === "small",
      "scale-100": size === "medium",
      "scale-125": size === "large",
    },
    className
  );

  return (
    <div className={containerClasses}>
      <span className="text-primary text-4xl font-bold italic">Tigra</span>
      <span className="text-primary text-4xl font-black uppercase ml-1">FINO</span>
    </div>
  );
}
