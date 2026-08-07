import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function CTAButton({
  href,
  children,
  variant = "white",
  plain = false,
  className = "",
  target,
  rel,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "white" | "black" | "ink" | "outline-ink";
  plain?: boolean;
  className?: string;
  target?: "_blank";
  rel?: string;
  download?: boolean | string;
}) {
  const styles = {
    white: "border-white bg-white text-black hover:bg-black hover:text-white",
    black: "border-white/45 bg-black/60 text-white hover:border-white hover:bg-white hover:text-black",
    ink: "border-black bg-black text-white hover:bg-white hover:text-black",
    "outline-ink": "border-black/45 bg-transparent text-black hover:border-black hover:bg-black hover:text-white",
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download}
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
