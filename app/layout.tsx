import type { Metadata } from "next";
import { Manrope, Quicksand, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "./config/site";
import { getSiteUrl } from "./config/site-url";
import "./globals.css";

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteConfig.name,
  title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
  description: siteConfig.description,
  keywords: [
    "human stories",
    "honest conversations",
    "faith and identity",
    "migration stories",
    "personal growth",
    "storytelling platform",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialImage.src,
        width: siteConfig.socialImage.width,
        height: siteConfig.socialImage.height,
        alt: siteConfig.socialImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Honest Conversations for People Still Becoming`,
    description: siteConfig.description,
    images: [siteConfig.socialImage.src],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${quicksand.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
