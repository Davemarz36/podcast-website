"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CTAButton } from "./CTAButton";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-white">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero-conversation.jpg"
          alt="A small group gathered in thoughtful conversation near a sunlit window — documentary image placeholder"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] grayscale-[55%] sepia-[15%]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,11,.94)_0%,rgba(12,12,11,.7)_48%,rgba(12,12,11,.28)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-transparent to-charcoal/45" />
      <div className="grain absolute inset-0 -z-10 opacity-30" />

      <motion.div
        className="page-shell w-full pb-28 pt-36 sm:pb-32 lg:pb-28"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: 0.2 }}
      >
        <div className="max-w-[58rem]">
          <motion.p variants={item} transition={{ duration: 0.7 }} className="eyebrow text-copper">
            Stories of ordinary people. Courage for everyday life.
          </motion.p>
          <motion.h1
            variants={item}
            transition={{ duration: 0.8 }}
            className="mt-6 max-w-4xl font-display text-[clamp(4rem,10vw,8.9rem)] leading-[0.82] tracking-[-0.04em] text-ivory"
          >
            Every person carries a story worth hearing.
          </motion.h1>
          <motion.p
            variants={item}
            transition={{ duration: 0.8 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8"
          >
            Thoughtful conversations with people still becoming—about faith, identity, ambition,
            struggle, migration, mentorship and the courage to keep moving forward.
          </motion.p>
          <motion.div variants={item} transition={{ duration: 0.8 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#vision">Discover the Vision</CTAButton>
            <CTAButton href="#share" variant="outline">
              Share Your Story
            </CTAButton>
          </motion.div>
        </div>

        <motion.a
          href="#vision"
          variants={item}
          className="absolute bottom-6 right-4 flex items-center gap-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-white/60 sm:bottom-8 sm:right-8 lg:right-12"
        >
          <span className="h-px w-10 bg-copper" /> Begin the conversation
        </motion.a>
      </motion.div>
    </section>
  );
}
