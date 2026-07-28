"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function StoryThemeCard({
  theme,
}: {
  theme: { number: string; title: string; description: string; image: string };
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className="story-card group relative min-h-[21rem] overflow-hidden border-t border-ink/25 px-0 py-7 sm:min-h-[23rem]"
    >
      <Image
        src={theme.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 -z-20 object-cover opacity-0 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ivory via-ivory/95 to-ivory/35 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <span className="text-[0.65rem] font-bold tracking-[0.18em] text-clay">{theme.number}</span>
        <span className="mt-1 h-px w-10 bg-ink/25 transition-all duration-500 group-hover:w-20 group-hover:bg-clay" />
      </div>
      <div className="absolute inset-x-0 bottom-7">
        <h3 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.92] tracking-[-0.025em] text-charcoal transition-transform duration-500 group-hover:-translate-y-2">
          {theme.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-7 text-ink/65 sm:text-base">{theme.description}</p>
      </div>
    </motion.article>
  );
}
