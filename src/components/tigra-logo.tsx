import { cn } from "@/lib/utils";

type TigraLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export function TigraLogo({ size = "small", className }: TigraLogoProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-2",
    {
      "scale-75": size === "small",
      "scale-100": size === "medium",
      "scale-125": size === "large",
    },
    className
  );

  return (
    <div className={containerClasses}>
      {/* Recreating the Tiger Head Logo from the Image */}
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M60 10C50 10 40 15 35 25L30 35C25 45 20 60 20 75C20 90 25 105 35 115C40 120 50 125 60 125C70 125 80 120 85 115C95 105 100 90 100 75C100 60 95 45 90 35L85 25C80 15 70 10 60 10Z"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M40 40C35 40 30 45 30 50C30 55 35 60 40 60H80C85 60 90 55 90 50C90 45 85 40 80 40H40Z" fill="currentColor" />
        <path d="M45 50L50 55M75 50L70 55" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 70L60 75L65 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 85C45 95 75 95 80 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 60C15 55 10 45 10 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M95 60C105 55 110 45 110 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Tribal facial markings */}
        <path d="M35 70H25M85 70H95M35 80H20M85 80H100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      
      {/* Branding Text matching the provided logo's font style */}
      <div className="flex items-baseline font-headline tracking-tight">
        <span className="text-primary text-4xl font-bold italic">Tigra</span>
        <span className="text-primary text-4xl font-black uppercase">FINO</span>
      </div>
    </div>
  );
}