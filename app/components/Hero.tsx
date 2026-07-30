"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "../config/site";
import { CTAButton } from "./CTAButton";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Pan the (taller) image upward as the section scrolls out of view so the
  // full image is gradually revealed. Disabled when reduced motion is preferred.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-22%"]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-black font-sans text-white"
    >
      <motion.div
        className="absolute inset-x-0 top-0 -z-30 h-[128%] overflow-hidden will-change-transform"
        style={{ y: imageY }}
        initial={reduceMotion ? false : { scale: 1.04, opacity: 0.76 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={siteConfig.heroImage.src}
          alt={siteConfig.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="-scale-x-100 object-cover object-[48%_38%] grayscale contrast-[1.12] lg:object-[50%_40%]"
        />
      </motion.div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.78)_38%,rgba(0,0,0,.28)_72%,rgba(0,0,0,.36)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(0,0,0,.86)_0%,transparent_50%,rgba(0,0,0,.25)_100%)] lg:bg-[linear-gradient(0deg,rgba(0,0,0,.7)_0%,transparent_48%,rgba(0,0,0,.28)_100%)]" />

      <motion.div
        className="page-shell flex min-h-[100svh] items-end pb-10 pt-32 sm:pb-14 lg:items-center lg:pb-20 lg:pt-36"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 w-full max-w-[64rem]">
          <div className="mb-6 flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/64">
            <span className="h-px w-10 bg-white" aria-hidden="true" />
            Stories that move people forward
          </div>

          <h1
            id="hero-heading"
            className="max-w-[61rem] text-[72px] font-medium leading-[0.94] tracking-[-0.065em]"
          >
            Ordinary lives.<br />
            Honest conversations.<br />
            Extraordinary courage.
          </h1>

          <p className="mt-7 max-w-2xl text-[0.96rem] font-light leading-7 text-white/68 sm:text-lg sm:leading-8">
            A story-led platform exploring faith, identity, migration, ambition, struggle and the unfinished process of becoming.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#mission" variant="white" plain>Explore the Mission</CTAButton>
            <CTAButton href="#join" variant="black" plain>Join the Journey</CTAButton>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="absolute bottom-5 right-4 hidden border border-white/28 bg-black/65 px-6 py-4 text-sm text-white/76 backdrop-blur-sm sm:block lg:bottom-8 lg:right-8 lg:px-8 lg:py-5"
      >
        Because no honest story is insignificant.
      </motion.div>
    </section>
  );
}
