"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ShareStoryModal } from "./ShareStoryModal";

export function ShareStoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white/45 bg-black/60 px-5 py-3 text-sm font-bold tracking-[-0.01em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7"
      >
        Share a Story
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
      <ShareStoryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
