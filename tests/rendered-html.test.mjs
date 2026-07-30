import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.doesNotMatch(html, /The first stories are being prepared|We are listeners before we are hosts/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});
