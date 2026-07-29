import { siteConfig } from "../config/site";
import { Reveal } from "./Reveal";

const progression = ["Story", "Reflection", "Clarity", "Courage"];

export function WhyWeExist() {
  return (
    <section id="why" aria-labelledby="why-heading" className="section-pad relative overflow-hidden border-t border-white/10 bg-black font-sans text-white">
      <div className="page-shell relative">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Why we exist</p>
            <h2 id="why-heading" className="mt-5 max-w-2xl text-[clamp(3.2rem,6.2vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.058em]">
              The most powerful stories are not always the most visible.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-2xl space-y-5 text-base leading-8 text-white/62 sm:text-lg lg:pt-11">
            <p>Most stories are told after the breakthrough—when the business succeeds, the career makes sense or the difficult season is over.</p>
            <p className="border-l-2 border-white pl-5 text-3xl font-medium leading-tight text-white sm:text-4xl">We are interested in the middle.</p>
            <p>The seasons of uncertainty, rebuilding, migration, quiet ambition, difficult decisions and personal growth that rarely receive attention while they are happening.</p>
            <p>{siteConfig.name} exists to make room for those conversations. Not because we have all the answers, but because the right conversation can help someone recognise their own.</p>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-y border-white/15 py-6 lg:mt-24">
          <ol aria-label="From story to courage" className="grid gap-0 sm:grid-cols-4">
            {progression.map((item, index) => (
              <li key={item} className="group flex items-center justify-between border-b border-white/12 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0">
                <span className="text-2xl font-medium tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">{item}</span>
                <span className="text-white/55" aria-hidden="true">{index < progression.length - 1 ? "→" : "•"}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
