import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider, PostHogAuthTracker } from "./providers";
import { SessionWrapper } from "./SessionWrapper";
import { TRPCProvider } from "@/providers/trpc-provider";
import { GeistSans } from "geist/font/sans";
import { SITE_URL } from "@/lib/seo";

// DM Mono - Used for code, terminal, and monospace text
const dmMono = localFont({
  src: [
    {
      path: "./fonts/DMMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DMMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-dm-mono",
  display: "optional",
  preload: false,
});

// Geist Sans - Primary font for body text and UI
const geistSans = GeistSans;

const SITE_NAME = "Opensox";
const SOCIAL_TITLE =
  "join opensox and mogg in open source, building in public and indie hacking";
const SOCIAL_DESCRIPTION = SOCIAL_TITLE;
const SEO_DESCRIPTION =
  "How to get started with open source and how to contribute. Find projects, tools, and a path to an open source career.";
const OG_IMAGE = {
  url: "/images/ox-preview-img.png",
  width: 1654,
  height: 1072,
  alt: SOCIAL_TITLE,
} as const;

export const metadata: Metadata = {
  title: `${SITE_NAME} | How to get started with open source`,
  description: SEO_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "Open Source",
  authors: [{ name: "Ajeet Pratap Singh", url: SITE_URL }],
  creator: "Ajeet Pratap Singh",
  publisher: SITE_NAME,
  icons: {
    icon: "/images/os-image.ico",
  },
  keywords: [
    "how to get started with open source",
    "how to contribute to open source",
    "contributing to open source",
    "open source",
    "open source contribution",
    "open source career",
    "what is open source",
    "why open source",
    "open source tools",
    "open source software",
    "open source ai",
    "open source alternative",
    "opensox",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL(SITE_URL),
    siteName: SITE_NAME,
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@opensox",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE.url],
    creator: "@jackedAJ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SEO_DESCRIPTION,
};

// reading the session here would make every page, including public ones,
// render per request; the session is loaded in the browser instead
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${dmMono.variable} antialiased bg-background`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionWrapper>
              <PostHogAuthTracker />
              <TRPCProvider>{children}</TRPCProvider>
            </SessionWrapper>
          </ThemeProvider>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
