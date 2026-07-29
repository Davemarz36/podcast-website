import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "./config/site";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
    description: siteConfig.description,
    images: [{ url: "/og-v3.jpg", width: 1200, height: 630, alt: siteConfig.belief }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
    description: siteConfig.description,
    images: ["/og-v3.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
