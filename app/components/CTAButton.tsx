import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function CTAButton({
  href,
  children,
  variant = "solid",
  plain = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "white" | "black";
  plain?: boolean;
  className?: string;
}) {
  const styles = {
    solid: "bg-clay text-ivory hover:bg-copper border-clay",
    outline: "border-white/40 text-white hover:bg-white hover:text-charcoal",
    light: "bg-ivory text-charcoal border-ivory hover:bg-white",
    white: "border-white bg-white text-black hover:bg-black hover:text-white",
    black: "border-white/45 bg-black/60 text-white hover:border-white hover:bg-white hover:text-black",
  };

  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7 ${plain ? "text-sm tracking-[-0.01em]" : "text-[0.7rem] uppercase tracking-[0.18em]"} ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
