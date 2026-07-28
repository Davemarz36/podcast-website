import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function TeamMemberCard({ member }: { member: { name: string; role: string; statement: string; portrait: string; socialUrl: string } }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <Image src={member.portrait} alt={`${member.name} portrait placeholder`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale-[70%] sepia-[10%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0" />
        <span className="absolute bottom-4 left-4 bg-charcoal/70 px-3 py-2 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">Replace portrait</span>
      </div>
      <div className="border-t border-ink/25 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-charcoal">{member.name}</h3>
            <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-clay">{member.role}</p>
          </div>
          <a href={member.socialUrl} aria-label={`${member.name} social link placeholder`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ink/20 transition hover:border-clay hover:text-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-5 text-sm leading-7 text-ink/62">“{member.statement}”</p>
      </div>
    </article>
  );
}
