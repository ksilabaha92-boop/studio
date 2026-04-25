import { cn } from "@/lib/utils";
import { Coffee } from 'lucide-react';

type TohfaLogoProps = {
  size?: "small" | "large";
  className?: string;
};

export function TohfaLogo({ size = "small", className }: TohfaLogoProps) {
  const textClasses = cn(
    "font-headline font-bold text-primary tracking-wider",
    size === "small" && "text-4xl md:text-5xl",
    size === "large" && "text-8xl md:text-9xl lg:text-[10rem]"
  );

  return (
    <h1 className={cn(textClasses, className)}>
        TOHFAFIN
        <span className="relative">
            O
            <Coffee className={cn(
                "absolute text-muted-foreground",
                size === 'small' && "w-6 h-6 left-1/2 -translate-x-1/2 -top-5",
                size === 'large' && "w-16 h-16 lg:w-20 lg:h-20 left-1/2 -translate-x-1/2 -top-16 lg:-top-20"
            )} strokeWidth={1.5} />
        </span>
    </h1>
  );
}
