import { siteConfig } from "../config/site";
import { FeaturedVideo } from "./FeaturedVideo";
import { Reveal } from "./Reveal";

export function FeaturedConversation() {
  const conversation = siteConfig.featuredConversation;

  return (
    <section id="watch" aria-labelledby="watch-heading" className="section-pad border-t border-black/10 bg-[#f2f2ef] font-sans text-dark-heading">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.65fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="eyebrow eyebrow-dark">{conversation.eyebrow}</p>
            <h2 id="watch-heading" className="mt-5 max-w-5xl text-[clamp(3.2rem,6.4vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.06em] text-[#262626]">
              {conversation.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-base leading-8 text-black/60 sm:text-lg">{conversation.description}</p>
            <p className="mt-5 border-l border-black/30 pl-4 text-xs leading-6 text-black/44">
              Format preview — this temporary video will be replaced when the first People&amp;Stories conversation is ready.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <FeaturedVideo
            youtubeId={conversation.youtubeId}
            title={conversation.title}
            poster={conversation.poster}
            posterAlt={conversation.posterAlt}
          />
          <div className="grid gap-4 border-x border-b border-black/16 bg-white px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">
            <div>
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Full conversation</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.025em] text-[#262626]">{conversation.title}</p>
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-black/42">Faith · Identity · Becoming</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
