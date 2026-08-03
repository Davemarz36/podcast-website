import type { Metadata } from "next";
import Image from "next/image";
import { CTAButton } from "../components/CTAButton";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { PartnershipDeck } from "../components/PartnershipDeck";
import { Reveal } from "../components/Reveal";
import { siteConfig } from "../config/site";
import { partnershipAreas } from "../data/partnership";

const pageDescription =
  "Partner with People&Stories to help thoughtful, human stories reach a wider audience through production, community, sponsorship and distribution.";

export const metadata: Metadata = {
  title: `Partner With Us — ${siteConfig.name}`,
  description: pageDescription,
  alternates: { canonical: "/partner" },
  openGraph: {
    type: "website",
    url: "/partner",
    siteName: siteConfig.name,
    title: `Partner With Us — ${siteConfig.name}`,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.belief }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Partner With Us — ${siteConfig.name}`,
    description: pageDescription,
    images: ["/og.png"],
  },
};

const contactHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(siteConfig.partnership.contactSubject)}`;

export default function PartnerPage() {
  return (
    <>
      <Navigation
        homeHref="/"
        anchorPrefix="/"
        ctaHref={contactHref}
        ctaLabel="Start a Conversation"
      />
      <main>
        <section
          id="top"
          aria-labelledby="partner-heading"
          className="relative isolate flex min-h-[100svh] overflow-hidden bg-black font-sans text-white"
        >
          <div className="absolute inset-y-0 right-0 -z-30 w-full opacity-42 sm:w-3/4 lg:w-[54%] lg:opacity-72">
            <Image
              src={siteConfig.heroImage.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[56%_center] grayscale contrast-[1.08]"
            />
          </div>
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,.98)_0%,rgba(0,0,0,.94)_46%,rgba(0,0,0,.44)_100%)]" />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(0,0,0,.92)_0%,transparent_58%,rgba(0,0,0,.36)_100%)]" />

          <div className="page-shell flex min-h-[100svh] items-end pb-12 pt-36 sm:pb-16 lg:items-center lg:py-40">
            <Reveal className="relative z-10 max-w-[70rem]">
              <p className="eyebrow">Partner with us</p>
              <h1
                id="partner-heading"
                className="mt-6 max-w-[68rem] text-[clamp(3.25rem,7vw,7.25rem)] font-medium leading-[0.91] tracking-[-0.065em]"
              >
                Partner with us to give meaningful stories the platform they deserve.
              </h1>
              <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/68 sm:text-lg">
                We are building a global storytelling platform centred on honest conversations, ordinary lives and the courage found in unfinished journeys. We welcome partners who believe in thoughtful media, human dignity and stories that move people forward.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="#partnership-deck" variant="white" plain>View Partnership Deck</CTAButton>
                <CTAButton href={contactHref} variant="black" plain>Start a Conversation</CTAButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="partnership-introduction" className="section-pad bg-white font-sans text-dark-heading">
          <div className="page-shell grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow eyebrow-dark">Partnership introduction</p>
              <h2 id="partnership-introduction" className="mt-5 max-w-4xl text-[clamp(2.8rem,5.8vw,5.75rem)] font-medium leading-[0.93] tracking-[-0.058em]">
                The right partnership can help an honest story travel further without losing what makes it human.
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="max-w-2xl space-y-6 text-base leading-8 text-black/62 sm:text-lg lg:pt-12">
              <p>
                We are seeking aligned individuals, communities, organisations, production partners and sponsors who can help bring meaningful human stories to a wider audience.
              </p>
              <p>
                Every partnership should strengthen the quality, reach or sustainability of the work while protecting the dignity of each guest and the independence of every conversation.
              </p>
              <blockquote className="border-l-2 border-black pl-5 text-2xl font-medium leading-tight tracking-[-0.035em] text-black sm:text-3xl">
                Shared values first. Useful collaboration second.
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="partnership-areas" className="section-pad border-t border-white/10 bg-black font-sans text-white">
          <div className="page-shell">
            <Reveal>
              <p className="eyebrow">Partnership areas</p>
              <h2 id="partnership-areas" className="mt-5 max-w-5xl text-[clamp(2.8rem,5.8vw,5.75rem)] font-medium leading-[0.93] tracking-[-0.058em]">
                Four ways we can move meaningful stories forward together.
              </h2>
            </Reveal>
            <div className="mt-14 border-t border-white/16 lg:mt-20">
              {partnershipAreas.map((area, index) => (
                <Reveal key={area.number} delay={index * 0.04}>
                  <article className="grid gap-5 border-b border-white/16 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[5rem_.82fr_1.18fr] lg:items-start lg:gap-10 lg:py-10">
                    <p className="text-xs font-bold tracking-[0.16em] text-white/42">{area.number}</p>
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">{area.title}</h3>
                    <p className="max-w-2xl text-base leading-8 text-white/58 sm:col-start-2 lg:col-start-3 lg:text-lg">{area.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="partnership-deck" aria-labelledby="deck-heading" className="section-pad scroll-mt-24 bg-white font-sans text-dark-heading">
          <div className="page-shell">
            <Reveal className="grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow eyebrow-dark">Partnership deck</p>
                <h2 id="deck-heading" className="mt-5 max-w-4xl text-[clamp(2.8rem,5.8vw,5.75rem)] font-medium leading-[0.93] tracking-[-0.058em]">
                  The complete partnership story.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-black/62 sm:text-lg">
                Explore the platform’s purpose, audience, editorial promise and the different ways aligned partners can help these conversations reach further.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <PartnershipDeck />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="partner-contact" className="section-pad relative overflow-hidden border-t border-white/12 bg-black font-sans text-white">
          <div className="absolute inset-y-0 right-[14%] w-px rotate-12 bg-white/8" aria-hidden="true" />
          <div className="page-shell relative">
            <Reveal>
              <p className="eyebrow">Start a conversation</p>
              <h2 id="partner-contact" className="mt-5 max-w-5xl text-[clamp(3rem,6.3vw,6.25rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                Let’s build something meaningful together.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
                Tell us about your organisation, community or partnership idea, and we will explore how we can work together.
              </p>
              <div className="mt-9">
                <CTAButton href={contactHref} variant="white" plain>Start a Partnership Conversation</CTAButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer homeHref="/" />
    </>
  );
}
