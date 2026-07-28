import { ArrowUpRight } from "lucide-react";
import { siteConfig, type SocialPlatform } from "../config/site";

export function SocialLinks({ labels = false }: { labels?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(Object.keys(siteConfig.socials) as SocialPlatform[]).map((platform) => {
        return (
          <a
            key={platform}
            href={siteConfig.socials[platform]}
            aria-label={`${platform} — social link placeholder`}
            className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-current underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            <span>{labels ? platform : platform.slice(0, 2)}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
