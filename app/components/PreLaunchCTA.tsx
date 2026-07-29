import { siteConfig } from "../config/site";
import { CTAButton } from "./CTAButton";
import { NewsletterForm } from "./NewsletterForm";
import { Reveal } from "./Reveal";

export function PreLaunchCTA() {
  return (
    <section id="join" aria-labelledby="join-heading" className="section-pad relative overflow-hidden bg-clay text-ivory">
      <div className="absolute -right-24 top-0 h-full w-[34rem] rotate-12 border-x border-white/10" aria-hidden="true" />
      <div className="page-shell relative grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
        <Reveal>
          <p className="eyebrow text-white/64">The first conversations are coming</p>
          <h2 id="join-heading" className="mt-5 max-w-5xl font-display text-[clamp(3.5rem,7.6vw,8.2rem)] leading-[0.84] tracking-[-0.045em]">
            Every story begins when someone decides to speak.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            We are preparing our first season of conversations with people navigating life, faith, work, identity and change. Join the first listeners or tell us about a story that deserves to be heard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#newsletter-form" variant="light">Join the First Listeners</CTAButton>
            <CTAButton href={siteConfig.storySubmissionUrl} variant="outline">Share a Story</CTAButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="border-t border-white/18 bg-charcoal p-6 shadow-2xl shadow-charcoal/15 sm:p-8 lg:p-10">
          <p className="mb-8 font-display text-3xl leading-tight text-ivory">Be there when the first story begins.</p>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
