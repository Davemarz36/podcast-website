import { siteConfig } from "../config/site";

export function Footer({ homeHref = "#top" }: { homeHref?: string } = {}) {
  const socialLinks = [
    ["YouTube", siteConfig.socials.youtube],
    ["Instagram", siteConfig.socials.instagram],
    ["Facebook", siteConfig.socials.facebook],
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-black font-sans text-white">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-white/12 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href={homeHref} className="text-2xl font-semibold tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white uppercase">{siteConfig.name}</a>
            <p className="mt-3 max-w-lg text-lg font-medium leading-tight tracking-[-0.03em] text-white/62">{siteConfig.belief}</p>
          </div>
          <nav aria-label="Footer links" className="flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-white/52">
            <a href={`mailto:${siteConfig.contactEmail}`} className="transition hover:text-white">Contact</a>
            <a href="/partner" className="transition hover:text-white">Partner With Us</a>
            {socialLinks.map(([label, href]) => <a key={label} href={href} className="transition hover:text-white">{label}</a>)}
            <a href="#" className="transition hover:text-white">Privacy</a>
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
