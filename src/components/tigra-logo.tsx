import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * A refined, text-only logo for TigraFINO.
 * Uses "Playfair Display" for a premium feel.
 * Ensures consistent height and baseline alignment.
 */
export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  return (
    <div className={cn(
      "flex items-center font-headline tracking-tighter select-none",
      {
        "gap-1": size === "small",
        "gap-2": size !== "small",
        "scale-90 md:scale-100": size === "small",
        "scale-110 md:scale-125": size === "medium",
        "scale-150 md:scale-[2]": size === "large",
      },
      className
    )}>
      <span className="text-primary text-3xl font-bold italic leading-none">
        Tigra
      </span>
      <span className="text-primary text-3xl font-black uppercase leading-none">
        FINO
      </span>
    </div>
  );
}
