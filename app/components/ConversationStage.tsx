"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ConversationStage({
  stage,
}: {
  stage: { number: string; title: string; description: string };
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0.35, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{ duration: 0.6 }}
      className="relative border-l border-white/20 py-2 pl-7 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8"
    >
      <span className="absolute -left-[4px] top-4 h-2 w-2 bg-copper lg:-top-[4px] lg:left-0" />
      <p className="text-[0.65rem] font-bold tracking-[0.18em] text-copper">{stage.number}</p>
      <h3 className="mt-6 font-display text-4xl leading-none text-ivory">{stage.title}</h3>
      <p className="mt-5 text-sm leading-7 text-white/58">{stage.description}</p>
    </motion.article>
  );
}
