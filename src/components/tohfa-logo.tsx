import { cn } from "@/lib/utils";

type TohfaLogoProps = {
  size?: "small" | "large";
  className?: string;
};

export function TohfaLogo({ size = "small", className }: TohfaLogoProps) {
  return (
    <h1
      className={cn(
        "font-headline font-bold text-transparent bg-clip-text text-tohfa",
        size === "small" && "text-4xl md:text-5xl",
        size === "large" && "text-8xl md:text-9xl lg:text-[12rem]",
        className
      )}
    >
      تحفة
    </h1>
  );
}
