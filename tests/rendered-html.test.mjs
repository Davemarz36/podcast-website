import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("production build renders the storytelling landing page", async () => {
  const html = await readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  assert.match(html, /Ordinary lives\./);
  assert.match(html, /Honest conversations\./);
  assert.match(html, /Extraordinary courage\./);
  assert.match(html, /The most powerful stories are not always the most visible/);
  assert.match(html, /Stories need room to breathe/);
  assert.match(html, /Play sample conversation/);
  assert.match(html, /Join the First Listeners/);
  assert.match(html, /Share a Story/);
  assert.match(html, /href="\/partner"[^>]*>.*Partner With Us/s);
  assert.doesNotMatch(html, /The first stories are being prepared|We are listeners before we are hosts/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("production build renders the partnership page and serves its deck", async () => {
  const html = await readFile(new URL("../.next/server/app/partner.html", import.meta.url), "utf8");
  const pdf = await readFile(new URL("../public/partnership-deck.pdf", import.meta.url));
  const cover = await stat(new URL("../public/images/partnership-deck-cover.png", import.meta.url));

  assert.match(html, /Partner with us to give meaningful stories the platform they deserve/);
  assert.match(html, /Production and Media/);
  assert.match(html, /Community and Guest Discovery/);
  assert.match(html, /Sponsorship and Funding/);
  assert.match(html, /Distribution and Audience Growth/);
  assert.match(html, /data="\/partnership-deck\.pdf#view=FitH&amp;toolbar=1&amp;navpanes=0"/);
  assert.match(html, /download="People-and-Stories-Partnership-Deck\.pdf"/);
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.byteLength > 100_000);
  assert.ok(cover.size > 100_000);
});
