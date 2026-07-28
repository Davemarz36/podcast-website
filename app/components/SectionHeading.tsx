import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  theme = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`font-display text-[clamp(2.7rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.03em] ${
          theme === "dark" ? "text-ivory" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-7 max-w-2xl text-base leading-8 sm:text-lg ${
            theme === "dark" ? "text-ivory/65" : "text-ink/65"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
