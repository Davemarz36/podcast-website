import { siteConfig } from "../config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="bg-[#111110] text-ivory">
      <div className="page-shell py-14 sm:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <a href="#top" className="font-display text-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper">{siteConfig.name}</a>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">{siteConfig.mission}</p>
          </div>
          <nav aria-label="Footer navigation" className="grid content-start gap-3 text-sm text-white/65">
            {siteConfig.navigation.map((item) => <a key={item.href} href={item.href} className="hover:text-copper">{item.label}</a>)}
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-copper">Contact</a>
          </nav>
          <div className="space-y-6">
            <SocialLinks labels />
            <a href="#" className="block text-sm text-white/65 hover:text-copper">Privacy</a>
          </div>
        </div>
        <div className="grid gap-6 pt-8 text-xs leading-6 text-white/38 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-4xl">{siteConfig.disclaimer}</p>
          <p className="whitespace-nowrap">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
