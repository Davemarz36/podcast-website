import Image from "next/image";
import { Play } from "lucide-react";
import { siteConfig } from "../config/site";

export function VideoPlaceholder() {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden border border-white/15 bg-ink sm:aspect-video">
      <Image
        src="/images/hero-conversation.jpg"
        alt="A group in conversation — trailer image placeholder"
        fill
        sizes="(max-width: 1024px) 100vw, 70vw"
        className="object-cover grayscale-[70%] sepia-[15%] opacity-65 transition duration-1000 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-charcoal/45 text-white backdrop-blur-sm sm:h-28 sm:w-28">
          <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" aria-hidden="true" />
          <span className="sr-only">Trailer coming soon</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow">Season one trailer</p>
          <p className="mt-2 font-display text-3xl text-ivory sm:text-5xl">The first conversation is taking shape.</p>
        </div>
        <span className="border border-white/20 bg-charcoal/65 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/70">
          YouTube URL placeholder: {siteConfig.trailerUrl || "not connected"}
        </span>
      </div>
    </div>
  );
}
