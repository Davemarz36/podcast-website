"use client";

import { motion, useReducedMotion } from "framer-motion";
import { conversationPillars } from "../data/content";
import { Reveal } from "./Reveal";

export function ConversationPillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="conversations" aria-labelledby="conversations-heading" className="section-pad bg-paper">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Conversation pillars</p>
            <h2 id="conversations-heading" className="mt-5 max-w-4xl font-display text-[clamp(3.3rem,7vw,7.2rem)] leading-[0.87] tracking-[-0.04em] text-charcoal">
              The conversations behind the person.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-xl text-base leading-8 text-ink/62 sm:text-lg">
            We go beyond titles and achievements to understand the experiences, relationships, beliefs and decisions shaping who someone is becoming.
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/18 lg:mt-20">
          {conversationPillars.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 0.04}>
              <motion.article
                whileHover={reduceMotion ? undefined : { x: 6 }}
                transition={{ duration: 0.25 }}
                className="group grid gap-4 border-b border-ink/18 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[5rem_.7fr_1fr] lg:items-center lg:gap-10 lg:py-10"
              >
                <span className="text-[0.66rem] font-extrabold tracking-[0.16em] text-clay">{pillar.number}</span>
                <h3 className="font-display text-[clamp(2.8rem,5vw,5.2rem)] leading-none tracking-[-0.03em] transition-colors group-hover:text-clay">{pillar.title}</h3>
                <p className="max-w-xl text-sm leading-7 text-ink/58 sm:col-start-2 sm:text-base lg:col-start-auto lg:justify-self-end lg:leading-8">{pillar.description}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
