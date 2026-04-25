import { cn } from "@/lib/utils";

type TohfaLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export function TohfaLogo({ size = "small", className }: TohfaLogoProps) {
  const textClasses = cn(
    "font-headline font-bold tracking-wider text-transparent",
    "text-tohfa",
    size === "small" && "text-4xl md:text-5xl",
    size === "medium" && "text-7xl md:text-8xl",
    size === "large" && "text-8xl md:text-9xl lg:text-[10rem]"
  );

  return (
    <h1 className={cn(textClasses, className)}>
      TOHFAFINO
    </h1>
  );
}
