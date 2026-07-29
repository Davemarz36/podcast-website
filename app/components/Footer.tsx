import { siteConfig } from "../config/site";

export function Footer() {
  const socialLinks = [
    ["YouTube", siteConfig.socials.youtube],
    ["Instagram", siteConfig.socials.instagram],
    ["Facebook", siteConfig.socials.facebook],
  ] as const;

  return (
    <footer className="bg-[#111110] text-ivory">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-white/12 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href="#top" className="font-display text-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper">{siteConfig.name}</a>
            <p className="mt-3 max-w-lg font-display text-2xl leading-tight text-white/65">{siteConfig.belief}</p>
          </div>
          <nav aria-label="Footer links" className="flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-white/52">
            <a href={`mailto:${siteConfig.contactEmail}`} className="transition hover:text-copper">Contact</a>
            {socialLinks.map(([label, href]) => <a key={label} href={href} className="transition hover:text-copper">{label}</a>)}
            <a href="#" className="transition hover:text-copper">Privacy</a>
          </nav>
        </div>
        <div className="grid gap-5 pt-7 text-[0.7rem] leading-5 text-white/34 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-4xl">{siteConfig.disclaimer}</p>
          <p className="whitespace-nowrap">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
