import Image from "next/image";
import { siteConfig } from "../config/site";
import { CTAButton } from "./CTAButton";

export function PartnershipDeck() {
  const { deckPath, deckCover } = siteConfig.partnership;

  return (
    <div className="mt-10 border border-black/18 bg-[#f2f0ed] p-3 sm:p-5 lg:mt-14 lg:p-7">
      <div className="relative aspect-[16/9] overflow-hidden border border-black/14 bg-black md:hidden">
        <Image
          src={deckCover}
          alt={`${siteConfig.name} partnership deck cover: Partner with us to give meaningful stories the platform they deserve.`}
          fill
          sizes="(max-width: 767px) calc(100vw - 3rem), 1px"
          className="object-cover"
        />
      </div>

      <object
        data={`${deckPath}#view=FitH&toolbar=1&navpanes=0`}
        type="application/pdf"
        aria-label={`${siteConfig.name} partnership deck`}
        className="hidden h-[clamp(32rem,72vh,54rem)] w-full border border-black/14 bg-white md:block"
      >
        <div className="flex h-full min-h-[32rem] flex-col items-center justify-center p-10 text-center">
          <p className="max-w-lg text-lg leading-8 text-black/64">
            Your browser cannot display the embedded partnership deck.
          </p>
          <a href={deckPath} target="_blank" rel="noreferrer" className="mt-5 font-bold underline underline-offset-4">
            Open the PDF in a new tab
          </a>
        </div>
      </object>

      <div className="flex flex-col gap-3 border-t border-black/16 pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-5">
        <p className="text-sm leading-6 text-black/54">Eight pages · PDF · Opens in any modern document viewer</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={deckPath} target="_blank" rel="noreferrer" variant="ink" plain>
            Open Full Deck
          </CTAButton>
          <CTAButton href={deckPath} download="People-and-Stories-Partnership-Deck.pdf" variant="outline-ink" plain>
            Download PDF
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
