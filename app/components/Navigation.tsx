"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "../config/site";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? "border-white/10 bg-charcoal/96 shadow-xl shadow-black/10 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="page-shell flex h-[4.75rem] items-center justify-between lg:h-[5.25rem]">
        <a
          href="#top"
          className="relative z-50 font-display text-2xl leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#join"
          className="hidden min-h-11 items-center border border-white/35 px-5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-copper hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper lg:inline-flex"
        >
          Join the Journey
        </a>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper lg:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex min-h-dvh flex-col justify-center bg-charcoal px-6 pt-20 lg:hidden"
          >
            <p className="eyebrow mb-8">Explore</p>
            <div className="flex flex-col border-t border-white/15">
              {siteConfig.navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/15 py-4 font-display text-[clamp(2.1rem,10vw,3.4rem)] leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                >
                  {item.label}
                  <span className="font-sans text-[0.6rem] text-white/45">0{index + 1}</span>
                </a>
              ))}
            </div>
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-clay px-5 text-xs font-bold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              Join the Journey
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
