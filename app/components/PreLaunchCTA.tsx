import { CTAButton } from "./CTAButton";
import { NewsletterForm } from "./NewsletterForm";
import { Reveal } from "./Reveal";
import { ShareStoryButton } from "./ShareStoryButton";

export function PreLaunchCTA() {
  return (
    <section id="join" aria-labelledby="join-heading" className="section-pad relative overflow-hidden border-t border-white/10 bg-black font-sans text-white">
      <div className="absolute -right-24 top-0 h-full w-[34rem] rotate-12 border-x border-white/8" aria-hidden="true" />
      <div className="page-shell relative grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
        <Reveal>
          <p className="eyebrow text-white/64">The first conversations are coming</p>
          <h2 id="join-heading" className="mt-5 max-w-5xl text-[60px] font-medium leading-[0.9] tracking-[-0.065em]">
            Every story begins when someone decides to speak.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            We are preparing our first season of conversations with people navigating life, faith, work, identity and change. Join the first listeners or tell us about a story that deserves to be heard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href="#newsletter-form" variant="white" plain>Join the First Listeners</CTAButton>
            <ShareStoryButton />
            <CTAButton href="/partner" variant="black" plain>Partner With Us</CTAButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="border border-white/18 bg-[#090909] p-6 sm:p-8 lg:p-10">
          <p className="mb-8 text-3xl font-medium leading-tight tracking-[-0.04em] text-white">Be there when the first story begins.</p>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
