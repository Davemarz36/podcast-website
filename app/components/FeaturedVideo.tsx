"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function FeaturedVideo({
  youtubeId,
  title,
  poster,
  posterAlt,
}: {
  youtubeId: string;
  title: string;
  poster: string;
  posterAlt: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden border border-black/20 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-inset"
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 86rem, 100vw"
            className="object-cover grayscale transition duration-700 group-hover:scale-[1.02] group-hover:contrast-110"
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06)_20%,rgba(0,0,0,.72)_100%)]" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white text-black transition duration-300 group-hover:scale-105 group-hover:bg-black group-hover:text-white sm:h-24 sm:w-24">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-6 text-white sm:bottom-7 sm:left-7 sm:right-7">
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em]">Play sample conversation</span>
            <span className="hidden text-xs text-white/65 sm:block">YouTube</span>
          </span>
        </button>
      )}
    </div>
  );
}
