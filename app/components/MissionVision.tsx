import { siteConfig } from "../config/site";
import { Reveal } from "./Reveal";

export function MissionVision() {
  return (
    <section id="mission" aria-labelledby="mission-heading" className="section-pad overflow-hidden border-t border-white/10 bg-black font-sans text-white">
      <div className="page-shell">
        <Reveal>
          <p className="eyebrow">What we are building</p>
          <h2 id="mission-heading" className="mt-5 max-w-6xl text-[clamp(3rem,6.6vw,7rem)] font-medium leading-[0.92] tracking-[-0.058em]">
            We are creating space for people to speak honestly about the lives they are still learning to understand.
          </h2>
        </Reveal>

        <div className="mt-14 grid border-y border-white/16 md:grid-cols-2 md:divide-x md:divide-white/16 lg:mt-20">
          <Reveal className="py-9 md:pr-10 lg:py-12 lg:pr-16">
            <p className="eyebrow">01 / Mission</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/62 sm:text-lg">{siteConfig.mission}</p>
          </Reveal>
          <Reveal delay={0.08} className="border-t border-white/16 py-9 md:border-t-0 md:pl-10 lg:py-12 lg:pl-16">
            <p className="eyebrow">02 / Vision</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/62 sm:text-lg">{siteConfig.vision}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start lg:mt-20">
          <span className="mt-2 hidden h-px w-24 bg-white sm:block" aria-hidden="true" />
          <blockquote className="max-w-5xl text-[clamp(2.6rem,5.6vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
            “You do not have to arrive before your story matters.”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
