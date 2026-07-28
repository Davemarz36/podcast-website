"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ManifestoStatement({ statement, index }: { statement: string; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.p
      initial={reduceMotion ? false : { opacity: 0.18, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.75 }}
      className="grid gap-4 border-t border-white/15 py-8 font-display text-[clamp(2.2rem,5.3vw,6.3rem)] leading-[0.94] tracking-[-0.025em] text-ivory md:grid-cols-[4rem_1fr] md:gap-8 md:py-12"
    >
      <span className="pt-1 font-sans text-[0.62rem] font-bold tracking-[0.18em] text-copper">0{index + 1}</span>
      <span>{statement}</span>
    </motion.p>
  );
}
