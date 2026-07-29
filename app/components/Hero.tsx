"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../config/site";
import { CTAButton } from "./CTAButton";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-ivory"
    >
      <motion.div
        className="absolute inset-x-0 top-0 -z-20 h-[42svh] overflow-hidden lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[52%]"
        initial={reduceMotion ? false : { scale: 1.035, opacity: 0.78 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={siteConfig.heroImage.src}
          alt={siteConfig.heroImage.alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 1023px) 100vw, 52vw"
          className="object-cover object-[50%_35%] grayscale-[28%] sepia-[8%] lg:object-[50%_42%]"
        />
      </motion.div>

      <div className="absolute inset-x-0 top-0 -z-10 h-[55svh] bg-gradient-to-b from-charcoal/35 via-transparent to-charcoal lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[60%] lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/35 lg:to-transparent" />
      <div className="grain absolute inset-0 -z-10 opacity-25" />

      <motion.div
        className="page-shell flex min-h-[100svh] items-end pb-10 pt-[41svh] sm:pb-16 sm:pt-[49svh] lg:items-center lg:pb-16 lg:pt-28"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 max-w-[54rem] lg:w-[62%]">
          <p className="eyebrow text-copper">Stories that move people forward</p>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-[2.9rem] leading-[0.86] tracking-[-0.045em] sm:text-[clamp(3.8rem,8vw,5.5rem)] lg:text-[clamp(5.2rem,7.4vw,7.8rem)]"
          >
            Ordinary lives. Honest conversations. Extraordinary courage.
          </h1>
          <p className="mt-6 max-w-xl text-[0.94rem] leading-7 text-white/66 sm:mt-7 sm:text-lg sm:leading-8">
            A story-led platform exploring faith, identity, migration, ambition, struggle and the unfinished process of becoming.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <CTAButton href="#mission">Explore the Mission</CTAButton>
            <CTAButton href="#join" variant="outline">Join the Journey</CTAButton>
          </div>
          <p className="mt-5 border-l border-copper pl-4 text-xs italic tracking-wide text-white/48 sm:mt-7">
            Because no honest story is insignificant.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
